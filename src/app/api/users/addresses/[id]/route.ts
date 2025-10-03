import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';

// Update an address
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await currentUser();

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const dbUser = await prisma.user.findUnique({
            where: { clerkId: user.id },
        });

        if (!dbUser) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        const { id } = await params;
        const body = await request.json();
        const {
            street,
            city,
            state,
            postalCode,
            country,
            apartment,
            instructions,
            isDefault,
            propertyType,
            bedrooms,
            bathrooms,
        } = body;

        // Check if address belongs to user
        const existingAddress = await prisma.address.findFirst({
            where: { id, userId: dbUser.id },
        });

        if (!existingAddress) {
            return NextResponse.json(
                { error: 'Address not found' },
                { status: 404 }
            );
        }

        // If this is being set as default, unset other defaults
        if (isDefault) {
            await prisma.address.updateMany({
                where: { userId: dbUser.id, isDefault: true },
                data: { isDefault: false },
            });
        }

        const updatedAddress = await prisma.address.update({
            where: { id },
            data: {
                street: street || existingAddress.street,
                city: city || existingAddress.city,
                state: state || existingAddress.state,
                postalCode: postalCode || existingAddress.postalCode,
                country: country || existingAddress.country,
                apartment:
                    apartment !== undefined
                        ? apartment
                        : existingAddress.apartment,
                instructions:
                    instructions !== undefined
                        ? instructions
                        : existingAddress.instructions,
                isDefault:
                    isDefault !== undefined
                        ? isDefault
                        : existingAddress.isDefault,
                propertyType: propertyType || existingAddress.propertyType,
                bedrooms:
                    bedrooms !== undefined
                        ? bedrooms
                        : existingAddress.bedrooms,
                bathrooms:
                    bathrooms !== undefined
                        ? bathrooms
                        : existingAddress.bathrooms,
            },
        });

        return NextResponse.json(updatedAddress);
    } catch (error) {
        console.error('Error updating address:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Delete an address
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await currentUser();

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const dbUser = await prisma.user.findUnique({
            where: { clerkId: user.id },
        });

        if (!dbUser) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        const { id } = await params;

        // Check if address belongs to user
        const existingAddress = await prisma.address.findFirst({
            where: { id, userId: dbUser.id },
        });

        if (!existingAddress) {
            return NextResponse.json(
                { error: 'Address not found' },
                { status: 404 }
            );
        }

        // Check if address has any bookings
        const bookingsCount = await prisma.booking.count({
            where: { addressId: id },
        });

        if (bookingsCount > 0) {
            return NextResponse.json(
                { error: 'Cannot delete address with existing bookings' },
                { status: 400 }
            );
        }

        await prisma.address.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Address deleted successfully' });
    } catch (error) {
        console.error('Error deleting address:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

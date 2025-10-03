import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';

// Get all addresses for the current user
export async function GET() {
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
            include: {
                addresses: {
                    orderBy: { isDefault: 'desc', createdAt: 'desc' },
                },
            },
        });

        if (!dbUser) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(dbUser.addresses);
    } catch (error) {
        console.error('Error fetching addresses:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Create a new address
export async function POST(request: NextRequest) {
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

        const body = await request.json();
        const {
            street,
            city,
            state,
            postalCode,
            country = 'Australia',
            apartment,
            instructions,
            isDefault = false,
            propertyType = 'HOUSE',
            bedrooms,
            bathrooms,
        } = body;

        // Validate required fields
        if (!street || !city || !state || !postalCode) {
            return NextResponse.json(
                {
                    error: 'Missing required fields: street, city, state, postalCode',
                },
                { status: 400 }
            );
        }

        // If this is being set as default, unset other defaults
        if (isDefault) {
            await prisma.address.updateMany({
                where: { userId: dbUser.id, isDefault: true },
                data: { isDefault: false },
            });
        }

        const address = await prisma.address.create({
            data: {
                userId: dbUser.id,
                street,
                city,
                state,
                postalCode,
                country,
                apartment: apartment || null,
                instructions: instructions || null,
                isDefault,
                propertyType,
                bedrooms: bedrooms || null,
                bathrooms: bathrooms || null,
            },
        });

        return NextResponse.json(address);
    } catch (error) {
        console.error('Error creating address:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

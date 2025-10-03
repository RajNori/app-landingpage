import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        // Get current user from Clerk
        const user = await currentUser();

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Get user from database with addresses and recent bookings
        const dbUser = await prisma.user.findUnique({
            where: { clerkId: user.id },
            include: {
                addresses: {
                    orderBy: { createdAt: 'desc' },
                },
                bookings: {
                    include: {
                        address: true,
                        serviceItems: {
                            include: {
                                addons: true,
                            },
                        },
                    },
                    orderBy: { createdAt: 'desc' },
                    take: 10, // Limit to recent bookings
                },
            },
        });

        if (!dbUser) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            id: dbUser.id,
            clerkId: dbUser.clerkId,
            email: dbUser.email,
            firstName: dbUser.firstName,
            lastName: dbUser.lastName,
            phoneNumber: dbUser.phoneNumber,
            profileImageUrl: dbUser.profileImageUrl,
            addresses: dbUser.addresses,
            recentBookings: dbUser.bookings,
            createdAt: dbUser.createdAt,
            updatedAt: dbUser.updatedAt,
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        // Get current user from Clerk
        const user = await currentUser();

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { firstName, lastName, phoneNumber } = body;

        // Update user in database
        const updatedUser = await prisma.user.update({
            where: { clerkId: user.id },
            data: {
                firstName: firstName || null,
                lastName: lastName || null,
                phoneNumber: phoneNumber || null,
            },
        });

        return NextResponse.json({
            id: updatedUser.id,
            clerkId: updatedUser.clerkId,
            email: updatedUser.email,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            phoneNumber: updatedUser.phoneNumber,
            profileImageUrl: updatedUser.profileImageUrl,
            updatedAt: updatedUser.updatedAt,
        });
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

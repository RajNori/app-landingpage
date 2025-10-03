import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';

// Get a specific booking
export async function GET(
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

        const booking = await prisma.booking.findFirst({
            where: { id, userId: dbUser.id },
            include: {
                address: true,
                serviceItems: {
                    include: {
                        addons: true,
                    },
                },
            },
        });

        if (!booking) {
            return NextResponse.json(
                { error: 'Booking not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(booking);
    } catch (error) {
        console.error('Error fetching booking:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Update booking status (for admin/internal use)
export async function PATCH(
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
        const { status, paymentStatus, stripeSessionId } = body;

        // Check if booking belongs to user
        const existingBooking = await prisma.booking.findFirst({
            where: { id, userId: dbUser.id },
        });

        if (!existingBooking) {
            return NextResponse.json(
                { error: 'Booking not found' },
                { status: 404 }
            );
        }

        const updatedBooking = await prisma.booking.update({
            where: { id },
            data: {
                ...(status && { status }),
                ...(paymentStatus && { paymentStatus }),
                ...(stripeSessionId && { stripeSessionId }),
            },
            include: {
                address: true,
                serviceItems: {
                    include: {
                        addons: true,
                    },
                },
            },
        });

        return NextResponse.json(updatedBooking);
    } catch (error) {
        console.error('Error updating booking:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Cancel a booking
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

        // Check if booking belongs to user
        const existingBooking = await prisma.booking.findFirst({
            where: { id, userId: dbUser.id },
        });

        if (!existingBooking) {
            return NextResponse.json(
                { error: 'Booking not found' },
                { status: 404 }
            );
        }

        // Only allow cancellation if booking is pending or confirmed
        if (!['PENDING', 'CONFIRMED'].includes(existingBooking.status)) {
            return NextResponse.json(
                { error: 'Cannot cancel booking with current status' },
                { status: 400 }
            );
        }

        const updatedBooking = await prisma.booking.update({
            where: { id },
            data: {
                status: 'CANCELLED',
            },
            include: {
                address: true,
                serviceItems: {
                    include: {
                        addons: true,
                    },
                },
            },
        });

        return NextResponse.json(updatedBooking);
    } catch (error) {
        console.error('Error cancelling booking:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

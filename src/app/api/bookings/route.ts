import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';
import { CartItemSchema } from '@/lib/pricing/schema';
import { calculateCartTotal } from '@/lib/pricing/utils';

// Get all bookings for the current user
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
        });

        if (!dbUser) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        const bookings = await prisma.booking.findMany({
            where: { userId: dbUser.id },
            include: {
                address: true,
                serviceItems: {
                    include: {
                        addons: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Create a new booking
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
            addressId,
            serviceDate,
            serviceTime,
            estimatedDuration,
            cartItems,
            specialInstructions,
            emergencyContact,
        } = body;

        // Validate required fields
        if (
            !addressId ||
            !serviceDate ||
            !serviceTime ||
            !cartItems ||
            !Array.isArray(cartItems)
        ) {
            return NextResponse.json(
                {
                    error: 'Missing required fields: addressId, serviceDate, serviceTime, cartItems',
                },
                { status: 400 }
            );
        }

        // Validate cart items
        const validatedCartItems = cartItems.map((item: unknown) => {
            const result = CartItemSchema.safeParse(item);
            if (!result.success) {
                throw new Error(`Invalid cart item: ${result.error.message}`);
            }
            return result.data;
        });

        // Verify address belongs to user
        const address = await prisma.address.findFirst({
            where: { id: addressId, userId: dbUser.id },
        });

        if (!address) {
            return NextResponse.json(
                { error: 'Address not found' },
                { status: 404 }
            );
        }

        // Calculate pricing
        const { subtotalCents, gstCents, totalCents } =
            calculateCartTotal(validatedCartItems);

        // Create booking with service items
        const booking = await prisma.booking.create({
            data: {
                userId: dbUser.id,
                addressId,
                serviceDate: new Date(serviceDate),
                serviceTime,
                estimatedDuration: estimatedDuration || 120, // Default 2 hours
                subtotalCents,
                gstCents,
                totalCents,
                specialInstructions: specialInstructions || null,
                emergencyContact: emergencyContact || null,
                serviceItems: {
                    create: validatedCartItems.map((item) => ({
                        packageId: item.packageId,
                        packageName: `Package ${item.packageId}`, // This should be fetched from your pricing config
                        quantity: item.quantity,
                        unitPriceCents: 5000, // This should be fetched from your pricing config
                        totalCents: item.quantity * 5000, // This should be calculated properly
                        addons: {
                            create:
                                item.addons?.map((addon) => ({
                                    addonId: addon.id,
                                    addonName: `Addon ${addon.id}`, // This should be fetched from your pricing config
                                    quantity: addon.quantity,
                                    unitPriceCents: 2000, // This should be fetched from your pricing config
                                    totalCents: addon.quantity * 2000, // This should be calculated properly
                                })) || [],
                        },
                    })),
                },
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

        return NextResponse.json(booking);
    } catch (error) {
        console.error('Error creating booking:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

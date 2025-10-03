import { NextRequest, NextResponse } from 'next/server';
import { PRICE_ITEMS } from '../../../lib/pricing/config';
import { calculateCartTotal, applyMinQty } from '../../../lib/pricing/utils';
import { Stripe } from 'stripe';
import { getOrCreateUser } from '../../../lib/user-sync';
import { prisma } from '../../../lib/db';
import { auth } from '@clerk/nextjs/server';

// This would be loaded from environment variables in production
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

export async function POST(request: NextRequest) {
    try {
        // Clerk auth check - verify userId exists
        const { userId } = await auth();
        
        if (!userId) {
            return NextResponse.json(
                { error: 'Authentication required', code: 'AUTH_REQUIRED' },
                { status: 401 }
            );
        }

        if (!STRIPE_SECRET_KEY) {
            return NextResponse.json(
                { error: 'Stripe configuration missing' },
                { status: 500 }
            );
        }

        const body = await request.json();
        const {
            items,
            addressId,
            serviceDate,
            serviceTime,
            estimatedDuration,
            specialInstructions,
            emergencyContact,
        } = body;

        if (!items || !Array.isArray(items)) {
            return NextResponse.json(
                { error: 'Invalid cart data' },
                { status: 400 }
            );
        }

        // Get or create user - pass userId directly
        const user = await getOrCreateUser(userId);

        // Validate address belongs to user
        if (addressId) {
            const address = await prisma.address.findFirst({
                where: { id: addressId, userId: user.id },
            });

            if (!address) {
                return NextResponse.json(
                    { error: 'Address not found or does not belong to user' },
                    { status: 404 }
                );
            }
        }

        // Calculate totals using the same pricing logic
        const { subtotalCents, gstCents, totalCents } =
            calculateCartTotal(items);
        const lineItems: Array<{
            price_data: {
                currency: string;
                product_data: {
                    name: string;
                    description: string;
                };
                unit_amount: number;
            };
            quantity: number;
        }> = [];

        for (const item of items) {
            const priceItem = PRICE_ITEMS.find((p) => p.id === item.packageId);
            if (!priceItem) {
                return NextResponse.json(
                    { error: `Invalid package ID: ${item.packageId}` },
                    { status: 400 }
                );
            }

            // Apply minimum quantity enforcement
            const billedQty = applyMinQty(item.quantity, priceItem.minQty);

            // Add add-ons to line items (amounts already calculated by calculateCartTotal)

            // Add to line items
            lineItems.push({
                price_data: {
                    currency: 'aud',
                    product_data: {
                        name: `${priceItem.name} - ${billedQty} ${
                            priceItem.unitLabel
                        }${billedQty > 1 ? 's' : ''}`,
                        description: priceItem.description,
                    },
                    unit_amount: priceItem.basePriceCents,
                },
                quantity: billedQty,
            });

            // Add add-ons as separate line items
            if (item.addons) {
                for (const addon of item.addons) {
                    const addonItem = priceItem.addons?.find(
                        (a) => a.id === addon.id
                    );
                    if (addonItem) {
                        lineItems.push({
                            price_data: {
                                currency: 'aud',
                                product_data: {
                                    name: addonItem.name,
                                    description: addonItem.description || '',
                                },
                                unit_amount: addonItem.priceCents,
                            },
                            quantity: addon.quantity,
                        });
                    }
                }
            }
        }

        // Create Stripe checkout session
        const stripe = new Stripe(STRIPE_SECRET_KEY);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${request.nextUrl.origin}/checkout?status=success&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${request.nextUrl.origin}/checkout?status=cancelled`,
            ...(user.email && { customer_email: user.email }),
            metadata: {
                user_id: user.id,
                total_amount: totalCents.toString(),
                item_count: items.length.toString(),
                ...(addressId && { address_id: addressId }),
                ...(serviceDate && { service_date: serviceDate }),
                ...(serviceTime && { service_time: serviceTime }),
            },
        });

        // Create booking record if address and service details provided
        if (addressId && serviceDate && serviceTime) {
            await prisma.booking.create({
                data: {
                    userId: user.id,
                    addressId,
                    serviceDate: new Date(serviceDate),
                    serviceTime,
                    estimatedDuration: estimatedDuration || 120,
                    subtotalCents,
                    gstCents,
                    totalCents,
                    stripeSessionId: session.id,
                    specialInstructions: specialInstructions || null,
                    emergencyContact: emergencyContact || null,
                    serviceItems: {
                        create: items.map((item) => ({
                            packageId: item.packageId,
                            packageName:
                                PRICE_ITEMS.find((p) => p.id === item.packageId)
                                    ?.name || `Package ${item.packageId}`,
                            quantity: item.quantity,
                            unitPriceCents:
                                PRICE_ITEMS.find((p) => p.id === item.packageId)
                                    ?.basePriceCents || 0,
                            totalCents:
                                (PRICE_ITEMS.find(
                                    (p) => p.id === item.packageId
                                )?.basePriceCents || 0) * item.quantity,
                            addons: {
                                create:
                                    item.addons?.map(
                                        (addon: {
                                            id: string;
                                            quantity: number;
                                        }) => ({
                                            addonId: addon.id,
                                            addonName:
                                                PRICE_ITEMS.find(
                                                    (p) =>
                                                        p.id === item.packageId
                                                )?.addons?.find(
                                                    (a) => a.id === addon.id
                                                )?.name || `Addon ${addon.id}`,
                                            quantity: addon.quantity,
                                            unitPriceCents:
                                                PRICE_ITEMS.find(
                                                    (p) =>
                                                        p.id === item.packageId
                                                )?.addons?.find(
                                                    (a) => a.id === addon.id
                                                )?.priceCents || 0,
                                            totalCents:
                                                (PRICE_ITEMS.find(
                                                    (p) =>
                                                        p.id === item.packageId
                                                )?.addons?.find(
                                                    (a) => a.id === addon.id
                                                )?.priceCents || 0) *
                                                addon.quantity,
                                        })
                                    ) || [],
                            },
                        })),
                    },
                },
            });
        }

        return NextResponse.json({ url: session.url });
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : 'Unknown error';
        const errorType = (error as { type?: string })?.type || 'Unknown';
        const errorStatusCode =
            (error as { statusCode?: string | number })?.statusCode ||
            'Unknown';

        console.error('Checkout error details:', {
            message: errorMessage,
            type: errorType,
            statusCode: errorStatusCode,
        });

        return NextResponse.json(
            {
                error: 'Failed to create checkout session',
                details: errorMessage,
            },
            { status: 500 }
        );
    }
}

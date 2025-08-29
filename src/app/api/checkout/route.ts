import { NextRequest, NextResponse } from 'next/server';
import { PRICE_ITEMS } from '../../../lib/pricing/config';
import { applyMinQty, calculateAddonTotal } from '../../../lib/pricing/utils';
import { Stripe } from 'stripe';


// This would be loaded from environment variables in production
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

export async function POST(request: NextRequest) {
    try {
        console.log('STRIPE_SECRET_KEY exists:', !!STRIPE_SECRET_KEY);
        console.log('STRIPE_SECRET_KEY length:', STRIPE_SECRET_KEY?.length);
        console.log(
            'STRIPE_SECRET_KEY starts with sk_test_:',
            STRIPE_SECRET_KEY?.startsWith('sk_test_')
        );

        if (!STRIPE_SECRET_KEY) {
            return NextResponse.json(
                { error: 'Stripe configuration missing' },
                { status: 500 }
            );
        }

        const body = await request.json();
        const { items } = body;

        if (!items || !Array.isArray(items)) {
            return NextResponse.json(
                { error: 'Invalid cart data' },
                { status: 400 }
            );
        }

        // Calculate totals using the same pricing logic
        let totalAmount = 0;
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
            const baseAmount = priceItem.basePriceCents * billedQty;
            totalAmount += baseAmount;

            // Add add-ons
            if (item.addons) {
                for (const addon of item.addons) {
                    const addonAmount = calculateAddonTotal(
                        priceItem,
                        addon.id,
                        addon.quantity
                    );
                    totalAmount += addonAmount;
                }
            }

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
        const stripe = new Stripe(STRIPE_SECRET_KEY, {
            apiVersion: '2025-08-27.basil',
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${request.nextUrl.origin}/checkout?status=success&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${request.nextUrl.origin}/checkout?status=cancelled`,
            metadata: {
                total_amount: totalAmount.toString(),
                item_count: items.length.toString(),
            },
        });

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

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { prisma } from '@/lib/db';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
    if (!STRIPE_SECRET_KEY || !webhookSecret) {
        console.error(
            'Please add STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET to .env.local'
        );
        return NextResponse.json(
            { error: 'Webhook is not configured' },
            { status: 503 }
        );
    }

    const stripe = new Stripe(STRIPE_SECRET_KEY, {
        apiVersion: '2025-08-27.basil',
    });

    try {
        const body = await request.text();
        const headersList = await headers();
        const signature = headersList.get('stripe-signature');

        if (!signature) {
            return NextResponse.json(
                { error: 'Missing stripe-signature header' },
                { status: 400 }
            );
        }

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(
                body,
                signature,
                webhookSecret
            );
        } catch (err) {
            console.error('Webhook signature verification failed:', err);
            return NextResponse.json(
                { error: 'Invalid signature' },
                { status: 400 }
            );
        }

        console.log(`Stripe webhook received: ${event.type}`);

        switch (event.type) {
            case 'checkout.session.completed':
                await handleCheckoutSessionCompleted(
                    event.data.object as Stripe.Checkout.Session
                );
                break;

            case 'payment_intent.succeeded':
                await handlePaymentIntentSucceeded(
                    event.data.object as Stripe.PaymentIntent
                );
                break;

            case 'payment_intent.payment_failed':
                await handlePaymentIntentFailed(
                    event.data.object as Stripe.PaymentIntent
                );
                break;

            default:
                console.log(`Unhandled Stripe event type: ${event.type}`);
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Stripe webhook error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

async function handleCheckoutSessionCompleted(
    session: Stripe.Checkout.Session
) {
    try {
        console.log('Checkout session completed:', session.id);

        // Find booking by Stripe session ID
        const booking = await prisma.booking.findUnique({
            where: { stripeSessionId: session.id },
            include: {
                user: true,
                address: true,
            },
        });

        if (!booking) {
            console.error('No booking found for session:', session.id);
            return;
        }

        // Update booking payment status
        await prisma.booking.update({
            where: { id: booking.id },
            data: {
                paymentStatus: 'PAID',
                status: 'CONFIRMED',
            },
        });

        console.log('Booking payment confirmed:', booking.id);

        // Here you could trigger additional actions like:
        // - Send confirmation email
        // - Notify cleaners
        // - Update inventory
        // - etc.
    } catch (error) {
        console.error('Error handling checkout session completed:', error);
        throw error;
    }
}

async function handlePaymentIntentSucceeded(
    paymentIntent: Stripe.PaymentIntent
) {
    try {
        console.log('Payment intent succeeded:', paymentIntent.id);

        // Find booking by payment intent ID (if stored)
        // This would require storing the payment intent ID in the booking
        // For now, we'll rely on the checkout session webhook
    } catch (error) {
        console.error('Error handling payment intent succeeded:', error);
        throw error;
    }
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
    try {
        console.log('Payment intent failed:', paymentIntent.id);

        // Find booking by payment intent ID and update status
        // This would require storing the payment intent ID in the booking
        // For now, we'll rely on the checkout session webhook
    } catch (error) {
        console.error('Error handling payment intent failed:', error);
        throw error;
    }
}

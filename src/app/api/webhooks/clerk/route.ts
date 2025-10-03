import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';
import { prisma } from '@/lib/db';

// Webhook secret from Clerk Dashboard
const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET to .env.local');
}

export async function POST(request: NextRequest) {
    try {
        // Get the headers
        const headerPayload = await headers();
        const svix_id = headerPayload.get('svix-id');
        const svix_timestamp = headerPayload.get('svix-timestamp');
        const svix_signature = headerPayload.get('svix-signature');

        // If there are no headers, error out
        if (!svix_id || !svix_timestamp || !svix_signature) {
            return NextResponse.json(
                { error: 'Missing svix headers' },
                { status: 400 }
            );
        }

        // Get the body
        const payload = await request.json();
        const body = JSON.stringify(payload);

        // Create a new Svix instance with your secret.
        const wh = new Webhook(WEBHOOK_SECRET!);

        let evt: {
            type: string;
            data: {
                id: string;
                email_addresses: Array<{ id: string; email_address: string }>;
                primary_email_address_id: string;
                first_name?: string;
                last_name?: string;
                phone_numbers?: Array<{ phone_number: string }>;
                image_url?: string;
            };
        };

        // Verify the payload with the headers
        try {
            evt = wh.verify(body, {
                'svix-id': svix_id,
                'svix-timestamp': svix_timestamp,
                'svix-signature': svix_signature,
            }) as typeof evt;
        } catch (err) {
            console.error('Error verifying webhook:', err);
            return NextResponse.json(
                { error: 'Error verifying webhook' },
                { status: 400 }
            );
        }

        // Handle the webhook
        const eventType = evt.type;
        console.log(`Webhook received: ${eventType}`);

        switch (eventType) {
            case 'user.created':
                await handleUserCreated(evt.data);
                break;

            case 'user.updated':
                await handleUserUpdated(evt.data);
                break;

            case 'user.deleted':
                await handleUserDeleted(evt.data);
                break;

            default:
                console.log(`Unhandled webhook event type: ${eventType}`);
        }

        return NextResponse.json({ message: 'Webhook processed successfully' });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

async function handleUserCreated(userData: {
    id: string;
    email_addresses: Array<{ id: string; email_address: string }>;
    primary_email_address_id: string;
    first_name?: string;
    last_name?: string;
    phone_numbers?: Array<{ phone_number: string }>;
    image_url?: string;
}) {
    try {
        const {
            id: clerkId,
            email_addresses,
            first_name,
            last_name,
            phone_numbers,
            image_url,
        } = userData;

        // Get primary email
        const primaryEmail = email_addresses.find(
            (email) => email.id === userData.primary_email_address_id
        );

        if (!primaryEmail) {
            console.error('No primary email found for user:', clerkId);
            return;
        }

        // Create user in database
        const user = await prisma.user.create({
            data: {
                clerkId,
                email: primaryEmail.email_address,
                firstName: first_name || null,
                lastName: last_name || null,
                phoneNumber: phone_numbers?.[0]?.phone_number || null,
                profileImageUrl: image_url || null,
            },
        });

        console.log('User created in database:', user.id);
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

async function handleUserUpdated(userData: {
    id: string;
    email_addresses: Array<{ id: string; email_address: string }>;
    primary_email_address_id: string;
    first_name?: string;
    last_name?: string;
    phone_numbers?: Array<{ phone_number: string }>;
    image_url?: string;
}) {
    try {
        const {
            id: clerkId,
            email_addresses,
            first_name,
            last_name,
            phone_numbers,
            image_url,
        } = userData;

        // Get primary email
        const primaryEmail = email_addresses.find(
            (email) => email.id === userData.primary_email_address_id
        );

        if (!primaryEmail) {
            console.error('No primary email found for user:', clerkId);
            return;
        }

        // Update user in database
        const user = await prisma.user.update({
            where: { clerkId },
            data: {
                email: primaryEmail.email_address,
                firstName: first_name || null,
                lastName: last_name || null,
                phoneNumber: phone_numbers?.[0]?.phone_number || null,
                profileImageUrl: image_url || null,
            },
        });

        console.log('User updated in database:', user.id);
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

async function handleUserDeleted(userData: { id: string }) {
    try {
        const { id: clerkId } = userData;

        // Delete user from database (cascade will handle related records)
        await prisma.user.delete({
            where: { clerkId },
        });

        console.log('User deleted from database:', clerkId);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

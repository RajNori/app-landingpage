import { prisma } from './db';
import { clerkClient } from '@clerk/nextjs/server';

export async function getOrCreateUser(clerkId: string) {
    try {
        // Try to find existing user in database
        let dbUser = await prisma.user.findUnique({
            where: { clerkId },
        });

        if (dbUser) {
            return dbUser;
        }

        // If user doesn't exist, fetch from Clerk and create
        const clerk = await clerkClient();
        const clerkUser = await clerk.users.getUser(clerkId);
        
        if (!clerkUser) {
            throw new Error('User not found in Clerk');
        }

        // Get primary email
        const primaryEmail = clerkUser.emailAddresses.find(
            (email) => email.id === clerkUser.primaryEmailAddressId
        );

        if (!primaryEmail) {
            throw new Error('No primary email found for Clerk user');
        }

        // Create user in database
        dbUser = await prisma.user.create({
            data: {
                clerkId,
                email: primaryEmail.emailAddress,
                firstName: clerkUser.firstName || null,
                lastName: clerkUser.lastName || null,
                phoneNumber: clerkUser.phoneNumbers?.[0]?.phoneNumber || null,
                profileImageUrl: clerkUser.imageUrl || null,
            },
        });

        return dbUser;
    } catch (error) {
        console.error('Error getting or creating user:', error);
        throw error;
    }
}

export async function ensureUserExists(clerkId: string) {
    try {
        const dbUser = await prisma.user.findUnique({
            where: { clerkId },
        });

        if (!dbUser) {
            // This should not happen if webhooks are working properly
            console.warn(`User with clerkId ${clerkId} not found in database`);
            throw new Error('User not found in database');
        }

        return dbUser;
    } catch (error) {
        console.error('Error ensuring user exists:', error);
        throw error;
    }
}

import { currentUser } from '@clerk/nextjs/server';
import { prisma } from './db';

export async function getOrCreateUser() {
    try {
        const clerkUser = await currentUser();

        if (!clerkUser) {
            throw new Error('No authenticated user');
        }

        // Try to find existing user
        let dbUser = await prisma.user.findUnique({
            where: { clerkId: clerkUser.id },
        });

        // If user doesn't exist, create them
        if (!dbUser) {
            const primaryEmail = clerkUser.emailAddresses.find(
                (email) => email.id === clerkUser.primaryEmailAddressId
            );

            if (!primaryEmail) {
                throw new Error('No primary email found');
            }

            dbUser = await prisma.user.create({
                data: {
                    clerkId: clerkUser.id,
                    email: primaryEmail.emailAddress,
                    firstName: clerkUser.firstName || null,
                    lastName: clerkUser.lastName || null,
                    phoneNumber: clerkUser.phoneNumbers[0]?.phoneNumber || null,
                    profileImageUrl: clerkUser.imageUrl || null,
                },
            });
        }

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

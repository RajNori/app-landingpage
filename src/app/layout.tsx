import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '../contexts/CartContext';
import CartCountProvider from '../components/CartCountProvider';
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Helpi - Find Help Fast | On-Demand Cleaning Services',
    description:
        'Find Help Fast. Helpi connects you with trusted local cleaners for fast, affordable, and reliable cleaning services across Australia. Help on the way when you need it most.',
    authors: [{ name: 'Helpi Team' }],
    keywords:
        'cleaning services app,on-demand cleaners,Helpi app,book a cleaner,Australian cleaning app,mopping, dusting, kitchen cleaning,fast local cleaning help,find help fast',
    icons: {
        icon: [
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: [
            {
                url: '/apple-touch-icon.png',
                sizes: '180x180',
                type: 'image/png',
            },
        ],
        other: [
            {
                url: '/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                url: '/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    },
    openGraph: {
        title: 'Helpi - Find Help Fast | Trusted Cleaning Services',
        description:
            "Find help fast with Helpi - Australia's easiest way to book cleaning help. Help on the way when you need it most. Trusted cleaners, secure payments, and real reviews.",
        url: 'https://www.gethelpi.com',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Helpi - Find Help Fast | Trusted Cleaning Services',
        description:
            "Find help fast with Helpi - Australia's easiest way to book cleaning help. Help on the way when you need it most. Trusted cleaners, secure payments, and real reviews.",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang='en'>
                <body className={inter.className}>
                    <CartProvider>
                        <CartCountProvider />
                        <main className='bg-white min-h-screen'>
                            {children}
                        </main>
                    </CartProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}

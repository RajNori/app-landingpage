import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: 'Helpi — A cleaner home. More time for you.',
    description:
        'Find cleaning help for your home or workspace. Choose a time that suits you in the Helpi app.',
    authors: [{ name: 'Helpi Team' }],
    keywords:
        'cleaning services app,on-demand cleaners,Helpi app,book a cleaner,Australian cleaning app,mopping, dusting, kitchen cleaning,fast local cleaning help,find help fast',
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: 'any' },
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
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
        title: 'Helpi — A cleaner home. More time for you.',
        description:
            'Find cleaning help for your home or workspace. Choose a time that suits you in the Helpi app.',
        url: 'https://www.gethelpi.com',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Helpi — A cleaner home. More time for you.',
        description:
            'Find cleaning help for your home or workspace. Choose a time that suits you in the Helpi app.',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body
                className={`${inter.className} ${inter.variable}`}
                suppressHydrationWarning>
                <main className='bg-white min-h-screen'>{children}</main>
            </body>
        </html>
    );
}

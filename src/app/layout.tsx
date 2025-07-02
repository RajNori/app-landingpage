import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: 'Helpi - On-Demand Cleaning Help, Instantly',
    description:
        'Click. Book. Relax. Helpi connects you with trusted local cleaners for fast, affordable, and reliable cleaning services across Australia.',
    keywords: [
        'cleaning services app',
        'on-demand cleaners',
        'Helpi app',
        'book a cleaner',
        'Australian cleaning app',
        'mopping, dusting, kitchen cleaning',
        'fast local cleaning help',
    ],
    authors: [{ name: 'Helpi Team' }],
    openGraph: {
        title: 'Helpi - Trusted Cleaning Services at Your Fingertips',
        description:
            "Helpi is Australia's easiest way to book cleaning help. Choose your service, confirm your helper, and relax. Trusted cleaners, secure payments, and real reviews.",
        type: 'website',
        url: 'https://helpi.app', // Optional: update if you have a production domain
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`${inter.variable} font-sans antialiased`}>
                {children}
            </body>
        </html>
    );
}

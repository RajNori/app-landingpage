import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '../contexts/CartContext';
import CartCountProvider from '../components/CartCountProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Helpi - On-Demand Cleaning Help, Instantly',
    description:
        'Click. Book. Relax. Helpi connects you with trusted local cleaners for fast, affordable, and reliable cleaning services across Australia.',
    authors: [{ name: 'Helpi Team' }],
    keywords:
        'cleaning services app,on-demand cleaners,Helpi app,book a cleaner,Australian cleaning app,mopping, dusting, kitchen cleaning,fast local cleaning help',
    openGraph: {
        title: 'Helpi - Trusted Cleaning Services at Your Fingertips',
        description:
            "Helpi is Australia's easiest way to book cleaning help. Choose your service, confirm your helper, and relax. Trusted cleaners, secure payments, and real reviews.",
        url: 'https://www.gethelpi.com',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Helpi - Trusted Cleaning Services at Your Fingertips',
        description:
            "Helpi is Australia's easiest way to book cleaning help. Choose your service, confirm your helper, and relax. Trusted cleaners, secure payments, and real reviews.",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <CartProvider>
                    <CartCountProvider />
                    <div className='bg-white min-h-screen'>{children}</div>
                </CartProvider>
            </body>
        </html>
    );
}

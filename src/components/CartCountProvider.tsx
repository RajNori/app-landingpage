'use client';

import { usePathname } from 'next/navigation';
import { useCart } from '../contexts/CartContext';
import Navigation from './helpi-landing/Navigation';

export default function CartCountProvider() {
    const pathname = usePathname();
    const { getItemCount, isHydrated } = useCart();

    // Only show cart count after hydration to prevent SSR mismatch
    const cartItemCount = isHydrated ? getItemCount() : 0;

    // Hide navigation on knowledgebase route
    if (pathname === '/knowledgebase') {
        return null;
    }

    return <Navigation cartItemCount={cartItemCount} />;
}

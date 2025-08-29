'use client';

import { useCart } from '../contexts/CartContext';
import Navigation from './helpi-landing/Navigation';

export default function CartCountProvider() {
    const { getItemCount, isHydrated } = useCart();

    // Only show cart count after hydration to prevent SSR mismatch
    const cartItemCount = isHydrated ? getItemCount() : 0;

    return <Navigation cartItemCount={cartItemCount} />;
}

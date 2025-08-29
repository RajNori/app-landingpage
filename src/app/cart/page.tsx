'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    ShoppingCart,
    Trash2,
    Plus,
    Minus,
    Package,
    Star,
    Shield,
    Truck,
} from 'lucide-react';
import { PRICE_ITEMS } from '../../lib/pricing/config';
import { formatAud, applyMinQty } from '../../lib/pricing';

interface CartItem {
    packageId: string;
    quantity: number;
    addons?: Array<{ id: string; quantity: number }>;
}

interface CartItemWithDetails extends CartItem {
    package: (typeof PRICE_ITEMS)[0];
    lineTotal: number;
}

export default function CartPage() {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cartItemsWithDetails, setCartItemsWithDetails] = useState<
        CartItemWithDetails[]
    >([]);
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    // Load cart from localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('helpi-cart');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (error) {
                console.error('Failed to parse cart:', error);
            }
        }
    }, []);

    // Calculate cart details
    useEffect(() => {
        const itemsWithDetails = cartItems
            .map((item) => {
                const packageItem = PRICE_ITEMS.find(
                    (p) => p.id === item.packageId
                );
                if (!packageItem) return null;

                const billedQty = applyMinQty(
                    item.quantity,
                    packageItem.minQty
                );
                let lineTotal = packageItem.basePriceCents * billedQty;

                // Add add-ons
                if (item.addons) {
                    for (const addon of item.addons) {
                        const addonItem = packageItem.addons?.find(
                            (a) => a.id === addon.id
                        );
                        if (addonItem) {
                            lineTotal += addonItem.priceCents * addon.quantity;
                        }
                    }
                }

                return {
                    ...item,
                    package: packageItem,
                    lineTotal,
                };
            })
            .filter(Boolean) as CartItemWithDetails[];

        setCartItemsWithDetails(itemsWithDetails);
    }, [cartItems]);

    const updateCartItem = (packageId: string, quantity: number) => {
        const newCart = cartItems.map((item) =>
            item.packageId === packageId ? { ...item, quantity } : item
        );
        setCartItems(newCart);
        localStorage.setItem('helpi-cart', JSON.stringify(newCart));
    };

    const removeFromCart = (packageId: string) => {
        const newCart = cartItems.filter(
            (item) => item.packageId !== packageId
        );
        setCartItems(newCart);
        localStorage.setItem('helpi-cart', JSON.stringify(newCart));
    };

    const addAddon = (packageId: string, addonId: string) => {
        const newCart = cartItems.map((item) => {
            if (item.packageId === packageId) {
                const existingAddons = item.addons || [];
                const existingAddon = existingAddons.find(
                    (a) => a.id === addonId
                );

                if (existingAddon) {
                    return {
                        ...item,
                        addons: existingAddons.map((a) =>
                            a.id === addonId
                                ? { ...a, quantity: a.quantity + 1 }
                                : a
                        ),
                    };
                } else {
                    return {
                        ...item,
                        addons: [
                            ...existingAddons,
                            { id: addonId, quantity: 1 },
                        ],
                    };
                }
            }
            return item;
        });
        setCartItems(newCart);
        localStorage.setItem('helpi-cart', JSON.stringify(newCart));
    };

    const removeAddon = (packageId: string, addonId: string) => {
        const newCart = cartItems.map((item) => {
            if (item.packageId === packageId) {
                const existingAddons = item.addons || [];
                const existingAddon = existingAddons.find(
                    (a) => a.id === addonId
                );

                if (existingAddon && existingAddon.quantity > 1) {
                    return {
                        ...item,
                        addons: existingAddons.map((a) =>
                            a.id === addonId
                                ? { ...a, quantity: a.quantity - 1 }
                                : a
                        ),
                    };
                } else if (existingAddon && existingAddon.quantity === 1) {
                    return {
                        ...item,
                        addons: existingAddons.filter((a) => a.id !== addonId),
                    };
                }
            }
            return item;
        });
        setCartItems(newCart);
        localStorage.setItem('helpi-cart', JSON.stringify(newCart));
    };

    const getCartTotal = () => {
        return cartItemsWithDetails.reduce(
            (total, item) => total + item.lineTotal,
            0
        );
    };

    const getItemCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const handleCheckout = async () => {
        if (cartItems.length === 0) return;

        setIsCheckingOut(true);
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: cartItems }),
            });

            if (response.ok) {
                const { url } = await response.json();
                window.location.href = url;
            } else {
                const error = await response.json();
                alert(`Checkout failed: ${error.error}`);
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Checkout failed. Please try again.');
        } finally {
            setIsCheckingOut(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className='min-h-screen bg-gray-50 py-20'>
                <div className='max-w-4xl mx-auto px-4'>
                    <div className='text-center'>
                        <ShoppingCart className='w-24 h-24 text-gray-300 mx-auto mb-6' />
                        <h1 className='text-3xl font-bold text-gray-900 mb-4'>
                            Your cart is empty
                        </h1>
                        <p className='text-lg text-gray-600 mb-8'>
                            Looks like you haven&apos;t added any cleaning
                            services yet.
                        </p>
                        <button
                            onClick={() => router.push('/services')}
                            className='bg-[#511076] hover:bg-[#6b2a8f] text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105'>
                            Browse Services
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gray-50 py-8'>
            <div className='max-w-7xl mx-auto px-4'>
                {/* Header */}
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                        Shopping Cart
                    </h1>
                    <p className='text-gray-600'>
                        {getItemCount()} item{getItemCount() !== 1 ? 's' : ''}{' '}
                        in your cart
                    </p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {/* Cart Items */}
                    <div className='lg:col-span-2'>
                        <div className='bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden'>
                            {cartItemsWithDetails.map((item, index) => (
                                <div
                                    key={item.packageId}
                                    className={`p-6 ${
                                        index !==
                                        cartItemsWithDetails.length - 1
                                            ? 'border-b border-gray-100'
                                            : ''
                                    }`}>
                                    <div className='flex items-start gap-4'>
                                        {/* Service Icon */}
                                        <div className='w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0'>
                                            <Package className='w-8 h-8 text-purple-600' />
                                        </div>

                                        {/* Service Details */}
                                        <div className='flex-1 min-w-0'>
                                            <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                                                {item.package.name}
                                            </h3>
                                            <p className='text-gray-600 text-sm mb-3'>
                                                {item.package.description}
                                            </p>

                                            {/* Quantity Controls */}
                                            <div className='flex items-center gap-4 mb-4'>
                                                <div className='flex items-center border border-gray-300 rounded-lg'>
                                                    <button
                                                        onClick={() =>
                                                            updateCartItem(
                                                                item.packageId,
                                                                Math.max(
                                                                    1,
                                                                    item.quantity -
                                                                        1
                                                                )
                                                            )
                                                        }
                                                        className='p-2 hover:bg-gray-50 transition-colors'>
                                                        <Minus className='w-4 h-4' />
                                                    </button>
                                                    <span className='px-4 py-2 text-gray-900 font-medium'>
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            updateCartItem(
                                                                item.packageId,
                                                                item.quantity +
                                                                    1
                                                            )
                                                        }
                                                        className='p-2 hover:bg-gray-50 transition-colors'>
                                                        <Plus className='w-4 h-4' />
                                                    </button>
                                                </div>

                                                <div className='text-sm text-gray-500'>
                                                    {item.package.minQty >
                                                        1 && (
                                                        <span className='bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs'>
                                                            Min:{' '}
                                                            {
                                                                item.package
                                                                    .minQty
                                                            }{' '}
                                                            {
                                                                item.package
                                                                    .unitLabel
                                                            }
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Add-ons Section */}
                                            {item.package.addons &&
                                                item.package.addons.length >
                                                    0 && (
                                                    <div className='mb-4'>
                                                        <h4 className='text-sm font-medium text-gray-900 mb-3'>
                                                            Recommended Add-ons:
                                                        </h4>
                                                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                                                            {item.package.addons.map(
                                                                (addon) => {
                                                                    const currentAddon =
                                                                        item.addons?.find(
                                                                            (
                                                                                a
                                                                            ) =>
                                                                                a.id ===
                                                                                addon.id
                                                                        );
                                                                    const currentQty =
                                                                        currentAddon?.quantity ||
                                                                        0;

                                                                    return (
                                                                        <div
                                                                            key={
                                                                                addon.id
                                                                            }
                                                                            className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                                                                            <div>
                                                                                <p className='text-sm font-medium text-gray-900'>
                                                                                    {
                                                                                        addon.name
                                                                                    }
                                                                                </p>
                                                                                <p className='text-sm text-gray-600'>
                                                                                    {formatAud(
                                                                                        addon.priceCents
                                                                                    )}
                                                                                </p>
                                                                            </div>
                                                                            <div className='flex items-center gap-2'>
                                                                                {currentQty >
                                                                                    0 && (
                                                                                    <button
                                                                                        onClick={() =>
                                                                                            removeAddon(
                                                                                                item.packageId,
                                                                                                addon.id
                                                                                            )
                                                                                        }
                                                                                        className='w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors'>
                                                                                        <Minus className='w-3 h-3' />
                                                                                    </button>
                                                                                )}
                                                                                {currentQty >
                                                                                    0 && (
                                                                                    <span className='text-sm font-medium text-gray-900 min-w-[20px] text-center'>
                                                                                        {
                                                                                            currentQty
                                                                                        }
                                                                                    </span>
                                                                                )}
                                                                                <button
                                                                                    onClick={() =>
                                                                                        addAddon(
                                                                                            item.packageId,
                                                                                            addon.id
                                                                                        )
                                                                                    }
                                                                                    className='w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors'>
                                                                                    <Plus className='w-3 h-3' />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                            {/* Price */}
                                            <div className='flex items-center justify-between'>
                                                <div className='text-right'>
                                                    <p className='text-lg font-semibold text-gray-900'>
                                                        {formatAud(
                                                            item.lineTotal
                                                        )}
                                                    </p>
                                                    <p className='text-sm text-gray-500'>
                                                        {formatAud(
                                                            item.package
                                                                .basePriceCents
                                                        )}{' '}
                                                        per{' '}
                                                        {item.package.unitLabel}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        removeFromCart(
                                                            item.packageId
                                                        )
                                                    }
                                                    className='text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors'>
                                                    <Trash2 className='w-5 h-5' />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className='lg:col-span-1'>
                        <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24'>
                            <h2 className='text-xl font-semibold text-gray-900 mb-6'>
                                Order Summary
                            </h2>

                            {/* Service Details */}
                            <div className='space-y-4 mb-6'>
                                {cartItemsWithDetails.map((item) => (
                                    <div
                                        key={item.packageId}
                                        className='flex justify-between text-sm'>
                                        <span className='text-gray-600'>
                                            {item.package.name} ×{' '}
                                            {item.quantity}
                                        </span>
                                        <span className='font-medium'>
                                            {formatAud(item.lineTotal)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Total */}
                            <div className='border-t border-gray-200 pt-4 mb-6'>
                                <div className='flex justify-between text-lg font-semibold'>
                                    <span>Total (incl. GST)</span>
                                    <span>{formatAud(getCartTotal())}</span>
                                </div>
                                <p className='text-sm text-gray-500 mt-1'>
                                    GST:{' '}
                                    {formatAud(
                                        Math.round(getCartTotal() * 0.1)
                                    )}
                                </p>
                            </div>

                            {/* Checkout Button */}
                            <button
                                onClick={handleCheckout}
                                disabled={
                                    isCheckingOut || cartItems.length === 0
                                }
                                className='w-full bg-[#511076] hover:bg-[#6b2a8f] disabled:bg-gray-400 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none'>
                                {isCheckingOut
                                    ? 'Processing...'
                                    : 'Proceed to Checkout'}
                            </button>

                            {/* Trust Indicators */}
                            <div className='mt-6 pt-6 border-t border-gray-200'>
                                <div className='flex items-center gap-2 text-sm text-gray-600 mb-3'>
                                    <Shield className='w-4 h-4 text-green-600' />
                                    <span>Secure checkout</span>
                                </div>
                                <div className='flex items-center gap-2 text-sm text-gray-600 mb-3'>
                                    <Truck className='w-4 h-4 text-blue-600' />
                                    <span>Same-day service available</span>
                                </div>
                                <div className='flex items-center gap-2 text-sm text-gray-600'>
                                    <Star className='w-4 h-4 text-yellow-600' />
                                    <span>100% satisfaction guarantee</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

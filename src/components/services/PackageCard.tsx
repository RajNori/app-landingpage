'use client';

import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { formatAud, applyMinQty } from '../../lib/pricing';
import type { ServicePackage } from '../../lib/catalog';

interface PackageCardProps {
    pkg: ServicePackage;
}

export default function PackageCard({ pkg }: PackageCardProps) {
    const { addToCart, isHydrated } = useCart();
    const [selectedQuantity, setSelectedQuantity] = useState(pkg.minQty);
    const [selectedAddons, setSelectedAddons] = useState<
        Array<{ id: string; quantity: number }>
    >([]);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const calculateLineTotal = () => {
        const billedQty = applyMinQty(selectedQuantity, pkg.minQty);
        let total = pkg.basePriceCents * billedQty;

        // Add add-ons
        for (const addon of selectedAddons) {
            const addonItem = pkg.addons?.find((a) => a.id === addon.id);
            if (addonItem) {
                total += addonItem.priceCents * addon.quantity;
            }
        }

        return total;
    };

    const getMinChipText = () => {
        if (pkg.unit === 'HOURLY' || pkg.unit === 'PER_ROOM') {
            return `Min: ${pkg.minQty} ${pkg.unitLabel}${
                pkg.minQty > 1 ? 's' : ''
            }`;
        }
        if (pkg.unit === 'PER_JOB' || pkg.unit === 'FIXED') {
            return pkg.minQty === 1 ? 'Minimum job' : `Min: ${pkg.minQty}`;
        }
        return '';
    };

    const handleAddToCart = async () => {
        if (selectedQuantity < pkg.minQty) return;

        setIsAddingToCart(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        addToCart(
            pkg.id,
            selectedQuantity,
            selectedAddons.length > 0 ? selectedAddons : undefined
        );

        // Reset form
        setSelectedQuantity(pkg.minQty);
        setSelectedAddons([]);
        setIsAddingToCart(false);
    };

    const toggleAddon = (addonId: string) => {
        setSelectedAddons((prev) => {
            const existing = prev.find((a) => a.id === addonId);
            if (existing) {
                return prev.filter((a) => a.id !== addonId);
            } else {
                return [...prev, { id: addonId, quantity: 1 }];
            }
        });
    };

    const updateAddonQuantity = (addonId: string, quantity: number) => {
        if (quantity <= 0) {
            setSelectedAddons((prev) => prev.filter((a) => a.id !== addonId));
        } else {
            setSelectedAddons((prev) =>
                prev.map((a) => (a.id === addonId ? { ...a, quantity } : a))
            );
        }
    };

    return (
        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300'>
            {/* Header */}
            <div className='text-center mb-6'>
                <div className='w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <span className='text-2xl'>🏠</span>
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-2'>
                    {pkg.name}
                </h3>
                <p className='text-gray-600 text-sm mb-4'>{pkg.description}</p>

                {/* Price */}
                <div className='text-2xl font-bold text-purple-600 mb-2'>
                    {formatAud(pkg.basePriceCents)}
                </div>

                {/* Unit and Min */}
                <div className='text-sm text-gray-500 mb-4'>
                    per {pkg.unitLabel}
                    {pkg.minQty > 1 && (
                        <span className='ml-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs'>
                            {getMinChipText()}
                        </span>
                    )}
                </div>
            </div>

            {/* Features */}
            <div className='mb-6'>
                <h4 className='font-semibold text-gray-900 mb-3'>
                    What&apos;s included:
                </h4>
                <ul className='space-y-2'>
                    {pkg.features.map((feature, index) => (
                        <li
                            key={index}
                            className='flex items-center gap-2 text-sm text-gray-600'>
                            <span className='w-2 h-2 bg-green-400 rounded-full'></span>
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Duration */}
            {pkg.estimatedDuration && (
                <div className='mb-6 p-3 bg-blue-50 rounded-lg'>
                    <div className='flex items-center gap-2 text-blue-700'>
                        <span className='text-lg'>⏱️</span>
                        <span className='text-sm font-medium'>
                            Estimated: {pkg.estimatedDuration}
                        </span>
                    </div>
                </div>
            )}

            {/* Add-ons */}
            {pkg.addons && pkg.addons.length > 0 && (
                <div className='mb-6'>
                    <h4 className='font-semibold text-gray-900 mb-3'>
                        Available Add-ons:
                    </h4>
                    <div className='space-y-3'>
                        {pkg.addons.map((addon) => {
                            const isSelected = selectedAddons.some(
                                (a) => a.id === addon.id
                            );
                            const selectedAddon = selectedAddons.find(
                                (a) => a.id === addon.id
                            );

                            return (
                                <div
                                    key={addon.id}
                                    className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                                    <div className='flex-1'>
                                        <div className='flex items-center gap-2'>
                                            <input
                                                type='checkbox'
                                                id={`addon-${addon.id}`}
                                                checked={isSelected}
                                                onChange={() =>
                                                    toggleAddon(addon.id)
                                                }
                                                className='w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500'
                                            />
                                            <label
                                                htmlFor={`addon-${addon.id}`}
                                                className='text-sm font-medium text-gray-900'>
                                                {addon.name}
                                            </label>
                                        </div>
                                        {addon.description && (
                                            <p className='text-xs text-gray-600 mt-1'>
                                                {addon.description}
                                            </p>
                                        )}
                                        <p className='text-sm font-medium text-purple-600 mt-1'>
                                            {formatAud(addon.priceCents)}
                                        </p>
                                    </div>

                                    {isSelected && (
                                        <div className='flex items-center gap-2'>
                                            <button
                                                onClick={() =>
                                                    updateAddonQuantity(
                                                        addon.id,
                                                        (selectedAddon?.quantity ||
                                                            1) - 1
                                                    )
                                                }
                                                className='w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors'>
                                                -
                                            </button>
                                            <span className='text-sm font-medium text-gray-900 min-w-[20px] text-center'>
                                                {selectedAddon?.quantity || 1}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    updateAddonQuantity(
                                                        addon.id,
                                                        (selectedAddon?.quantity ||
                                                            1) + 1
                                                    )
                                                }
                                                className='w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors'>
                                                +
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Quantity Selector */}
            <div className='mb-6'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Quantity:
                </label>
                <div className='flex items-center border border-gray-300 rounded-lg'>
                    <button
                        onClick={() =>
                            setSelectedQuantity(
                                Math.max(1, selectedQuantity - 1)
                            )
                        }
                        className='p-2 hover:bg-gray-50 transition-colors'>
                        -
                    </button>
                    <span className='px-4 py-2 text-gray-900 font-medium'>
                        {selectedQuantity}
                    </span>
                    <button
                        onClick={() =>
                            setSelectedQuantity(selectedQuantity + 1)
                        }
                        className='p-2 hover:bg-gray-50 transition-colors'>
                        +
                    </button>
                </div>
            </div>

            {/* Line Total */}
            <div className='mb-6 p-3 bg-purple-50 rounded-lg'>
                <div className='flex justify-between items-center'>
                    <span className='text-sm font-medium text-gray-700'>
                        Line Total:
                    </span>
                    <span className='text-lg font-bold text-purple-600'>
                        {formatAud(calculateLineTotal())}
                    </span>
                </div>
            </div>

            {/* Add to Cart Button */}
            <button
                onClick={handleAddToCart}
                disabled={
                    !isHydrated ||
                    selectedQuantity < pkg.minQty ||
                    isAddingToCart
                }
                className='w-full py-3 px-4 rounded-xl font-medium transition-colors bg-purple-100 text-purple-700 hover:bg-purple-200 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed'>
                {!isHydrated
                    ? 'Loading...'
                    : isAddingToCart
                    ? 'Adding...'
                    : 'Add to Cart'}
            </button>
        </div>
    );
}

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FaHeart,
    FaBalanceScale,
    FaClock,
    FaCheck,
    FaPlus,
    FaMinus,
    FaCartPlus,
    FaHome,
    FaTag,
} from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';
import { formatAud, applyMinQty } from '../../lib/pricing';
import type { ServicePackage } from '../../lib/catalog';

interface PackageCardProps {
    pkg: ServicePackage;
    viewMode?: 'cards' | 'tiles';
    isFavorite?: boolean;
    isCompared?: boolean;
    onToggleFavorite?: (packageId: string) => void;
    onToggleCompare?: (packageId: string) => void;
}

export default function PackageCard({
    pkg,
    viewMode = 'cards',
    isFavorite = false,
    isCompared = false,
    onToggleFavorite,
    onToggleCompare,
}: PackageCardProps) {
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

    // Render card view
    if (viewMode === 'cards') {
        return (
            <motion.div
                className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 relative overflow-hidden h-full flex flex-col'
                whileHover={{ y: -2 }}
                layout>
                {/* Action Buttons */}
                <div className='absolute top-4 right-4 flex gap-2'>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onToggleFavorite?.(pkg.id)}
                        className={`p-2 rounded-full transition-colors ${
                            isFavorite
                                ? 'bg-red-100 text-red-500'
                                : 'bg-gray-100 text-gray-400 hover:text-red-500'
                        }`}>
                        <FaHeart className='text-sm' />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onToggleCompare?.(pkg.id)}
                        className={`p-2 rounded-full transition-colors ${
                            isCompared
                                ? 'bg-blue-100 text-blue-500'
                                : 'bg-gray-100 text-gray-400 hover:text-blue-500'
                        }`}>
                        <FaBalanceScale className='text-sm' />
                    </motion.button>
                </div>

                {/* Header */}
                <div className='text-center mb-6 flex-shrink-0'>
                    <div className='w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <FaHome className='text-2xl' />
                    </div>
                    <h3 className='text-xl font-bold text-gray-900 mb-2'>
                        {pkg.name}
                    </h3>
                    <p className='text-gray-600 text-sm mb-4'>
                        {pkg.description}
                    </p>

                    {/* Price */}
                    <div className='flex items-center justify-center gap-2 mb-2'>
                        <FaTag className='text-purple-500 text-sm' />
                        <span className='text-2xl font-bold text-purple-600'>
                            {formatAud(pkg.basePriceCents)}
                        </span>
                    </div>

                    {/* Unit and Min */}
                    <div className='text-sm text-gray-500 mb-4'>
                        per {pkg.unitLabel}
                        {pkg.minQty > 1 && (
                            <span className='ml-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium'>
                                {getMinChipText()}
                            </span>
                        )}
                    </div>
                </div>

                {/* Features */}
                <div className='mb-6 flex-1'>
                    <h4 className='font-semibold text-gray-900 mb-3 flex items-center gap-2'>
                        <FaCheck className='text-green-500 text-sm' />
                        What&apos;s included:
                    </h4>
                    <ul className='space-y-2'>
                        {pkg.features.slice(0, 4).map((feature, index) => (
                            <li
                                key={index}
                                className='flex items-center gap-2 text-sm text-gray-600'>
                                <FaCheck className='text-green-400 text-xs flex-shrink-0' />
                                {feature}
                            </li>
                        ))}
                        {pkg.features.length > 4 && (
                            <li className='text-xs text-gray-500 ml-4'>
                                +{pkg.features.length - 4} more features
                            </li>
                        )}
                    </ul>

                    {/* Duration */}
                    {pkg.estimatedDuration && (
                        <div className='mt-4 p-3 bg-blue-50 rounded-lg'>
                            <div className='flex items-center gap-2 text-blue-700'>
                                <FaClock className='text-blue-500' />
                                <span className='text-sm font-medium'>
                                    Estimated: {pkg.estimatedDuration}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Section - Always at bottom */}
                <div className='flex-shrink-0'>
                    {/* Simplified Add-ons for Card View */}
                    {pkg.addons && pkg.addons.length > 0 && (
                        <div className='mb-6'>
                            <h4 className='font-semibold text-gray-900 mb-3 flex items-center gap-2'>
                                <FaPlus className='text-purple-500 text-sm' />
                                Add-ons ({pkg.addons.length})
                            </h4>
                            <div className='text-sm text-gray-600'>
                                {pkg.addons.slice(0, 2).map((addon, index) => (
                                    <span key={addon.id}>
                                        {addon.name}
                                        {index <
                                            Math.min(pkg.addons!.length, 2) -
                                                1 && ', '}
                                    </span>
                                ))}
                                {pkg.addons.length > 2 && <span> & more</span>}
                            </div>
                        </div>
                    )}

                    {/* Quick Quantity and Add to Cart */}
                    <div className='space-y-4'>
                        <div className='flex items-center justify-between'>
                            <label className='text-sm font-medium text-gray-700'>
                                Quantity:
                            </label>
                            <div className='flex items-center bg-gray-100 rounded-lg'>
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() =>
                                        setSelectedQuantity(
                                            Math.max(
                                                pkg.minQty,
                                                selectedQuantity - 1
                                            )
                                        )
                                    }
                                    className='p-2 hover:bg-gray-200 rounded-l-lg transition-colors'>
                                    <FaMinus className='text-xs' />
                                </motion.button>
                                <span className='px-4 py-2 text-gray-900 font-medium min-w-[3rem] text-center'>
                                    {selectedQuantity}
                                </span>
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() =>
                                        setSelectedQuantity(
                                            selectedQuantity + 1
                                        )
                                    }
                                    className='p-2 hover:bg-gray-200 rounded-r-lg transition-colors'>
                                    <FaPlus className='text-xs' />
                                </motion.button>
                            </div>
                        </div>

                        {/* Line Total */}
                        <div className='p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100'>
                            <div className='flex justify-between items-center'>
                                <span className='text-sm font-medium text-gray-700'>
                                    Total:
                                </span>
                                <span className='text-lg font-bold text-purple-600'>
                                    {formatAud(calculateLineTotal())}
                                </span>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleAddToCart}
                            disabled={
                                !isHydrated ||
                                selectedQuantity < pkg.minQty ||
                                isAddingToCart
                            }
                            className='w-full py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 bg-[#511076] text-white hover:bg-[#6b2a8f] disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed'>
                            <FaCartPlus className='text-sm' />
                            {!isHydrated
                                ? 'Loading...'
                                : isAddingToCart
                                ? 'Adding...'
                                : 'Add to Cart'}
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        );
    }

    // Render tile view
    return (
        <motion.div
            className='bg-white rounded-xl shadow-md border border-gray-100 p-4 hover:shadow-lg transition-all duration-300 relative'
            whileHover={{ x: 2 }}
            layout>
            <div className='flex items-center gap-4'>
                {/* Icon and Basic Info */}
                <div className='flex-shrink-0'>
                    <div className='w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 text-purple-600 rounded-lg flex items-center justify-center'>
                        <FaHome className='text-lg' />
                    </div>
                </div>

                {/* Main Content */}
                <div className='flex-1 min-w-0'>
                    <div className='flex items-start justify-between'>
                        <div className='flex-1 min-w-0'>
                            <h3 className='text-lg font-bold text-gray-900 truncate'>
                                {pkg.name}
                            </h3>
                            <p className='text-gray-600 text-sm truncate'>
                                {pkg.description}
                            </p>

                            {/* Features preview */}
                            <div className='mt-2 flex items-center gap-2'>
                                <FaCheck className='text-green-500 text-xs' />
                                <span className='text-xs text-gray-600 truncate'>
                                    {pkg.features.slice(0, 2).join(', ')}
                                    {pkg.features.length > 2 && ' & more'}
                                </span>
                            </div>

                            {/* Duration */}
                            {pkg.estimatedDuration && (
                                <div className='mt-1 flex items-center gap-1'>
                                    <FaClock className='text-blue-500 text-xs' />
                                    <span className='text-xs text-gray-600'>
                                        {pkg.estimatedDuration}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Price and Actions */}
                        <div className='flex-shrink-0 text-right ml-4'>
                            <div className='flex items-center gap-1 mb-2'>
                                <FaTag className='text-purple-500 text-xs' />
                                <span className='text-lg font-bold text-purple-600'>
                                    {formatAud(pkg.basePriceCents)}
                                </span>
                            </div>
                            <p className='text-xs text-gray-500 mb-3'>
                                per {pkg.unitLabel}
                            </p>

                            {/* Action buttons */}
                            <div className='flex items-center gap-2 justify-end'>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => onToggleFavorite?.(pkg.id)}
                                    className={`p-1.5 rounded-full transition-colors ${
                                        isFavorite
                                            ? 'bg-red-100 text-red-500'
                                            : 'bg-gray-100 text-gray-400'
                                    }`}>
                                    <FaHeart className='text-xs' />
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => onToggleCompare?.(pkg.id)}
                                    className={`p-1.5 rounded-full transition-colors ${
                                        isCompared
                                            ? 'bg-blue-100 text-blue-500'
                                            : 'bg-gray-100 text-gray-400'
                                    }`}>
                                    <FaBalanceScale className='text-xs' />
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleAddToCart}
                                    disabled={!isHydrated || isAddingToCart}
                                    className='px-3 py-1.5 bg-[#511076] text-white text-xs font-medium rounded-lg hover:bg-[#6b2a8f] disabled:bg-gray-300 transition-colors flex items-center gap-1'>
                                    <FaCartPlus className='text-xs' />
                                    {isAddingToCart ? 'Adding...' : 'Add'}
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

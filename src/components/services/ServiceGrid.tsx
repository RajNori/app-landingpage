'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';
import {
    FaThLarge,
    FaList,
    FaFilter,
    FaHeart,
    FaBalanceScale,
} from 'react-icons/fa';
import {
    SERVICES,
    SERVICE_PACKAGES,
    getPackagesByCategory,
    getServicePackage,
} from '../../lib/catalog';
import PackageCard from './PackageCard';
import CompareModal from './CompareModal';

type ViewMode = 'cards' | 'tiles';

export default function ServiceGrid() {
    const router = useRouter();
    const { getItemCount } = useCart();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );
    const [viewMode, setViewMode] = useState<ViewMode>('cards');
    const [favorites, setFavorites] = useState<Set<string>>(new Set());
    const [compareList, setCompareList] = useState<Set<string>>(new Set());
    const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

    const filteredPackages = selectedCategory
        ? getPackagesByCategory(selectedCategory)
        : SERVICE_PACKAGES;

    const toggleFavorite = (packageId: string) => {
        setFavorites((prev) => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(packageId)) {
                newFavorites.delete(packageId);
            } else {
                newFavorites.add(packageId);
            }
            return newFavorites;
        });
    };

    const toggleCompare = (packageId: string) => {
        setCompareList((prev) => {
            const newCompareList = new Set(prev);
            if (newCompareList.has(packageId)) {
                newCompareList.delete(packageId);
            } else if (newCompareList.size < 3) {
                newCompareList.add(packageId);
            }
            return newCompareList;
        });
    };

    const getComparePackages = () => {
        return Array.from(compareList)
            .map((id) => getServicePackage(id))
            .filter(Boolean) as typeof SERVICE_PACKAGES;
    };

    const handleCompareClick = () => {
        setIsCompareModalOpen(true);
    };

    const handleRemoveFromCompare = (packageId: string) => {
        toggleCompare(packageId);
    };

    // Get total items in cart using the built-in method
    const totalCartItems = getItemCount();

    return (
        <div className='space-y-8 max-w-7xl mx-auto px-4'>
            {/* Header Section */}
            <div className='text-center'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}>
                    <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                        Choose Your Cleaning Service
                    </h2>
                    <p className='text-lg text-gray-600 max-w-2xl mx-auto mb-8'>
                        Professional cleaning services with transparent pricing.
                        Compare packages and find what works for you.
                    </p>
                </motion.div>

                {/* Controls Bar */}
                <div className='flex flex-col md:flex-row gap-4 justify-between items-center mb-8 p-4 bg-gray-50 rounded-2xl'>
                    {/* Category Filter */}
                    <div className='flex items-center gap-2'>
                        <FaFilter className='text-gray-600 text-sm' />
                        <div className='relative'>
                            <select
                                value={selectedCategory || ''}
                                onChange={(e) =>
                                    setSelectedCategory(e.target.value || null)
                                }
                                className='appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium focus:ring-2 focus:ring-purple-500 focus:border-purple-500 cursor-pointer'>
                                <option value=''>All Services</option>
                                {SERVICES.map((service) => (
                                    <option key={service.id} value={service.id}>
                                        {service.name}
                                    </option>
                                ))}
                            </select>
                            {/* Custom dropdown arrow */}
                            <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                                <svg
                                    className='w-4 h-4 text-gray-500'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M19 9l-7 7-7-7'
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* View Toggle */}
                    <div className='flex items-center gap-2 bg-white rounded-lg p-1 border border-gray-300'>
                        <button
                            onClick={() => setViewMode('cards')}
                            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                                viewMode === 'cards'
                                    ? 'bg-[#511076] text-white shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}>
                            <FaThLarge />
                            Cards
                        </button>
                        <button
                            onClick={() => setViewMode('tiles')}
                            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                                viewMode === 'tiles'
                                    ? 'bg-[#511076] text-white shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}>
                            <FaList />
                            Tiles
                        </button>
                    </div>

                    {/* Compare Counter */}
                    {compareList.size > 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className='flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium'>
                            <FaBalanceScale />
                            Compare ({compareList.size}/3)
                        </motion.div>
                    )}
                </div>

                {/* Category Chips - Mobile Friendly */}
                <div className='flex flex-wrap justify-center gap-2 mb-6 md:hidden'>
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            selectedCategory === null
                                ? 'bg-[#511076] text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}>
                        All
                    </button>
                    {SERVICES.map((service) => (
                        <button
                            key={service.id}
                            onClick={() => setSelectedCategory(service.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                selectedCategory === service.id
                                    ? 'bg-[#511076] text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}>
                            {service.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Service Packages Grid */}
            <AnimatePresence mode='wait'>
                <motion.div
                    key={`${viewMode}-${selectedCategory}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={
                        viewMode === 'cards'
                            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch'
                            : 'space-y-4'
                    }>
                    {filteredPackages.length > 0 ? (
                        filteredPackages.map((pkg, index) => (
                            <motion.div
                                key={pkg.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: index * 0.1,
                                }}
                                className='h-full'>
                                <PackageCard
                                    key={pkg.id}
                                    pkg={pkg}
                                    viewMode={viewMode}
                                    isFavorite={favorites.has(pkg.id)}
                                    isCompared={compareList.has(pkg.id)}
                                    onToggleFavorite={toggleFavorite}
                                    onToggleCompare={toggleCompare}
                                />
                            </motion.div>
                        ))
                    ) : (
                        <div className='col-span-full text-center py-12'>
                            <div className='max-w-md mx-auto'>
                                <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                                    <FaFilter className='text-gray-400 text-xl' />
                                </div>
                                <p className='text-gray-500 text-lg mb-2'>
                                    No packages found
                                </p>
                                <p className='text-gray-400 text-sm'>
                                    Try selecting a different category or
                                    viewing all services
                                </p>
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className='mt-4 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors'>
                                    Show All Services
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Action Bar */}
            <motion.div
                className='sticky bottom-4 z-10'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}>
                <div className='bg-white border border-gray-200 rounded-2xl shadow-lg p-4'>
                    <div className='flex flex-col sm:flex-row gap-4 justify-between items-center'>
                        <div className='flex items-center gap-4'>
                            <div className='text-center sm:text-left'>
                                <p className='text-sm text-gray-600'>
                                    {filteredPackages.length} service
                                    {filteredPackages.length !== 1
                                        ? 's'
                                        : ''}{' '}
                                    available
                                </p>
                                {favorites.size > 0 && (
                                    <p className='text-xs text-purple-600 flex items-center gap-1'>
                                        <FaHeart className='text-red-500' />
                                        {favorites.size} favorite
                                        {favorites.size !== 1 ? 's' : ''}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className='flex gap-3'>
                            {compareList.size > 1 && (
                                <button
                                    onClick={handleCompareClick}
                                    className='flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium'>
                                    <FaBalanceScale />
                                    Compare ({compareList.size})
                                </button>
                            )}

                            <button
                                onClick={() => router.push('/cart')}
                                className='flex items-center gap-2 bg-[#511076] hover:bg-[#6b2a8f] text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105'>
                                View Cart
                                {totalCartItems > 0 && (
                                    <span className='bg-white/20 px-2 py-1 rounded text-xs font-medium'>
                                        {totalCartItems}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Compare Modal */}
            <CompareModal
                isOpen={isCompareModalOpen}
                onClose={() => setIsCompareModalOpen(false)}
                packages={getComparePackages()}
                onRemovePackage={handleRemoveFromCompare}
            />
        </div>
    );
}

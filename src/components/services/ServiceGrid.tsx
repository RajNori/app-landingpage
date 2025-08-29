'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    SERVICES,
    SERVICE_PACKAGES,
    getPackagesByCategory,
} from '../../lib/catalog';
import PackageCard from './PackageCard';

export default function ServiceGrid() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );

    const filteredPackages = selectedCategory
        ? getPackagesByCategory(selectedCategory)
        : SERVICE_PACKAGES;

    return (
        <div className='space-y-12'>
            {/* Service Categories */}
            <div className='text-center'>
                <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
                    Our Cleaning Services
                </h2>
                <p className='text-lg text-gray-600 max-w-2xl mx-auto mb-8'>
                    Professional cleaning services tailored to your needs. All
                    prices include GST and are transparent with no hidden fees.
                </p>

                {/* Category Tabs */}
                <div className='flex flex-wrap justify-center gap-3 mb-8'>
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                            selectedCategory === null
                                ? 'bg-[#511076] text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}>
                        All Services
                    </button>
                    {SERVICES.map((service) => (
                        <button
                            key={service.id}
                            onClick={() => setSelectedCategory(service.id)}
                            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                                selectedCategory === service.id
                                    ? 'bg-[#511076] text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}>
                            {service.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Service Packages Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {filteredPackages.length > 0 ? (
                    filteredPackages.map((pkg) => (
                        <PackageCard key={pkg.id} pkg={pkg} />
                    ))
                ) : (
                    <div className='col-span-full text-center py-12'>
                        <p className='text-gray-500 text-lg'>
                            No packages found for the selected category.
                        </p>
                        <p className='text-gray-400 text-sm mt-2'>
                            Selected: {selectedCategory || 'All'}
                        </p>
                    </div>
                )}
            </div>

            {/* CTA Section */}
            <div className='text-center bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100'>
                <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                    Ready to get started?
                </h3>
                <p className='text-gray-600 mb-6 max-w-2xl mx-auto'>
                    Add services to your cart and proceed to checkout. Our team
                    will confirm your booking and schedule your cleaning
                    service.
                </p>
                <button
                    onClick={() => router.push('/cart')}
                    className='bg-[#511076] hover:bg-[#6b2a8f] text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105'>
                    View Cart
                </button>
            </div>
        </div>
    );
}

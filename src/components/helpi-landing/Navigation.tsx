'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Menu, X } from 'lucide-react';
import AuthSection from '../auth/AuthSection';

interface NavigationProps {
    cartItemCount?: number;
}

export default function Navigation({ cartItemCount = 0 }: NavigationProps) {
    // Ensure cart count is stable during SSR and hydration
    const stableCartCount =
        typeof window === 'undefined' || cartItemCount === undefined
            ? 0
            : cartItemCount;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    const handleCartClick = () => {
        router.push('/cart');
    };

    return (
        <nav className='bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center h-16'>
                    {/* Logo */}
                    <Link href='/' className='flex items-center gap-2 sm:gap-3'>
                        <Image
                            src='/helpi-icon-round.png'
                            alt='Helpi'
                            width={40}
                            height={40}
                            className='h-10 w-10 object-contain rounded-xl flex-shrink-0'
                            priority
                        />
                        <span className='text-xl font-bold text-gray-900'>
                            Helpi
                        </span>
                        <span className='text-sm text-[#511076] font-medium ml-1 hidden sm:block'>
                            On-Demand
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className='hidden md:flex items-center space-x-8'>
                        <Link
                            href='/'
                            className='text-gray-700 hover:text-[#511076] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200'>
                            Home
                        </Link>
                        <Link
                            href='/about'
                            className='text-gray-700 hover:text-[#511076] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200'>
                            About
                        </Link>
                        <Link
                            href='/services'
                            className='text-gray-700 hover:text-[#511076] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200'>
                            Services
                        </Link>
                        <Link
                            href='/knowledgebase'
                            className='text-gray-700 hover:text-[#511076] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200'>
                            Help
                        </Link>
                        <Link
                            href='/contact'
                            className='text-gray-700 hover:text-[#511076] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200'>
                            Contact
                        </Link>
                    </div>

                    {/* Desktop Cart & CTA */}
                    <div className='hidden md:flex items-center space-x-4'>
                        {/* Cart Icon with Bubble */}
                        <button
                            onClick={handleCartClick}
                            className='relative p-2 text-gray-700 hover:text-[#511076] transition-colors duration-200'
                            aria-label='Shopping Cart'>
                            <ShoppingCart className='w-6 h-6' />
                            {stableCartCount > 0 && (
                                <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium'>
                                    {stableCartCount > 99
                                        ? '99+'
                                        : stableCartCount}
                                </span>
                            )}
                        </button>

                        {/* Auth Components */}
                        <AuthSection />

                        <Link
                            href='/services'
                            className='bg-[#511076] hover:bg-[#6b2a8f] text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105'>
                            Book Now
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className='md:hidden'>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className='text-gray-700 hover:text-[#511076] p-2 rounded-md transition-colors duration-200'
                            aria-label='Toggle menu'>
                            {isMenuOpen ? (
                                <X className='w-6 h-6' />
                            ) : (
                                <Menu className='w-6 h-6' />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className='md:hidden'>
                        <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100'>
                            <Link
                                href='/'
                                className='text-gray-700 hover:text-[#511076] block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200'
                                onClick={() => setIsMenuOpen(false)}>
                                Home
                            </Link>
                            <Link
                                href='/about'
                                className='text-gray-700 hover:text-[#511076] block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200'
                                onClick={() => setIsMenuOpen(false)}>
                                About
                            </Link>
                            <Link
                                href='/services'
                                className='text-gray-700 hover:text-[#511076] block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200'
                                onClick={() => setIsMenuOpen(false)}>
                                Services
                            </Link>
                            <Link
                                href='/knowledgebase'
                                className='text-gray-700 hover:text-[#511076] block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200'
                                onClick={() => setIsMenuOpen(false)}>
                                Help
                            </Link>
                            <Link
                                href='/contact'
                                className='text-gray-700 hover:text-[#511076] block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200'
                                onClick={() => setIsMenuOpen(false)}>
                                Contact
                            </Link>

                            {/* Mobile Auth & Cart */}
                            <div className='pt-4 border-t border-gray-200 space-y-2'>
                                {/* Mobile Auth */}
                                <AuthSection isMobile={true} />

                                {/* Mobile Cart */}
                                <button
                                    onClick={() => {
                                        handleCartClick();
                                        setIsMenuOpen(false);
                                    }}
                                    className='w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:text-[#511076] transition-colors duration-200'>
                                    <span className='text-base font-medium'>
                                        Cart
                                    </span>
                                    <div className='relative'>
                                        <ShoppingCart className='w-5 h-5' />
                                        {stableCartCount > 0 && (
                                            <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium'>
                                                {stableCartCount > 99
                                                    ? '99+'
                                                    : stableCartCount}
                                            </span>
                                        )}
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

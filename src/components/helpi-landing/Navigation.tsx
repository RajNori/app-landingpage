'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Services', href: '/services' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <nav className='bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center h-16'>
                    {/* Logo */}
                    <Link href='/' className='flex items-center'>
                        <div className='w-10 h-10 bg-[#511076] rounded-xl flex items-center justify-center mr-3'>
                            <span className='text-white font-bold text-xl'>
                                H
                            </span>
                        </div>
                        <span className='text-xl font-bold text-gray-900'>
                            Helpi
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className='hidden md:flex items-center space-x-8'>
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className='text-gray-700 hover:text-[#511076] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200'>
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href='/'
                            className='bg-[#511076] hover:bg-[#6b2a8f] text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 transform hover:scale-105'>
                            Book Now
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className='md:hidden'>
                        <button
                            onClick={toggleMenu}
                            className='text-gray-700 hover:text-[#511076] p-2 rounded-md transition-colors duration-200'
                            aria-label='Toggle menu'>
                            {isMenuOpen ? (
                                <FaTimes size={20} />
                            ) : (
                                <FaBars size={20} />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className='md:hidden bg-white border-t border-gray-100'>
                        <div className='px-2 pt-2 pb-3 space-y-1'>
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className='text-gray-700 hover:text-[#511076] block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200'
                                    onClick={() => setIsMenuOpen(false)}>
                                    {item.name}
                                </Link>
                            ))}
                            <Link
                                href='/'
                                className='bg-[#511076] hover:bg-[#6b2a8f] text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 mt-4'
                                onClick={() => setIsMenuOpen(false)}>
                                Book Now
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

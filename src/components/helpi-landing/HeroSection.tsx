'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
    FaShieldAlt,
    FaCheckCircle,
    FaStar,
    FaCalendarAlt,
    FaHeadset,
    FaGift,
    FaChartBar,
} from 'react-icons/fa';

interface HeroSectionProps {
    title: string;
    subtitle: string;
    primaryCTA: string;
    secondaryCTA: string;
}

export default function HeroSection({
    title,
    subtitle,
    primaryCTA,
    secondaryCTA,
}: HeroSectionProps) {
    const router = useRouter();

    const handleBookNow = () => router.push('/services');
    const handleViewServices = () => router.push('/services');
    const handleServiceBooking = () => {
        router.push('/services');
        // Could add specific service filtering here later
    };

    return (
        <section className='relative min-h-screen flex items-center justify-center px-4 py-16 lg:py-20 overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50'>
            <div className='absolute inset-0 bg-white/60' />

            <div className='relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center'>
                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className='text-center lg:text-left order-2 lg:order-1'>
                    {/* Trust Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.1,
                            ease: 'easeOut',
                        }}
                        className='inline-flex items-center px-4 py-2
                         bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-8 shadow-sm'>
                        <FaStar className='mr-2  text-yellow-500' />
                        Trusted by 50,000+ Australian families
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.2,
                            ease: 'easeOut',
                        }}
                        className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6'>
                        {title}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.4,
                            ease: 'easeOut',
                        }}
                        className='text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed'>
                        {subtitle}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.6,
                            ease: 'easeOut',
                        }}
                        className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8'>
                        <button
                            onClick={handleBookNow}
                            className='bg-[#511076] hover:bg-[#6b2a8f] text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform 
                     hover:scale-105 shadow-lg 
                     cursor-pointer 
                     hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-200'>
                            {primaryCTA}
                        </button>
                        <button
                            onClick={handleViewServices}
                            className='border-2 border-[#511076] text-[#511076] hover:bg-[#511076] hover:text-white 
                        cursor-pointer
                        font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-200'>
                            {secondaryCTA}
                        </button>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.8,
                            ease: 'easeOut',
                        }}
                        className='flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm text-gray-600'>
                        <div className='flex items-center'>
                            <FaCheckCircle className='mr-2 text-green-500' />
                            Background checked
                        </div>
                        <div className='flex items-center'>
                            <FaShieldAlt className='mr-2 text-blue-500' />
                            Fully insured
                        </div>
                        <div className='flex items-center'>
                            <FaStar className='mr-2 text-yellow-500' />
                            99% satisfaction
                        </div>
                    </motion.div>
                </motion.div>

                {/* Phone Mockup */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                    className='relative order-1 lg:order-2'>
                    <div className='relative w-full h-[350px] md:h-[450px] lg:h-[550px] bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-6 lg:p-8 shadow-2xl'>
                        <div className='absolute inset-0 bg-white/20 rounded-3xl backdrop-blur-sm' />

                        {/* Phone Mockup */}
                        <div className='relative z-10 w-full h-full flex items-center justify-center'>
                            <div className='w-[240px] md:w-[260px] h-[480px] md:h-[500px] rounded-[2rem] shadow-2xl bg-white flex flex-col overflow-hidden'>
                                {/* Status Bar */}
                                <div className='h-10 flex items-center justify-between px-4 text-xs bg-[#f5f5f5] border-b'>
                                    <span>9:41</span>
                                    <div className='flex gap-1 items-center'>
                                        <span>📶</span>
                                        <span>📡</span>
                                        <span>🔋</span>
                                    </div>
                                </div>

                                {/* App Header */}
                                <div className='bg-[#511076] text-white p-4'>
                                    <div className='flex items-center justify-between'>
                                        <span className='font-semibold text-lg'>
                                            Helpi
                                        </span>
                                        <span className='text-sm bg-white/20 px-2 py-1 rounded-full'>
                                            Book Now
                                        </span>
                                    </div>
                                </div>

                                {/* Vertically Scrolling Services */}
                                <div className='flex-1 overflow-hidden relative'>
                                    <div className='animate-scroll-up flex flex-col gap-2 p-4'>
                                        {/* Service Tile 1 */}
                                        <div className='bg-gray-50 rounded-xl p-3 border border-gray-100'>
                                            <div className='flex items-center'>
                                                <span className='text-2xl mr-3'>
                                                    🏠
                                                </span>
                                                <div className='flex-1'>
                                                    <div className='font-medium text-gray-900'>
                                                        Regular Cleaning
                                                    </div>
                                                    <div className='text-sm text-gray-500'>
                                                        2-3 hours • $180
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={handleServiceBooking}
                                                    className='bg-[#511076] text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-[#6b2a8f] transition-colors'>
                                                    Book
                                                </button>
                                            </div>
                                        </div>

                                        {/* Service Tile 2 */}
                                        <div className='bg-gray-50 rounded-xl p-3 border border-gray-100'>
                                            <div className='flex items-center'>
                                                <span className='text-2xl mr-3'>
                                                    ✨
                                                </span>
                                                <div className='flex-1'>
                                                    <div className='font-medium text-gray-900'>
                                                        Deep Cleaning
                                                    </div>
                                                    <div className='text-sm text-gray-500'>
                                                        4-5 hours • $280
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={handleServiceBooking}
                                                    className='bg-[#511076] text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-[#6b2a8f] transition-colors'>
                                                    Book
                                                </button>
                                            </div>
                                        </div>

                                        {/* Service Tile 3 */}
                                        <div className='bg-gray-50 rounded-xl p-3 border border-gray-100'>
                                            <div className='flex items-center'>
                                                <span className='text-2xl mr-3'>
                                                    📦
                                                </span>
                                                <div className='flex-1'>
                                                    <div className='flex-1'>
                                                        <div className='font-medium text-gray-900'>
                                                            Move-in/out
                                                        </div>
                                                        <div className='text-sm text-gray-500'>
                                                            6-8 hours • $350
                                                        </div>
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={handleServiceBooking}
                                                    className='bg-[#511076] text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-[#6b2a8f] transition-colors'>
                                                    Book
                                                </button>
                                            </div>
                                        </div>

                                        {/* Service Tile 4 */}
                                        <div className='bg-gray-50 rounded-xl p-3 border border-gray-100'>
                                            <div className='flex items-center'>
                                                <span className='text-2xl mr-3'>
                                                    🏢
                                                </span>
                                                <div className='flex-1'>
                                                    <div className='font-medium text-gray-900'>
                                                        Office Cleaning
                                                    </div>
                                                    <div className='text-sm text-gray-500'>
                                                        3-4 hours • $220
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={handleServiceBooking}
                                                    className='bg-[#511076] text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-[#6b2a8f] transition-colors'>
                                                    Book
                                                </button>
                                            </div>
                                        </div>

                                        {/* Service Tile 5 */}
                                        <div className='bg-gray-50 rounded-xl p-3 border border-gray-100'>
                                            <div className='flex items-center'>
                                                <span className='text-2xl mr-3'>
                                                    🧹
                                                </span>
                                                <div className='flex-1'>
                                                    <div className='font-medium text-gray-900'>
                                                        Carpet Cleaning
                                                    </div>
                                                    <div className='text-sm text-gray-500'>
                                                        2-3 hours • $150
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={handleServiceBooking}
                                                    className='bg-[#511076] text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-[#6b2a8f] transition-colors'>
                                                    Book
                                                </button>
                                            </div>
                                        </div>

                                        {/* Service Tile 6 */}
                                        <div className='bg-gray-50 rounded-xl p-3 border border-gray-100'>
                                            <div className='flex items-center'>
                                                <span className='text-2xl mr-3'>
                                                    🪟
                                                </span>
                                                <div className='flex-1'>
                                                    <div className='font-medium text-gray-900'>
                                                        Window Cleaning
                                                    </div>
                                                    <div className='text-sm text-gray-500'>
                                                        1-2 hours • $160
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={handleServiceBooking}
                                                    className='bg-[#511076] text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-[#6b2a8f] transition-colors'>
                                                    Book
                                                </button>
                                            </div>
                                        </div>

                                        {/* Duplicate tiles for seamless loop */}
                                        {/* Service Tile 1 (Duplicate) */}
                                        <div className='bg-gray-50 rounded-xl p-3 border border-gray-100'>
                                            <div className='flex items-center'>
                                                <span className='text-2xl mr-3'>
                                                    🏠
                                                </span>
                                                <div className='flex-1'>
                                                    <div className='font-medium text-gray-900'>
                                                        Regular Cleaning
                                                    </div>
                                                    <div className='text-sm text-gray-500'>
                                                        2-3 hours • $180
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={handleServiceBooking}
                                                    className='bg-[#511076] text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-[#6b2a8f] transition-colors'>
                                                    Book
                                                </button>
                                            </div>
                                        </div>

                                        {/* Service Tile 2 (Duplicate) */}
                                        <div className='bg-gray-50 rounded-xl p-3 border border-gray-100'>
                                            <div className='flex items-center'>
                                                <span className='text-2xl mr-3'>
                                                    ✨
                                                </span>
                                                <div className='flex-1'>
                                                    <div className='font-medium text-gray-900'>
                                                        Deep Cleaning
                                                    </div>
                                                    <div className='text-sm text-gray-500'>
                                                        4-5 hours • $280
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={handleServiceBooking}
                                                    className='bg-[#511076] text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-[#6b2a8f] transition-colors'>
                                                    Book
                                                </button>
                                            </div>
                                        </div>

                                        {/* Service Tile 2 (Duplicate) */}
                                        <div className='bg-gray-50 rounded-xl p-3 border border-gray-100'>
                                            <div className='flex items-center'>
                                                <span className='text-2xl mr-3'>
                                                    📦
                                                </span>
                                                <div className='flex-1'>
                                                    <div className='font-medium text-gray-900'>
                                                        Move-in/out
                                                    </div>
                                                    <div className='text-sm text-gray-500'>
                                                        6-8 hours • $350
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={handleServiceBooking}
                                                    className='bg-[#511076] text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-[#6b2a8f] transition-colors'>
                                                    Book
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <p className='px-4 pb-3 text-[11px] text-gray-500'>
                                        All Prices Exclude GST
                                    </p>
                                </div>

                                {/* Fixed Bottom - Horizontal Helper Tiles */}
                                <div className='bg-gray-50 border-t border-gray-200 p-3'>
                                    <div className='text-xs font-medium text-gray-600 mb-2'>
                                        Quick Actions
                                    </div>
                                    <div className='flex gap-2 overflow-x-auto scrollbar-hide'>
                                        <div className='flex-shrink-0 bg-white rounded-lg p-2 border border-gray-200 min-w-[80px] text-center hover:shadow-md transition-shadow'>
                                            <FaCalendarAlt className='text-lg mb-1 text-[#511076] mx-auto' />
                                            <div className='text-xs text-gray-700'>
                                                Schedule
                                            </div>
                                        </div>
                                        <div className='flex-shrink-0 bg-white rounded-lg p-2 border border-gray-200 min-w-[80px] text-center hover:shadow-md transition-shadow'>
                                            <FaStar className='text-lg mb-1 text-[#511076] mx-auto' />
                                            <div className='text-xs text-gray-700'>
                                                Reviews
                                            </div>
                                        </div>
                                        <div className='flex-shrink-0 bg-white rounded-lg p-2 border border-gray-200 min-w-[80px] text-center hover:shadow-md transition-shadow'>
                                            <FaHeadset className='text-lg mb-1 text-[#511076] mx-auto' />
                                            <div className='text-xs text-gray-700'>
                                                Support
                                            </div>
                                        </div>
                                        <div className='flex-shrink-0 bg-white rounded-lg p-2 border border-gray-200 min-w-[80px] text-center hover:shadow-md transition-shadow'>
                                            <FaGift className='text-lg mb-1 text-[#511076] mx-auto' />
                                            <div className='text-xs text-gray-700'>
                                                Offers
                                            </div>
                                        </div>
                                        <div className='flex-shrink-0 bg-white rounded-lg p-2 border border-gray-200 min-w-[80px] text-center hover:shadow-md transition-shadow'>
                                            <FaChartBar className='text-lg mb-1 text-[#511076] mx-auto' />
                                            <div className='text-xs text-gray-700'>
                                                History
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating elements */}
                    <motion.div
                        animate={{ y: [-10, 10, -10] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className='absolute -top-4 -right-4 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center shadow-lg'>
                        <span className='text-2xl'>🧹</span>
                    </motion.div>

                    <motion.div
                        animate={{ y: [10, -10, 10] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className='absolute -bottom-4 -left-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shadow-lg'>
                        <span className='text-xl'>✨</span>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className='absolute bottom-8 left-1/2 transform -translate-x-1/2'>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className='w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center'>
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className='w-1 h-3 bg-gray-400 rounded-full mt-2'
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}

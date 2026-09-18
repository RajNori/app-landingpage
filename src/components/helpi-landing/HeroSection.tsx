'use client';

import { motion } from 'framer-motion';
import { scrollToAppDownload } from '@/utils/scroll';
import type { IconType } from 'react-icons';
import {
    FaShieldAlt,
    FaCheckCircle,
    FaStar,
    FaCalendarAlt,
    FaHeadset,
    FaGift,
    FaChartBar,
    FaHome,
    FaMagic,
    FaBoxOpen,
    FaBuilding,
    FaCouch,
    FaThLarge,
} from 'react-icons/fa';

interface HeroService {
    name: string;
    meta: string;
    Icon: IconType;
}

interface HeroAction {
    label: string;
    Icon: IconType;
}

const HERO_SERVICES: HeroService[] = [
    { name: 'Regular Cleaning', meta: '2-3 hours • $180', Icon: FaHome },
    { name: 'Deep Cleaning', meta: '4-5 hours • $280', Icon: FaMagic },
    { name: 'Move-in/out', meta: '6-8 hours • $350', Icon: FaBoxOpen },
    { name: 'Office Cleaning', meta: '3-4 hours • $220', Icon: FaBuilding },
    { name: 'Carpet Cleaning', meta: '2-3 hours • $150', Icon: FaCouch },
    { name: 'Window Cleaning', meta: '1-2 hours • $160', Icon: FaThLarge },
];

const HERO_ACTIONS: HeroAction[] = [
    { label: 'Schedule', Icon: FaCalendarAlt },
    { label: 'Reviews', Icon: FaStar },
    { label: 'Support', Icon: FaHeadset },
    { label: 'Offers', Icon: FaGift },
    { label: 'History', Icon: FaChartBar },
];

const HERO_SERVICE_LOOP: HeroService[] = [...HERO_SERVICES, ...HERO_SERVICES];

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
                            onClick={scrollToAppDownload}
                            className='bg-[#511076] hover:bg-[#6b2a8f] text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform 
                     hover:scale-105 shadow-lg 
                     cursor-pointer 
                     hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-200'>
                            {primaryCTA}
                        </button>
                        <button
                            onClick={scrollToAppDownload}
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
                    <div className='hero-phone-stage relative w-full bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl'>
                        <div className='absolute inset-0 bg-white/20 rounded-3xl backdrop-blur-sm' />

                        <div className='relative z-10 flex h-full w-full items-center justify-center'>
                            <div className='hero-phone-frame' aria-hidden='true'>
                                <HeroPhoneScreen />
                            </div>
                        </div>
                    </div>
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

function HeroPhoneScreen() {
    return (
        <div className='hero-phone flex flex-col overflow-hidden rounded-[48px] bg-[#1c1c1e] p-[10px] text-gray-900 shadow-2xl'>
            <div className='relative isolate flex min-h-0 flex-1 flex-col overflow-hidden rounded-[38px] bg-white'>
                <div className='hero-phone-chrome bg-white'>
                    <div className='flex h-11 items-end justify-between px-6 pb-1.5 text-[15px] font-semibold leading-none'>
                        <span>9:41</span>
                        <div className='flex items-center gap-1.5 text-black'>
                            <CellularIcon />
                            <WifiIcon />
                            <BatteryIcon />
                        </div>
                    </div>

                    <div className='flex items-center justify-between bg-[#511076] px-4 py-3 text-white'>
                        <span className='text-[17px] font-semibold tracking-tight'>
                            Helpi
                        </span>
                        <span className='rounded-full bg-white/20 px-2.5 py-1 text-[12px] font-medium'>
                            Book Now
                        </span>
                    </div>
                </div>

                <div className='hero-phone-list min-h-0 flex-1'>
                    <div className='animate-scroll-up flex flex-col gap-2 p-3'>
                        {HERO_SERVICE_LOOP.map((service, index) => (
                            <div
                                key={`${service.name}-${index}`}
                                className='flex items-center gap-3 rounded-2xl border border-gray-100 bg-neutral-50 px-3 py-2.5'>
                                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#511076] shadow-sm'>
                                    <service.Icon className='text-[18px]' />
                                </div>
                                <div className='min-w-0 flex-1'>
                                    <div className='truncate text-[15px] font-medium leading-5 text-gray-900'>
                                        {service.name}
                                    </div>
                                    <div className='truncate text-[12px] leading-4 text-gray-500'>
                                        {service.meta}
                                    </div>
                                </div>
                                <span className='shrink-0 rounded-lg bg-[#511076] px-2.5 py-1 text-[12px] font-semibold text-white'>
                                    Book
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='hero-phone-chrome bg-white'>
                    <p className='px-4 py-1.5 text-center text-[11px] text-gray-500'>
                        All Prices Exclude GST
                    </p>

                    <div className='border-t border-gray-200 bg-neutral-50 px-3 pb-2 pt-2.5'>
                        <div className='mb-2 text-[11px] font-medium text-gray-500'>
                            Quick Actions
                        </div>
                        <div className='flex gap-1.5'>
                            {HERO_ACTIONS.map((action) => (
                                <div
                                    key={action.label}
                                    className='min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-1 py-2 text-center'>
                                    <action.Icon className='mx-auto mb-1 text-[15px] text-[#511076]' />
                                    <div className='truncate text-[10px] leading-4 text-gray-700'>
                                        {action.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='flex justify-center bg-neutral-50 pb-2 pt-1'>
                        <div className='h-[5px] w-[134px] rounded-full bg-black' />
                    </div>
                </div>
            </div>
        </div>
    );
}

function CellularIcon() {
    return (
        <svg
            width='17'
            height='12'
            viewBox='0 0 17 12'
            fill='currentColor'
            aria-hidden='true'>
            <rect x='0' y='7.5' width='3' height='4.5' rx='0.5' />
            <rect x='4.5' y='5' width='3' height='7' rx='0.5' />
            <rect x='9' y='2.5' width='3' height='9.5' rx='0.5' />
            <rect x='13.5' y='0' width='3' height='12' rx='0.5' />
        </svg>
    );
}

function WifiIcon() {
    return (
        <svg
            width='16'
            height='12'
            viewBox='0 0 16 12'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.6'
            strokeLinecap='round'
            aria-hidden='true'>
            <path d='M1.2 3.8c3.8-3.6 9.8-3.6 13.6 0' />
            <path d='M3.4 6.4c2.6-2.4 6.6-2.4 9.2 0' />
            <path d='M5.8 8.8c1.3-1.2 3.1-1.2 4.4 0' />
            <circle cx='8' cy='11' r='1.1' fill='currentColor' stroke='none' />
        </svg>
    );
}

function BatteryIcon() {
    return (
        <svg
            width='25'
            height='12'
            viewBox='0 0 25 12'
            fill='none'
            aria-hidden='true'>
            <rect
                x='0.6'
                y='0.6'
                width='21'
                height='10.8'
                rx='2.2'
                stroke='currentColor'
                strokeWidth='1.2'
            />
            <rect x='2.2' y='2.2' width='17.8' height='7.6' rx='1.2' fill='currentColor' />
            <path
                d='M23 3.6v4.8c1.2-.5 1.2-4.3 0-4.8Z'
                fill='currentColor'
                opacity='0.45'
            />
        </svg>
    );
}

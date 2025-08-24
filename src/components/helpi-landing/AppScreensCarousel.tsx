'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const appScreens = [
    {
        id: 1,
        title: 'Book Instantly',
        description: 'Find and book cleaning services in under 60 seconds',
        image: '/app-screen-1.png',
        mockup: {
            title: 'Available Services',
            content: [
                { icon: '🏠', text: 'Regular Cleaning', price: '$180' },
                { icon: '✨', text: 'Deep Cleaning', price: '$280' },
                { icon: '📦', text: 'Move-in/out', price: '$350' },
            ],
        },
    },
    {
        id: 2,
        title: 'Track Progress',
        description: "Real-time updates on your cleaner's arrival and progress",
        image: '/app-screen-2.png',
        mockup: {
            title: 'Your Cleaner',
            content: [
                { icon: '👤', text: 'Sarah M.', status: 'On the way' },
                {
                    icon: '🕒',
                    text: 'Arrives in 15 min',
                    status: 'ETA: 2:30 PM',
                },
                { icon: '⭐', text: '4.9/5 rating', status: '150+ cleans' },
            ],
        },
    },
    {
        id: 3,
        title: 'Quality Check',
        description: 'Review and rate your cleaning experience',
        image: '/app-screen-3.png',
        mockup: {
            title: 'Rate Your Clean',
            content: [
                { icon: '✨', text: 'Overall Quality', rating: '⭐⭐⭐⭐⭐' },
                { icon: '⏰', text: 'Punctuality', rating: '⭐⭐⭐⭐⭐' },
                { icon: '🧹', text: 'Thoroughness', rating: '⭐⭐⭐⭐⭐' },
            ],
        },
    },
    {
        id: 4,
        title: 'Schedule Recurring',
        description: 'Set up regular cleanings that fit your schedule',
        image: '/app-screen-4.png',
        mockup: {
            title: 'Recurring Clean',
            content: [
                { icon: '📅', text: 'Every 2 weeks', status: 'Active' },
                { icon: '🏠', text: 'Regular Cleaning', status: '$180' },
                { icon: '⏰', text: 'Next: March 15', status: '2:00 PM' },
            ],
        },
    },
    {
        id: 5,
        title: 'Smart Notifications',
        description: 'Get alerts for cleaner arrival and service updates',
        image: '/app-screen-5.png',
        mockup: {
            title: 'Notifications',
            content: [
                { icon: '🔔', text: 'Cleaner arriving', status: '5 min away' },
                { icon: '✅', text: 'Service started', status: '2:00 PM' },
                { icon: '🎉', text: 'Service complete', status: '4:30 PM' },
            ],
        },
    },
    {
        id: 6,
        title: 'Payment & Billing',
        description: 'Secure payments and transparent billing history',
        image: '/app-screen-6.png',
        mockup: {
            title: 'Payment History',
            content: [
                { icon: '💳', text: 'Last payment', status: '$180' },
                { icon: '📊', text: 'This month', status: '$540' },
                { icon: '🎁', text: 'Loyalty discount', status: '10% off' },
            ],
        },
    },
];

export default function AppScreensCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);

    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        loop: true,
        mode: 'free-snap',
        slides: {
            perView: 1.2,
            spacing: 16,
        },
        breakpoints: {
            '(min-width: 640px)': {
                slides: { perView: 2.2, spacing: 20 },
            },
            '(min-width: 1024px)': {
                slides: { perView: 3.2, spacing: 24 },
            },
        },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created() {
            setLoaded(true);
        },
    });

    // Auto-play functionality
    useEffect(() => {
        const interval = setInterval(() => {
            if (instanceRef.current) {
                instanceRef.current.next();
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [instanceRef]);

    return (
        <section className='py-20 px-4 bg-white'>
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className='text-center mb-16'>
                    <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                        Everything You Need in One App
                    </h2>
                    <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                        Our mobile app makes booking and managing your cleaning
                        services effortless
                    </p>
                </motion.div>

                {/* Carousel Container */}
                <div className='relative'>
                    {/* Keen Slider */}
                    <div ref={sliderRef} className='keen-slider'>
                        {appScreens.map((screen, index) => (
                            <div key={screen.id} className='keen-slider__slide'>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: index * 0.1,
                                    }}
                                    viewport={{ once: true }}
                                    className='min-w-[280px] sm:min-w-[300px] snap-start rounded-xl shadow-lg p-6 bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
                                    {/* Mock Phone */}
                                    <div className='bg-black rounded-3xl p-2 w-full h-64 mb-6'>
                                        <div className='bg-white rounded-2xl p-4 h-full overflow-hidden'>
                                            {/* App Header */}
                                            <div className='bg-[#511076] text-white rounded-xl p-3 mb-4'>
                                                <div className='flex items-center justify-between'>
                                                    <span className='font-semibold text-sm'>
                                                        {screen.mockup.title}
                                                    </span>
                                                    <span className='text-xs'>
                                                        Helpi
                                                    </span>
                                                </div>
                                            </div>

                                            {/* App Content */}
                                            <div className='space-y-3'>
                                                {screen.mockup.content.map(
                                                    (item, itemIndex) => (
                                                        <div
                                                            key={itemIndex}
                                                            className='bg-gray-50 rounded-xl p-3'>
                                                            <div className='flex items-center justify-between'>
                                                                <div className='flex items-center'>
                                                                    <span className='text-lg mr-3'>
                                                                        {
                                                                            item.icon
                                                                        }
                                                                    </span>
                                                                    <span className='font-medium text-sm'>
                                                                        {
                                                                            item.text
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <span className='text-sm text-gray-600'>
                                                                    {'price' in
                                                                    item
                                                                        ? item.price
                                                                        : 'status' in
                                                                          item
                                                                        ? item.status
                                                                        : item.rating}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Screen Info */}
                                    <div className='text-center'>
                                        <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                                            {screen.title}
                                        </h3>
                                        <p className='text-gray-600 text-sm leading-relaxed'>
                                            {screen.description}
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Dots */}
                    {loaded && instanceRef.current && (
                        <div className='flex justify-center mt-8 space-x-2'>
                            {appScreens.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        instanceRef.current?.moveToIdx(index);
                                    }}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        index === currentSlide
                                            ? 'bg-[#511076] w-8'
                                            : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Download CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className='text-center mt-16'>
                    <div className='bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100'>
                        <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                            Download the Helpi App
                        </h3>
                        <p className='text-gray-600 mb-6 max-w-2xl mx-auto'>
                            Get the full Helpi experience on your mobile device.
                            Available on iOS and Android.
                        </p>
                        <div className='flex flex-row items-center gap-4 justify-center'>
                            <a
                                href='#'
                                aria-label='Download on the App Store'
                                className='hover:opacity-80 transition-opacity duration-200 transform hover:scale-105'>
                                <Image
                                    src='/badges/app-store-badge.svg'
                                    width={160}
                                    height={56}
                                    alt='Download on the App Store'
                                    className='h-[56px] w-auto object-contain'
                                />
                            </a>
                            <a
                                href='#'
                                aria-label='Get it on Google Play'
                                className='hover:opacity-80 transition-opacity duration-200 transform hover:scale-105'>
                                <Image
                                    src='/badges/google-play-badge.svg'
                                    width={520}
                                    height={182}
                                    alt='Get it on Google Play'
                                    className='h-[182px] w-auto object-contain'
                                />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

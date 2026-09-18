'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { scrollToAppDownload } from '@/utils/scroll';
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
            note: 'All Prices Exclude GST',
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
            note: 'All Prices Exclude GST',
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
            note: 'All Prices Exclude GST',
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
            origin: 'center',
            perView: 1.15,
            spacing: 16,
        },
        breakpoints: {
            '(min-width: 640px)': {
                slides: { origin: 'auto', perView: 2.2, spacing: 20 },
            },
            '(min-width: 1024px)': {
                slides: { origin: 'auto', perView: 3.2, spacing: 24 },
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
                                    className='snap-start rounded-xl shadow-lg p-6 bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
                                    {/* Mock Phone */}
                                    <div className='relative mx-auto border-gray-300 dark:border-gray-800 bg-gray-300 dark:bg-gray-800 border-[3.5px] rounded-[0.625rem] h-[180px] w-[90px] shadow-2xl mb-4'>
                                        <div className='h-[8px] w-[0.75px] bg-gray-300 dark:bg-gray-800 absolute -start-[4.25px] top-[18px] rounded-s-lg'></div>
                                        <div className='h-[11.5px] w-[0.75px] bg-gray-300 dark:bg-gray-800 absolute -start-[4.25px] top-[31px] rounded-s-lg'></div>
                                        <div className='h-[11.5px] w-[0.75px] bg-gray-300 dark:bg-gray-800 absolute -start-[4.25px] top-[44.5px] rounded-s-lg'></div>
                                        <div className='h-[16px] w-[0.75px] bg-gray-300 dark:bg-gray-800 absolute -end-[4.25px] top-[35.5px] rounded-e-lg'></div>
                                        <div className='rounded-[0.5rem] overflow-hidden w-[83px] h-[173px] bg-white dark:bg-gray-800 relative'>
                                            {/* App Header */}
                                            <div className='bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-lg p-2 relative overflow-hidden'>
                                                {/* Clean Header Visual Elements */}
                                                {screen.id === 1 && (
                                                    <>
                                                        <div className='flex items-center gap-1.5 mb-1'>
                                                            <div className='w-2 h-2 bg-white/90 rounded-full'></div>
                                                            <div className='w-1.5 h-1.5 bg-white/70 rounded-full'></div>
                                                            <div className='w-1 h-1 bg-white/50 rounded-full'></div>
                                                        </div>
                                                        <div className='h-1 bg-white/80 rounded-sm w-3/4'></div>
                                                    </>
                                                )}

                                                {screen.id === 2 && (
                                                    <>
                                                        <div className='flex items-center gap-1.5 mb-1'>
                                                            <div className='w-2 h-2 bg-white/90 rounded-full'></div>
                                                            <div className='h-1 bg-white/70 rounded-sm flex-1'></div>
                                                            <div className='w-1.5 h-1.5 bg-white/60 rounded-full'></div>
                                                        </div>
                                                        <div className='h-1 bg-white/80 rounded-sm w-2/3'></div>
                                                    </>
                                                )}

                                                {screen.id === 3 && (
                                                    <>
                                                        <div className='flex items-center gap-1 mb-1'>
                                                            {[...Array(4)].map(
                                                                (_, i) => (
                                                                    <div
                                                                        key={i}
                                                                        className='w-1.5 h-1.5 bg-white/80 rounded-sm'></div>
                                                                )
                                                            )}
                                                        </div>
                                                        <div className='h-1 bg-white/70 rounded-sm w-full'></div>
                                                    </>
                                                )}

                                                {screen.id === 4 && (
                                                    <>
                                                        <div className='grid grid-cols-5 gap-1 mb-1'>
                                                            {[...Array(5)].map(
                                                                (_, i) => (
                                                                    <div
                                                                        key={i}
                                                                        className='w-1 h-1 bg-white/70 rounded-sm'></div>
                                                                )
                                                            )}
                                                        </div>
                                                        <div className='h-1 bg-white/80 rounded-sm w-4/5'></div>
                                                    </>
                                                )}

                                                {screen.id === 5 && (
                                                    <>
                                                        <div className='flex items-center gap-1.5 mb-1'>
                                                            <div className='w-2 h-2 bg-white/90 rounded-full'></div>
                                                            <div className='h-1 bg-white/70 rounded-sm flex-1'></div>
                                                            <div className='w-1.5 h-1.5 bg-white/60 rounded-full'></div>
                                                        </div>
                                                        <div className='h-1 bg-white/80 rounded-sm w-3/4'></div>
                                                    </>
                                                )}

                                                {screen.id === 6 && (
                                                    <>
                                                        <div className='flex items-center gap-1.5 mb-1'>
                                                            <div className='w-2 h-2 bg-white/90 rounded-full'></div>
                                                            <div className='h-1 bg-white/70 rounded-sm flex-1'></div>
                                                            <div className='w-1.5 h-1.5 bg-white/60 rounded-full'></div>
                                                        </div>
                                                        <div className='h-1 bg-white/80 rounded-sm w-2/3'></div>
                                                    </>
                                                )}
                                            </div>

                                            {/* App Content */}
                                            <div className='p-2.5 space-y-2'>
                                                {/* Clean Mockup Content */}
                                                {screen.id === 1 && (
                                                    <>
                                                        {/* Service Selection UI */}
                                                        <div className='bg-blue-50 rounded-lg p-1.5 border border-blue-200/50'>
                                                            <div className='h-2 bg-blue-400 rounded-sm mb-1'></div>
                                                            <div className='h-1.5 bg-blue-300 rounded-sm w-3/4'></div>
                                                        </div>
                                                        <div className='bg-purple-50 rounded-lg p-1.5 border border-purple-200/50'>
                                                            <div className='h-2 bg-purple-400 rounded-sm mb-1'></div>
                                                            <div className='h-1.5 bg-purple-300 rounded-sm w-2/3'></div>
                                                        </div>
                                                        <div className='bg-green-50 rounded-lg p-1.5 border border-green-200/50'>
                                                            <div className='h-2 bg-green-400 rounded-sm mb-1'></div>
                                                            <div className='h-1.5 bg-green-300 rounded-sm w-4/5'></div>
                                                        </div>
                                                    </>
                                                )}

                                                {screen.id === 2 && (
                                                    <>
                                                        {/* Progress Tracking UI */}
                                                        <div className='bg-gray-50 rounded-lg p-1.5 border border-gray-200/50'>
                                                            <div className='flex items-center gap-1 mb-1'>
                                                                <div className='w-1.5 h-1.5 bg-green-400 rounded-full'></div>
                                                                <div className='h-1 bg-gray-300 rounded-sm flex-1'></div>
                                                            </div>
                                                            <div className='h-1 bg-green-400 rounded-sm w-3/4'></div>
                                                        </div>
                                                        <div className='bg-blue-50 rounded-lg p-1.5 border border-blue-200/50'>
                                                            <div className='flex items-center gap-1 mb-1'>
                                                                <div className='w-1.5 h-1.5 bg-blue-400 rounded-full'></div>
                                                                <div className='h-1 bg-gray-300 rounded-sm flex-1'></div>
                                                            </div>
                                                            <div className='h-1 bg-blue-400 rounded-sm w-1/2'></div>
                                                        </div>
                                                        <div className='bg-purple-50 rounded-lg p-1.5 border border-purple-200/50'>
                                                            <div className='flex items-center gap-1 mb-1'>
                                                                <div className='w-1.5 h-1.5 bg-purple-400 rounded-full'></div>
                                                                <div className='h-1 bg-gray-300 rounded-sm flex-1'></div>
                                                            </div>
                                                            <div className='h-1 bg-purple-400 rounded-sm w-1/4'></div>
                                                        </div>
                                                    </>
                                                )}

                                                {screen.id === 3 && (
                                                    <>
                                                        {/* Rating UI */}
                                                        <div className='bg-yellow-50 rounded-lg p-1.5 border border-yellow-200/50'>
                                                            <div className='flex gap-0.5 mb-1'>
                                                                {[
                                                                    ...Array(5),
                                                                ].map(
                                                                    (_, i) => (
                                                                        <div
                                                                            key={
                                                                                i
                                                                            }
                                                                            className='w-1 h-1 bg-yellow-400 rounded-sm'></div>
                                                                    )
                                                                )}
                                                            </div>
                                                            <div className='h-1 bg-yellow-300 rounded-sm w-full'></div>
                                                        </div>
                                                        <div className='bg-green-50 rounded-lg p-1.5 border border-green-200/50'>
                                                            <div className='flex gap-0.5 mb-1'>
                                                                {[
                                                                    ...Array(5),
                                                                ].map(
                                                                    (_, i) => (
                                                                        <div
                                                                            key={
                                                                                i
                                                                            }
                                                                            className='w-1 h-1 bg-green-400 rounded-sm'></div>
                                                                    )
                                                                )}
                                                            </div>
                                                            <div className='h-1 bg-green-300 rounded-sm w-full'></div>
                                                        </div>
                                                        <div className='bg-blue-50 rounded-lg p-1.5 border border-blue-200/50'>
                                                            <div className='flex gap-0.5 mb-1'>
                                                                {[
                                                                    ...Array(5),
                                                                ].map(
                                                                    (_, i) => (
                                                                        <div
                                                                            key={
                                                                                i
                                                                            }
                                                                            className='w-1 h-1 bg-blue-400 rounded-sm'></div>
                                                                    )
                                                                )}
                                                            </div>
                                                            <div className='h-1 bg-blue-300 rounded-sm w-full'></div>
                                                        </div>
                                                    </>
                                                )}

                                                {screen.id === 4 && (
                                                    <>
                                                        {/* Calendar UI */}
                                                        <div className='bg-purple-50 rounded-lg p-1.5 border border-purple-200/50'>
                                                            <div className='grid grid-cols-7 gap-0.5 mb-1'>
                                                                {[
                                                                    ...Array(7),
                                                                ].map(
                                                                    (_, i) => (
                                                                        <div
                                                                            key={
                                                                                i
                                                                            }
                                                                            className='w-1 h-1 bg-purple-300 rounded-sm'></div>
                                                                    )
                                                                )}
                                                            </div>
                                                            <div className='h-1 bg-purple-400 rounded-sm w-2/3'></div>
                                                        </div>
                                                        <div className='bg-blue-50 rounded-lg p-1.5 border border-blue-200/50'>
                                                            <div className='flex items-center gap-1 mb-1'>
                                                                <div className='w-1.5 h-1.5 bg-blue-400 rounded-full'></div>
                                                                <div className='h-1 bg-gray-300 rounded-sm flex-1'></div>
                                                            </div>
                                                            <div className='h-1 bg-blue-400 rounded-sm w-1/2'></div>
                                                        </div>
                                                        <div className='bg-green-50 rounded-lg p-1.5 border border-green-200/50'>
                                                            <div className='flex items-center gap-1 mb-1'>
                                                                <div className='w-1.5 h-1.5 bg-green-400 rounded-full'></div>
                                                                <div className='h-1 bg-gray-300 rounded-sm flex-1'></div>
                                                            </div>
                                                            <div className='h-1 bg-green-400 rounded-sm w-3/4'></div>
                                                        </div>
                                                    </>
                                                )}

                                                {screen.id === 5 && (
                                                    <>
                                                        {/* Notification UI */}
                                                        <div className='bg-red-50 rounded-lg p-1.5 border border-red-200/50'>
                                                            <div className='flex items-center gap-1 mb-1'>
                                                                <div className='w-1.5 h-1.5 bg-red-400 rounded-full'></div>
                                                                <div className='h-1 bg-gray-300 rounded-sm flex-1'></div>
                                                            </div>
                                                            <div className='h-1 bg-red-400 rounded-sm w-2/3'></div>
                                                        </div>
                                                        <div className='bg-green-50 rounded-lg p-1.5 border border-green-200/50'>
                                                            <div className='flex items-center gap-1 mb-1'>
                                                                <div className='w-1.5 h-1.5 bg-green-400 rounded-full'></div>
                                                                <div className='h-1 bg-gray-300 rounded-sm flex-1'></div>
                                                            </div>
                                                            <div className='h-1 bg-green-400 rounded-sm w-full'></div>
                                                        </div>
                                                        <div className='bg-blue-50 rounded-lg p-1.5 border border-blue-200/50'>
                                                            <div className='flex items-center gap-1 mb-1'>
                                                                <div className='w-1.5 h-1.5 bg-blue-400 rounded-full'></div>
                                                                <div className='h-1 bg-gray-300 rounded-sm flex-1'></div>
                                                            </div>
                                                            <div className='h-1 bg-blue-400 rounded-sm w-4/5'></div>
                                                        </div>
                                                    </>
                                                )}

                                                {screen.id === 6 && (
                                                    <>
                                                        {/* Payment UI */}
                                                        <div className='bg-indigo-50 rounded-lg p-1.5 border border-indigo-200/50'>
                                                            <div className='flex items-center gap-1 mb-1'>
                                                                <div className='w-1.5 h-1.5 bg-indigo-400 rounded-full'></div>
                                                                <div className='h-1 bg-gray-300 rounded-sm flex-1'></div>
                                                            </div>
                                                            <div className='h-1 bg-indigo-400 rounded-sm w-1/3'></div>
                                                        </div>
                                                        <div className='bg-purple-50 rounded-lg p-1.5 border border-purple-200/50'>
                                                            <div className='flex items-center gap-1 mb-1'>
                                                                <div className='w-1.5 h-1.5 bg-purple-400 rounded-full'></div>
                                                                <div className='h-1 bg-gray-300 rounded-sm flex-1'></div>
                                                            </div>
                                                            <div className='h-1 bg-purple-400 rounded-sm w-2/3'></div>
                                                        </div>
                                                        <div className='bg-green-50 rounded-lg p-1.5 border border-green-200/50'>
                                                            <div className='flex items-center gap-1 mb-1'>
                                                                <div className='w-1.5 h-1.5 bg-green-400 rounded-full'></div>
                                                                <div className='h-1 bg-gray-300 rounded-sm flex-1'></div>
                                                            </div>
                                                            <div className='h-1 bg-green-400 rounded-sm w-1/5'></div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            {'note' in screen.mockup && (
                                                <p className='mt-3 text-[11px] text-gray-500'>
                                                    {screen.mockup.note}
                                                </p>
                                            )}
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
                        <div className='flex justify-center'>
                            <button
                                onClick={scrollToAppDownload}
                                className='bg-[#511076] hover:bg-[#6b2a8f] text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-200 cursor-pointer'>
                                Get the App
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

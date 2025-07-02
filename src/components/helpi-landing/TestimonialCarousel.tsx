'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import Image from 'next/image';

interface Testimonial {
    name: string;
    comment: string;
    location: string;
    avatar?: string;
    rating?: number;
}

interface TestimonialCarouselProps {
    testimonials: Testimonial[];
}

export default function TestimonialCarousel({
    testimonials,
}: TestimonialCarouselProps) {
    const [active, setActive] = useState(0);

    const next = () => setActive((prev) => (prev + 1) % testimonials.length);
    const prev = () =>
        setActive(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length
        );

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
                        What Our Customers Say
                    </h2>
                    <p className='text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed'>
                        Real reviews from busy Australian families
                    </p>
                </motion.div>

                {/* Carousel */}
                <div className='relative max-w-3xl mx-auto'>
                    <AnimatePresence initial={false} mode='wait'>
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                            className='bg-white rounded-2xl p-8 lg:p-10 shadow-xl border border-gray-100 text-center relative'
                            aria-live='polite'>
                            {/* Quote Icon */}
                            <div className='absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#511076] text-white rounded-full flex items-center justify-center'>
                                <span className='text-sm'>&ldquo;</span>
                            </div>

                            {/* Avatar */}
                            <div className='flex justify-center mb-6'>
                                <div className='w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-[#511076]'>
                                    {testimonials[active].avatar ? (
                                        <Image 
                                            src={testimonials[active].avatar} 
                                            alt={testimonials[active].name}
                                            width={64}
                                            height={64}
                                            className='w-full h-full rounded-full object-cover'
                                        />
                                    ) : (
                                        testimonials[active].name.charAt(0).toUpperCase()
                                    )}
                                </div>
                            </div>

                            <p className='text-lg lg:text-xl text-gray-800 mb-6 font-medium leading-relaxed'>
                                &ldquo;{testimonials[active].comment}&rdquo;
                            </p>

                            {/* Rating */}
                            {testimonials[active].rating && (
                                <div className='flex justify-center mb-4'>
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className={`w-4 h-4 ${
                                                i < testimonials[active].rating!
                                                    ? 'text-yellow-400'
                                                    : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                            )}

                            <div className='flex flex-col items-center'>
                                <span className='font-semibold text-[#511076] text-lg mb-1'>
                                    {testimonials[active].name}
                                </span>
                                <span className='text-gray-500 text-sm'>
                                    {testimonials[active].location}
                                </span>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Controls */}
                    <div className='flex justify-center mt-8 gap-4'>
                        <button
                            aria-label='Previous testimonial'
                            onClick={prev}
                            className='w-12 h-12 rounded-full bg-gray-100 hover:bg-[#511076] hover:text-white text-gray-700 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-purple-200'>
                            <svg
                                className='w-5 h-5'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M15 19l-7-7 7-7'
                                />
                            </svg>
                        </button>
                        <button
                            aria-label='Next testimonial'
                            onClick={next}
                            className='w-12 h-12 rounded-full bg-gray-100 hover:bg-[#511076] hover:text-white text-gray-700 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-purple-200'>
                            <svg
                                className='w-5 h-5'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M9 5l7 7-7 7'
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Dots */}
                    <div className='flex justify-center mt-6 gap-2'>
                        {testimonials.map((_, idx) => (
                            <button
                                key={idx}
                                aria-label={`Go to testimonial ${idx + 1}`}
                                onClick={() => setActive(idx)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    idx === active
                                        ? 'bg-[#511076] w-8'
                                        : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

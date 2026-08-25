'use client';

import { motion } from 'framer-motion';
import ServiceGrid from '../../components/services/ServiceGrid';

export default function ServicesPage() {
    return (
        <div className='bg-white min-h-screen'>
            {/* Hero Section */}
            <section className='relative py-20 px-4 bg-gradient-to-br from-purple-50 via-white to-blue-50'>
                <div className='absolute inset-0 bg-white/60' />
                <div className='relative max-w-7xl mx-auto text-center'>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className='mb-8'>
                        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6'>
                            General Cleaning Services
                        </h1>
                        <p className='text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
                            Expert cleaning services tailored to your needs. All
                            prices include GST with transparent, upfront pricing
                            - no hidden fees.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <ServiceGrid />

            {/* Why Choose Us Section */}
            <section className='py-16 px-4 bg-purple-50'>
                <div className='max-w-7xl mx-auto'>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className='text-center mb-12'>
                        <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
                            Why Choose Helpi Cleaning?
                        </h2>
                        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                            Professional, reliable, and transparent cleaning
                            services
                        </p>
                    </motion.div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className='text-center'>
                            <div className='w-16 h-16 bg-[#511076] text-white rounded-full flex items-center justify-center mx-auto mb-4'>
                                <span className='text-2xl'>⚡</span>
                            </div>
                            <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                                Instant Booking
                            </h3>
                            <p className='text-gray-600'>
                                Book in under 2 minutes and get instant
                                confirmation
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className='text-center'>
                            <div className='w-16 h-16 bg-[#511076] text-white rounded-full flex items-center justify-center mx-auto mb-4'>
                                <span className='text-2xl'>🕒</span>
                            </div>
                            <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                                Same-Day Service
                            </h3>
                            <p className='text-gray-600'>
                                Book in the morning, get cleaned in the
                                afternoon
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                            className='text-center'>
                            <div className='w-16 h-16 bg-[#511076] text-white rounded-full flex items-center justify-center mx-auto mb-4'>
                                <span className='text-2xl'>📱</span>
                            </div>
                            <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                                Real-Time Updates
                            </h3>
                            <p className='text-gray-600'>
                                Track your cleaner&apos;s arrival and progress
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Quality Guarantee Section */}
            <section className='py-16 px-4 bg-white'>
                <div className='max-w-7xl mx-auto text-center'>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className='mb-8'>
                        <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
                            Our Quality Guarantee
                        </h2>
                        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                            We&apos;re committed to delivering exceptional
                            cleaning results every time
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className='bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100 max-w-4xl mx-auto'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                            <div className='text-left'>
                                <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                                    What We Guarantee
                                </h3>
                                <ul className='space-y-2 text-gray-600'>
                                    <li className='flex items-center gap-2'>
                                        <span className='w-2 h-2 bg-green-400 rounded-full'></span>
                                        Professional, trained cleaners
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <span className='w-2 h-2 bg-green-400 rounded-full'></span>
                                        Eco-friendly cleaning products
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <span className='w-2 h-2 bg-green-400 rounded-full'></span>
                                        Satisfaction guaranteed
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <span className='w-2 h-2 bg-green-400 rounded-full'></span>
                                        Transparent pricing
                                    </li>
                                </ul>
                            </div>
                            <div className='text-left'>
                                <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                                    Our Commitment
                                </h3>
                                <ul className='space-y-2 text-gray-600'>
                                    <li className='flex items-center gap-2'>
                                        <span className='w-2 h-2 bg-blue-400 rounded-full'></span>
                                        On-time arrival
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <span className='w-2 h-2 bg-blue-400 rounded-full'></span>
                                        Thorough cleaning
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <span className='w-2 h-2 bg-blue-400 rounded-full'></span>
                                        Quality inspection
                                    </li>
                                    <li className='flex items-center gap-2'>
                                        <span className='w-2 h-2 bg-blue-400 rounded-full'></span>
                                        Customer support
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

'use client';

import { motion } from 'framer-motion';
import {
    FaHome,
    FaStar,
    FaBoxes,
    FaBuilding,
    FaCouch,
    FaWindowMaximize,
} from 'react-icons/fa';
import Link from 'next/link';

const services = [
    {
        icon: FaHome,
        title: 'Regular Cleaning',
        description:
            'Standard cleaning service for maintaining a clean and tidy home',
        duration: '2-3 hours',
        price: '$180',
        features: [
            'Dusting and wiping surfaces',
            'Vacuuming and mopping floors',
            'Bathroom cleaning',
            'Kitchen cleaning',
            'General tidying up',
        ],
    },
    {
        icon: FaStar,
        title: 'Deep Cleaning',
        description:
            'Comprehensive cleaning service for thorough home refreshment',
        duration: '4-5 hours',
        price: '$280',
        features: [
            'All regular cleaning tasks',
            'Inside appliances cleaning',
            'Detailed bathroom sanitization',
            'Kitchen deep clean',
            'Window cleaning',
            'Baseboard cleaning',
        ],
    },
    {
        icon: FaBoxes,
        title: 'Move-in/out Cleaning',
        description: 'Complete cleaning service for moving transitions',
        duration: '6-8 hours',
        price: '$350',
        features: [
            'Complete deep cleaning',
            'Carpet cleaning',
            'Wall cleaning',
            'Cabinet and drawer cleaning',
            'Light fixture cleaning',
            'Final inspection',
        ],
    },
    {
        icon: FaBuilding,
        title: 'Office Cleaning',
        description: 'Professional cleaning for commercial spaces',
        duration: '3-4 hours',
        price: '$220',
        features: [
            'Desk and surface cleaning',
            'Floor maintenance',
            'Kitchen area cleaning',
            'Bathroom sanitization',
            'Reception area cleaning',
            'Meeting room preparation',
        ],
    },
    {
        icon: FaCouch,
        title: 'Carpet Cleaning',
        description: 'Specialized carpet and upholstery cleaning',
        duration: '2-3 hours',
        price: '$150',
        features: [
            'Deep carpet extraction',
            'Stain removal',
            'Upholstery cleaning',
            'Odor elimination',
            'Protective treatment',
            'Quick drying process',
        ],
    },
    {
        icon: FaWindowMaximize,
        title: 'Window Cleaning',
        description: 'Professional window and glass cleaning service',
        duration: '1-2 hours',
        price: '$160',
        features: [
            'Interior and exterior windows',
            'Glass door cleaning',
            'Mirror cleaning',
            'Window frame cleaning',
            'Screen cleaning',
            'Streak-free finish',
        ],
    },
];

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
                            Our Cleaning Services
                        </h1>
                        <p className='text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
                            Professional cleaning services tailored to your
                            needs. From regular maintenance to deep cleaning,
                            we&apos;ve got you covered.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className='py-20 px-4 bg-white'>
                <div className='max-w-7xl mx-auto'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.1,
                                }}
                                viewport={{ once: true }}
                                className='bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:border-purple-200'>
                                <div className='text-center mb-6'>
                                    <div className='w-16 h-16 bg-[#511076] text-white rounded-full flex items-center justify-center mx-auto mb-4'>
                                        <service.icon className='text-2xl' />
                                    </div>
                                    <h3 className='text-xl font-bold text-gray-900 mb-2'>
                                        {service.title}
                                    </h3>
                                    <p className='text-gray-600 text-sm leading-relaxed'>
                                        {service.description}
                                    </p>
                                </div>

                                <div className='text-center mb-6'>
                                    <div className='flex justify-center items-center gap-4 mb-4'>
                                        <div className='text-center'>
                                            <div className='text-sm text-gray-500'>
                                                Duration
                                            </div>
                                            <div className='font-semibold text-gray-900'>
                                                {service.duration}
                                            </div>
                                        </div>
                                        <div className='text-center'>
                                            <div className='text-sm text-gray-500'>
                                                Price
                                            </div>
                                            <div className='font-bold text-[#511076] text-lg'>
                                                {service.price}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='mb-6'>
                                    <h4 className='font-semibold text-gray-900 mb-3'>
                                        What&apos;s Included:
                                    </h4>
                                    <ul className='space-y-2'>
                                        {service.features.map(
                                            (feature, featureIndex) => (
                                                <li
                                                    key={featureIndex}
                                                    className='flex items-start'>
                                                    <div className='w-2 h-2 bg-[#511076] rounded-full mt-2 mr-3 flex-shrink-0'></div>
                                                    <span className='text-sm text-gray-600'>
                                                        {feature}
                                                    </span>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>

                                <button className='w-full bg-[#511076] hover:bg-[#6b2a8f] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-200'>
                                    Book This Service
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Additional Services */}
            <section className='py-20 px-4 bg-gray-50'>
                <div className='max-w-7xl mx-auto'>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className='text-center mb-16'>
                        <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
                            Custom Cleaning Solutions
                        </h2>
                        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                            Need something specific? We offer custom cleaning
                            solutions tailored to your unique requirements.
                        </p>
                    </motion.div>

                    <div className='grid md:grid-cols-2 gap-8'>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className='bg-white rounded-2xl p-8 shadow-lg border border-gray-100'>
                            <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                                One-Time Cleaning
                            </h3>
                            <p className='text-gray-600 mb-6'>
                                Perfect for special occasions, after
                                renovations, or when you need a fresh start.
                            </p>
                            <ul className='space-y-2 mb-6'>
                                <li className='flex items-center'>
                                    <div className='w-2 h-2 bg-[#511076] rounded-full mr-3'></div>
                                    <span className='text-gray-600'>
                                        Flexible scheduling
                                    </span>
                                </li>
                                <li className='flex items-center'>
                                    <div className='w-2 h-2 bg-[#511076] rounded-full mr-3'></div>
                                    <span className='text-gray-600'>
                                        Customized cleaning plan
                                    </span>
                                </li>
                                <li className='flex items-center'>
                                    <div className='w-2 h-2 bg-[#511076] rounded-full mr-3'></div>
                                    <span className='text-gray-600'>
                                        Special attention to your needs
                                    </span>
                                </li>
                            </ul>
                            <button className='bg-[#511076] hover:bg-[#6b2a8f] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-200'>
                                Get Quote
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className='bg-white rounded-2xl p-8 shadow-lg border border-gray-100'>
                            <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                                Recurring Cleaning
                            </h3>
                            <p className='text-gray-600 mb-6'>
                                Set up regular cleaning schedules that work with
                                your lifestyle and budget.
                            </p>
                            <ul className='space-y-2 mb-6'>
                                <li className='flex items-center'>
                                    <div className='w-2 h-2 bg-[#511076] rounded-full mr-3'></div>
                                    <span className='text-gray-600'>
                                        Weekly, bi-weekly, or monthly
                                    </span>
                                </li>
                                <li className='flex items-center'>
                                    <div className='w-2 h-2 bg-[#511076] rounded-full mr-3'></div>
                                    <span className='text-gray-600'>
                                        Consistent quality and reliability
                                    </span>
                                </li>
                                <li className='flex items-center'>
                                    <div className='w-2 h-2 bg-[#511076] rounded-full mr-3'></div>
                                    <span className='text-gray-600'>
                                        Discounts for regular customers
                                    </span>
                                </li>
                            </ul>
                            <button className='bg-[#511076] hover:bg-[#6b2a8f] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-200'>
                                Set Up Schedule
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className='py-20 px-4 bg-white'>
                <div className='max-w-4xl mx-auto text-center'>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className='bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 lg:p-12 shadow-2xl border border-purple-100'>
                        <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
                            Ready to Get Started?
                        </h2>
                        <p className='text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed'>
                            Choose your service, book your preferred time, and
                            let our professional cleaners take care of the rest.
                            Your satisfaction is guaranteed.
                        </p>
                        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                            <Link
                                href='/'
                                className='bg-[#511076] hover:bg-[#6b2a8f] text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-200'>
                                Book Now
                            </Link>
                            <Link
                                href='/contact'
                                className='border-2 border-[#511076] text-[#511076] hover:bg-[#511076] hover:text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-200'>
                                Contact Us
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

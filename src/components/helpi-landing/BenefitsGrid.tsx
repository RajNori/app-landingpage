'use client';

import { motion } from 'framer-motion';
import {
    FaClock,
    FaShieldAlt,
    FaMoneyCheckAlt,
    FaCheckCircle,
    FaLeaf,
    FaSyncAlt,
} from 'react-icons/fa';

interface Benefit {
    icon: string;
    title: string;
    description: string;
}

interface BenefitsGridProps {
    benefits: Benefit[];
}

// Icon mapping for benefits
const benefitIcons = {
    '🕒': FaClock,
    '🛡️': FaShieldAlt,
    '💰': FaMoneyCheckAlt,
    '🌟': FaCheckCircle,
    '🌿': FaLeaf,
    '📱': FaSyncAlt,
};

export default function BenefitsGrid({ benefits }: BenefitsGridProps) {
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
                        Why Choose Helpi?
                    </h2>
                    <p className='text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed'>
                        Experience the difference with our professional cleaning
                        services
                    </p>
                </motion.div>

                {/* Benefits Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
                    {benefits.map((benefit, index) => {
                        const IconComponent =
                            benefitIcons[
                                benefit.icon as keyof typeof benefitIcons
                            ];
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.1,
                                }}
                                viewport={{ once: true }}
                                className='group'>
                                <div className='bg-white rounded-2xl p-6 lg:p-8 h-full border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:border-purple-200 relative overflow-hidden'>
                                    {/* Background gradient circle */}
                                    <div className='absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-300' />
                                    
                                    <div className='relative z-10 text-center'>
                                        {/* Icon */}
                                        <div className='w-16 h-16 flex items-center justify-center rounded-2xl bg-purple-50 text-[#511076] mx-auto mb-6 group-hover:bg-[#511076] group-hover:text-white transition-all duration-300 shadow-sm'>
                                            {IconComponent && (
                                                <IconComponent
                                                    className='text-2xl'
                                                    aria-label={benefit.title}
                                                />
                                            )}
                                        </div>
                                        <h3 className='text-xl font-semibold text-gray-900 mb-4 leading-tight'>
                                            {benefit.title}
                                        </h3>
                                        <p className='text-gray-600 leading-relaxed'>
                                            {benefit.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Additional CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className='text-center mt-16'>
                    <div className='bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 lg:p-10 shadow-lg border border-purple-100'>
                        <h3 className='text-2xl lg:text-3xl font-bold text-gray-900 mb-4'>
                            Ready to Experience the Difference?
                        </h3>
                        <p className='text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed'>
                            Join thousands of Australian families who trust
                            Helpi for their cleaning needs. Book your first
                            clean today and see why we&apos;re the preferred
                            choice.
                        </p>
                        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                            <button className='bg-[#511076] hover:bg-[#6b2a8f] text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-200'>
                                Book Your First Clean
                            </button>
                            <button className='border-2 border-[#511076] text-[#511076] hover:bg-[#511076] hover:text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-200'>
                                Get a Quote
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

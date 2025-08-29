'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
    FaCalendarCheck,
    FaUserCheck,
    FaShieldAlt,
    FaMoneyCheckAlt,
} from 'react-icons/fa';

interface Step {
    icon: string;
    title: string;
    text: string;
}

interface StepFlowSectionProps {
    steps: Step[];
}

// Icon mapping for steps
const stepIcons = {
    '📱': FaCalendarCheck,
    '👥': FaUserCheck,
    '✨': FaShieldAlt,
    '💳': FaMoneyCheckAlt,
};

export default function StepFlowSection({ steps }: StepFlowSectionProps) {
    const router = useRouter();

    const handleGetStarted = () => router.push('/services');

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
                        How It Works
                    </h2>
                    <p className='text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed'>
                        Get your home professionally cleaned in just 4 simple
                        steps
                    </p>
                </motion.div>

                {/* Steps Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8'>
                    {steps.map((step, index) => {
                        const IconComponent =
                            stepIcons[step.icon as keyof typeof stepIcons];
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
                                className='relative group'>
                                {/* Step number */}
                                <div className='absolute -top-3 -left-3 w-8 h-8 bg-[#511076] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg z-10'>
                                    {index + 1}
                                </div>

                                {/* Step card */}
                                <div className='bg-white rounded-2xl p-6 lg:p-8 h-full border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group-hover:border-purple-200 relative overflow-hidden'>
                                    {/* Background gradient circle */}
                                    <div className='absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-300' />

                                    <div className='relative z-10 text-center'>
                                        {/* Icon */}
                                        <div className='w-16 h-16 flex items-center justify-center rounded-2xl bg-purple-50 text-[#511076] mx-auto mb-6 group-hover:bg-purple-100 transition-all duration-300 shadow-sm'>
                                            {IconComponent && (
                                                <IconComponent
                                                    className='text-2xl'
                                                    aria-label={step.title}
                                                />
                                            )}
                                        </div>
                                        <h3 className='text-xl font-semibold text-gray-900 mb-4 leading-tight'>
                                            {step.title}
                                        </h3>
                                        <p className='text-gray-600 leading-relaxed'>
                                            {step.text}
                                        </p>
                                    </div>
                                </div>

                                {/* Connector line */}
                                {index < steps.length - 1 && (
                                    <div className='hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-200 transform -translate-y-1/2'>
                                        <motion.div
                                            className='w-full h-full bg-[#511076] transform scale-x-0 origin-left'
                                            initial={{ scaleX: 0 }}
                                            whileInView={{ scaleX: 1 }}
                                            transition={{
                                                duration: 0.8,
                                                delay: index * 0.1 + 0.5,
                                            }}
                                            viewport={{ once: true }}
                                        />
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className='text-center mt-16'>
                    <button 
                        onClick={handleGetStarted}
                        className='bg-[#511076] hover:bg-[#6b2a8f] text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-200'>
                        Get Started Now
                    </button>
                </motion.div>
            </div>
        </section>
    );
}

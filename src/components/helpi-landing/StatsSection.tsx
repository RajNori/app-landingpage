'use client';

import { motion } from 'framer-motion';
import { FaStar, FaUsers, FaThumbsUp, FaHeadset } from 'react-icons/fa';

interface Stat {
    number: string;
    label: string;
    icon?: string;
}

interface StatsSectionProps {
    stats: Stat[];
}

// Icon mapping for stats
const statIcons = {
    star: FaStar,
    users: FaUsers,
    thumbs: FaThumbsUp,
    headset: FaHeadset,
};

export default function StatsSection({ stats }: StatsSectionProps) {
    return (
        <section className='py-20 px-4 bg-gray-50'>
            <div className='max-w-7xl mx-auto'>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className='text-center mb-16'>
                    <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                        Why Australians Trust Helpi
                    </h2>
                    <p className='text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed'>
                        Our numbers speak for themselves
                    </p>
                </motion.div>

                <div className='grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8'>
                    {stats.map((stat, idx) => {
                        const IconComponent = stat.icon
                            ? statIcons[stat.icon as keyof typeof statIcons]
                            : FaStar;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className='bg-white rounded-2xl p-6 lg:p-8 flex flex-col items-center border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1'
                                aria-label={stat.label}>
                                {/* Icon */}
                                <div className='w-12 h-12 flex items-center justify-center rounded-full bg-purple-50 text-[#511076] mb-4'>
                                    {IconComponent && (
                                        <IconComponent className='text-xl' />
                                    )}
                                </div>

                                <span className='text-3xl md:text-4xl lg:text-5xl font-bold text-[#511076] mb-3 leading-tight'>
                                    {stat.number}
                                </span>
                                <span className='text-sm md:text-base lg:text-lg text-gray-700 text-center leading-relaxed font-medium'>
                                    {stat.label}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

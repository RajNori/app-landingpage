'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface FinalCTAProps {
    title: string;
    subtitle: string;
    primaryCTA: string;
    secondaryCTA: string;
}

export default function FinalCTA({
    title,
    subtitle,
    primaryCTA,
    secondaryCTA,
}: FinalCTAProps) {
    const ctaClass =
        'bg-[#511076] hover:bg-[#6b2a8f] text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 justify-center focus:outline-none focus:ring-4 focus:ring-purple-200';
    const outlineClass =
        'border-2 border-[#511076] text-[#511076] hover:bg-[#511076] hover:text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 justify-center focus:outline-none focus:ring-4 focus:ring-purple-200';

    return (
        <section className='py-20 px-4 bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden'>
            {/* Background decoration */}
            <div className='absolute inset-0'>
                <div className='absolute top-10 left-10 w-32 h-32 bg-purple-100 rounded-full opacity-30 blur-3xl'></div>
                <div className='absolute bottom-10 right-10 w-40 h-40 bg-blue-100 rounded-full opacity-30 blur-3xl'></div>
            </div>

            <div className='relative max-w-4xl mx-auto text-center'>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight'>
                    {title}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className='text-lg lg:text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed'>
                    {subtitle}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className='flex flex-col sm:flex-row gap-4 justify-center mb-12'>
                    <button className={ctaClass}>{primaryCTA}</button>
                    <button className={outlineClass}>{secondaryCTA}</button>
                </motion.div>

                {/* Download App Badges */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                    className='flex flex-row items-center justify-center gap-4 mb-8'>
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
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                    className='text-sm text-gray-500'>
                    Available on iOS and Android
                </motion.div>
            </div>

            {/* Sticky CTA bar for mobile */}
            <div className='fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-xl flex sm:hidden items-center justify-between px-4 py-4'>
                <div className='flex-1'>
                    <span className='font-semibold text-[#511076] text-sm block'>
                        Ready to get started?
                    </span>
                    <span className='text-xs text-gray-500'>
                        Download Helpi now
                    </span>
                </div>
                <button className='bg-[#511076] hover:bg-[#6b2a8f] text-white px-4 py-2 rounded-xl font-semibold text-sm shadow-lg transition-all duration-200'>
                    Download
                </button>
            </div>
        </section>
    );
}

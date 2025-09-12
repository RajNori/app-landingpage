'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FaHome, FaEnvelope } from 'react-icons/fa';

interface ComingSoonProps {
    title: string;
    message?: string;
}

export default function ComingSoon({
    title,
    message = 'We&apos;re working hard to bring you this feature. Stay tuned!',
}: ComingSoonProps) {
    const router = useRouter();

    return (
        <div className='bg-white min-h-screen'>
            <div className='min-h-screen flex items-center justify-center px-4 py-16'>
                <div className='max-w-2xl mx-auto text-center'>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className='mb-8'>
                        {/* Coming Soon Icon */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className='w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-8'>
                            <span className='text-4xl'>🚧</span>
                        </motion.div>

                        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6'>
                            {title}
                        </h1>

                        <div className='inline-flex items-center px-6 py-3 bg-purple-100 text-purple-800 rounded-full text-lg font-medium mb-8 shadow-sm'>
                            <span className='mr-2'>🛠️</span>
                            Coming Soon
                        </div>

                        <p className='text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12'>
                            {message}
                        </p>

                        {/* Action Buttons */}
                        <div className='flex flex-col sm:flex-row gap-4 justify-center mb-12'>
                            <button
                                onClick={() => router.push('/')}
                                className='bg-[#511076] hover:bg-[#6b2a8f] text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-200 flex items-center justify-center gap-2'>
                                <FaHome className='w-5 h-5' />
                                Back to Home
                            </button>
                            <button
                                onClick={() => router.push('/contact')}
                                className='border-2 border-[#511076] text-[#511076] hover:bg-[#511076] hover:text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-200 flex items-center justify-center gap-2'>
                                <FaEnvelope className='w-5 h-5' />
                                Contact Us
                            </button>
                        </div>

                        {/* Newsletter Signup */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className='bg-gray-50 rounded-2xl p-8 border border-gray-100'>
                            <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                                Be the first to know
                            </h3>
                            <p className='text-gray-600 mb-6'>
                                Get notified when this feature launches.
                                We&apos;ll keep you updated!
                            </p>
                            {/* <div className='flex flex-col sm:flex-row gap-3 max-w-md mx-auto'>
                                <input
                                    type='email'
                                    placeholder='your.email@example.com'
                                    className='flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-[#511076] transition-colors duration-200'
                                />
                                <button className='bg-[#511076] hover:bg-[#6b2a8f] text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105'>
                                    Notify Me
                                </button>
                            </div> */}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

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
    message = "We're working hard to bring you this feature. Stay tuned!",
}: ComingSoonProps) {
    const router = useRouter();

    return (
        <div className='min-h-screen bg-white'>
            <div className='flex min-h-screen items-center justify-center px-4 py-16'>
                <div className='mx-auto max-w-2xl text-center'>
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className='mb-8'>
                        <div className='mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-helpi-soft'>
                            <span className='text-3xl font-bold text-helpi-primary'>
                                Soon
                            </span>
                        </div>

                        <h1 className='mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl'>
                            {title}
                        </h1>

                        <p className='mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-gray-600 md:text-xl'>
                            {message}
                        </p>

                        <div className='mb-12 flex flex-col justify-center gap-4 sm:flex-row'>
                            <button
                                type='button'
                                onClick={() => router.push('/')}
                                className='inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-helpi-primary px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-helpi-secondary focus:outline-none focus-visible:ring-4 focus-visible:ring-helpi-soft'>
                                <FaHome className='h-5 w-5' />
                                Back to Home
                            </button>
                            <a
                                href='mailto:support@gethelpi.com'
                                className='inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border-2 border-helpi-primary px-8 py-4 font-semibold text-helpi-primary transition-all duration-300 hover:bg-helpi-primary hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-helpi-soft'>
                                <FaEnvelope className='h-5 w-5' />
                                Contact us
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

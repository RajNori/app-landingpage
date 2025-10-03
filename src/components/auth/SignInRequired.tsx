'use client';

import { motion } from 'framer-motion';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { FaLock, FaUser, FaArrowRight } from 'react-icons/fa';

interface SignInRequiredProps {
    title?: string;
    message?: string;
}

export default function SignInRequired({
    title = 'Sign In Required',
    message = 'You need to be signed in to access this page.',
}: SignInRequiredProps) {
    return (
        <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className='max-w-md w-full'>
                <div className='bg-white rounded-2xl p-8 text-center shadow-lg border border-gray-100'>
                    {/* Lock Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            delay: 0.2,
                            type: 'spring',
                            stiffness: 200,
                        }}
                        className='w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                        <FaLock className='w-10 h-10 text-purple-600' />
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className='text-2xl font-bold text-gray-900 mb-4'>
                        {title}
                    </motion.h1>

                    {/* Message */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className='text-gray-600 mb-8 leading-relaxed'>
                        {message}
                    </motion.p>

                    {/* Auth Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className='space-y-4'>
                        <SignInButton mode='modal'>
                            <button className='w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2'>
                                <FaUser className='w-4 h-4' />
                                Sign In
                            </button>
                        </SignInButton>

                        <SignUpButton mode='modal'>
                            <button className='w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2'>
                                Create Account
                                <FaArrowRight className='w-4 h-4' />
                            </button>
                        </SignUpButton>
                    </motion.div>

                    {/* Additional Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className='mt-8 text-center text-sm text-gray-500'>
                        <p>
                            New to Helpi? Create an account to get started with
                            our cleaning services.
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

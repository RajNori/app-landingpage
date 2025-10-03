'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import AuthModal from '../../components/auth/AuthModal';

function CheckoutContent() {
    const searchParams = useSearchParams();
    const status = searchParams.get('status');
    const sessionId = searchParams.get('session_id');
    const { clearCart } = useCart();
    // const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (status === 'success' && sessionId) {
            // Clear the cart after successful payment
            clearCart();
            console.log(
                'Payment successful, session:',
                sessionId,
                '- Cart cleared'
            );
        }
    }, [status, sessionId, clearCart]);

    const getStatusContent = () => {
        switch (status) {
            case 'success':
                return {
                    icon: FaCheckCircle,
                    title: 'Payment Successful!',
                    message:
                        "Thank you for your booking. We'll send you a confirmation email shortly.",
                    color: 'text-green-600',
                    bgColor: 'bg-green-50',
                    iconColor: 'text-green-500',
                };
            case 'cancelled':
                return {
                    icon: FaTimesCircle,
                    title: 'Payment Cancelled',
                    message:
                        'Your payment was cancelled. You can try again or contact us for assistance.',
                    color: 'text-red-600',
                    bgColor: 'bg-red-50',
                    iconColor: 'text-red-500',
                };
            default:
                return {
                    icon: FaSpinner,
                    title: 'Processing...',
                    message: 'Please wait while we process your payment.',
                    color: 'text-blue-600',
                    bgColor: 'bg-blue-50',
                    iconColor: 'text-blue-500',
                };
        }
    };

    const content = getStatusContent();
    const IconComponent = content.icon;

    return (
        <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className='max-w-md w-full'>
                <div
                    className={`${content.bgColor} rounded-2xl p-8 text-center shadow-lg`}>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            delay: 0.2,
                            type: 'spring',
                            stiffness: 200,
                        }}
                        className={`w-20 h-20 ${content.iconColor} mx-auto mb-6`}>
                        <IconComponent className='w-full h-full' />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className={`text-2xl font-bold ${content.color} mb-4`}>
                        {content.title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className='text-gray-600 mb-6 leading-relaxed'>
                        {content.message}
                    </motion.p>

                    {status === 'success' && sessionId && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className='bg-white rounded-lg p-4 mb-6 text-left'>
                            <div className='text-sm text-gray-600 mb-2'>
                                Session ID:
                            </div>
                            <div className='font-mono text-xs bg-gray-100 p-2 rounded break-all'>
                                {sessionId}
                            </div>
                        </motion.div>
                    )}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className='space-y-3'>
                        <button
                            onClick={() => (window.location.href = '/services')}
                            className='w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200'>
                            {status === 'success'
                                ? 'Book Another Service'
                                : 'Try Again'}
                        </button>

                        <button
                            onClick={() => (window.location.href = '/')}
                            className='w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors duration-200'>
                            Back to Home
                        </button>
                    </motion.div>
                </div>

                {/* Additional Info */}
                {status === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className='mt-6 text-center text-sm text-gray-500'>
                        <p>
                            You will receive a confirmation email with your
                            booking details.
                        </p>
                        <p className='mt-2'>
                            Our team will contact you within 24 hours to confirm
                            your appointment.
                        </p>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <>
            <SignedIn>
                <Suspense
                    fallback={
                        <div className='min-h-screen flex items-center justify-center'>
                            <FaSpinner className='w-8 h-8 animate-spin text-purple-600' />
                        </div>
                    }>
                    <CheckoutContent />
                </Suspense>
            </SignedIn>

            <SignedOut>
                <AuthModal
                    isOpen={true}
                    onClose={() => window.location.href = '/cart'}
                    title='Sign In to Complete Checkout'
                    message='You need to be signed in to complete your booking and payment.'
                    showSignUp={true}
                    onAuthSuccess={() => window.location.reload()}
                />
            </SignedOut>
        </>
    );
}

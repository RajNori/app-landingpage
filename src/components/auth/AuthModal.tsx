'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { FaUser, FaArrowRight, FaTimes, FaLock, FaCheckCircle } from 'react-icons/fa';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
    showSignUp?: boolean;
}

export default function AuthModal({
    isOpen,
    onClose,
    title = "Sign In Required",
    message = "Please sign in to continue with your order.",
    showSignUp = true
}: AuthModalProps) {

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                    className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <FaTimes className="w-5 h-5" />
                    </button>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <FaLock className="w-10 h-10 text-purple-600" />
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-2xl font-bold text-gray-900 mb-3"
                        >
                            {title}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-600 leading-relaxed"
                        >
                            {message}
                        </motion.p>
                    </div>

                    {/* Auth Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-4"
                    >
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                                    <FaUser className="w-5 h-5" />
                                    Sign In
                                </button>
                            </SignInButton>

                            {showSignUp && (
                                <SignUpButton mode="modal">
                                    <button className="w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3">
                                        Create Account
                                        <FaArrowRight className="w-4 h-4" />
                                    </button>
                                </SignUpButton>
                            )}
                        </SignedOut>

                        <SignedIn>
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-3 mb-4">
                                    <FaCheckCircle className="w-6 h-6 text-green-500" />
                                    <span className="text-green-600 font-medium">You&apos;re signed in!</span>
                                </div>
                                <UserButton 
                                    appearance={{
                                        elements: {
                                            avatarBox: "w-12 h-12"
                                        }
                                    }}
                                />
                                <p className="text-sm text-gray-500 mt-2">
                                    You can now complete your order
                                </p>
                            </div>
                        </SignedIn>
                    </motion.div>

                    {/* Footer */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-8 text-center text-sm text-gray-500"
                    >
                        <p>
                            Your privacy is important to us. We use Clerk for secure authentication.
                        </p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

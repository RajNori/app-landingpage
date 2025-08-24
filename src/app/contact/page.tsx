'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import Link from 'next/link';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: 'success' | 'error' | null;
        message: string;
        errors?: string[];
    }>({ type: null, message: '' });

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: '' });

        try {
            // Submit to our API proxy to avoid Google Apps Script redirect issues
            const response = await fetch('/api/contact-proxy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setSubmitStatus({
                    type: 'success',
                    message:
                        result.message ||
                        "Thank you for your message! We'll get back to you soon.",
                });

                // Reset form
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    subject: '',
                    message: '',
                });
            } else {
                // Handle different error types
                let errorMessage = 'Form submission failed';
                let errors: string[] = [];

                if (response.status === 400 && result.errors) {
                    // Validation errors
                    errors = result.errors;
                    errorMessage = 'Please fix the following errors:';
                } else if (response.status === 429) {
                    errorMessage =
                        'Rate limit exceeded. Please try again in a minute.';
                } else if (response.status === 500) {
                    errorMessage = 'Something went wrong. Please try again.';
                } else if (result.error?.message) {
                    errorMessage = result.error.message;
                }

                setSubmitStatus({
                    type: 'error',
                    message: errorMessage,
                    errors: errors.length > 0 ? errors : undefined,
                });
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus({
                type: 'error',
                message: 'Failed to submit form. Please try again.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

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
                            Contact Us
                        </h1>
                        <p className='text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
                            Get in touch with our team. We&apos;re here to help
                            with any questions about our on-demand cleaning
                            services.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Information */}
            <section className='py-20 px-4 bg-white'>
                <div className='max-w-7xl mx-auto'>
                    <div className='grid lg:grid-cols-2 gap-16'>
                        {/* Contact Details */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}>
                            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-8'>
                                Get in Touch
                            </h2>
                            <div className='space-y-8'>
                                <div className='flex items-start space-x-4'>
                                    <div className='w-12 h-12 bg-[#511076] text-white rounded-full flex items-center justify-center flex-shrink-0'>
                                        <FaEnvelope className='text-xl' />
                                    </div>
                                    <div>
                                        <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                                            Email
                                        </h3>
                                        <p className='text-gray-600'>
                                            support@gethelpi.com
                                        </p>
                                        <p className='text-sm text-gray-500 mt-1'>
                                            We&apos;ll respond within 24 hours
                                        </p>
                                    </div>
                                </div>

                                <div className='flex items-start space-x-4'>
                                    <div className='w-12 h-12 bg-[#511076] text-white rounded-full flex items-center justify-center flex-shrink-0'>
                                        <FaPhone className='text-xl' />
                                    </div>
                                    <div>
                                        <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                                            Phone
                                        </h3>
                                        <p className='text-gray-600'>
                                            +61 3 9000 0000
                                        </p>
                                        <p className='text-sm text-gray-500 mt-1'>
                                            Monday - Friday, 9 AM - 6 PM AEST
                                        </p>
                                    </div>
                                </div>

                                <div className='flex items-start space-x-4'>
                                    <div className='w-12 h-12 bg-[#511076] text-white rounded-full flex items-center justify-center flex-shrink-0'>
                                        <FaMapMarkerAlt className='text-xl' />
                                    </div>
                                    <div>
                                        <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                                            Location
                                        </h3>
                                        <p className='text-gray-600'>
                                            Melbourne, Victoria, Australia
                                        </p>
                                        <p className='text-sm text-gray-500 mt-1'>
                                            Serving all of Australia
                                        </p>
                                    </div>
                                </div>

                                <div className='flex items-start space-x-4'>
                                    <div className='w-12 h-12 bg-[#511076] text-white rounded-full flex items-center justify-center flex-shrink-0'>
                                        <FaClock className='text-xl' />
                                    </div>
                                    <div>
                                        <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                                            Support Hours
                                        </h3>
                                        <p className='text-gray-600'>
                                            24/7 Customer Support
                                        </p>
                                        <p className='text-sm text-gray-500 mt-1'>
                                            On-demand support for on-demand
                                            cleaning
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}>
                            <div className='bg-gray-50 rounded-2xl p-8 lg:p-10 shadow-lg border border-gray-100'>
                                <h3 className='text-2xl font-bold text-gray-900 mb-6'>
                                    Send us a Message
                                </h3>

                                {/* Status Messages */}
                                <div
                                    aria-live='polite'
                                    aria-atomic='true'
                                    className='mb-6'>
                                    {submitStatus.type && (
                                        <div
                                            className={`p-4 rounded-xl ${
                                                submitStatus.type === 'success'
                                                    ? 'bg-green-50 border border-green-200 text-green-800'
                                                    : 'bg-red-50 border border-red-200 text-red-800'
                                            }`}>
                                            <div className='font-medium'>
                                                {submitStatus.message}
                                            </div>
                                            {submitStatus.errors &&
                                                submitStatus.errors.length >
                                                    0 && (
                                                    <ul className='mt-2 list-disc list-inside text-sm'>
                                                        {submitStatus.errors.map(
                                                            (error, index) => (
                                                                <li key={index}>
                                                                    {error}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                )}
                                        </div>
                                    )}
                                </div>

                                <form
                                    id='contactForm'
                                    onSubmit={handleSubmit}
                                    className='space-y-6'>
                                    <div className='grid md:grid-cols-2 gap-6'>
                                        <div>
                                            <label
                                                htmlFor='firstName'
                                                className='block text-sm font-medium text-gray-700 mb-2'>
                                                First Name *
                                            </label>
                                            <input
                                                type='text'
                                                id='firstName'
                                                name='firstName'
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                                className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-[#511076] transition-colors duration-200'
                                                placeholder='Your first name'
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor='lastName'
                                                className='block text-sm font-medium text-gray-700 mb-2'>
                                                Last Name *
                                            </label>
                                            <input
                                                type='text'
                                                id='lastName'
                                                name='lastName'
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                required
                                                className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-[#511076] transition-colors duration-200'
                                                placeholder='Your last name'
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor='email'
                                            className='block text-sm font-medium text-gray-700 mb-2'>
                                            Email Address *
                                        </label>
                                        <input
                                            type='email'
                                            id='email'
                                            name='email'
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-[#511076] transition-colors duration-200'
                                            placeholder='your.email@example.com'
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor='subject'
                                            className='block text-sm font-medium text-gray-700 mb-2'>
                                            Subject *
                                        </label>
                                        <select
                                            id='subject'
                                            name='subject'
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                            className='w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-[#511076] transition-colors duration-200 appearance-none bg-white'
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                                                backgroundPosition:
                                                    'right 12px center',
                                                backgroundSize: '16px',
                                                backgroundRepeat: 'no-repeat',
                                            }}>
                                            <option value=''>
                                                Select a subject
                                            </option>
                                            <option value='general'>
                                                General Inquiry
                                            </option>
                                            <option value='support'>
                                                Technical Support
                                            </option>
                                            <option value='billing'>
                                                Billing Question
                                            </option>
                                            <option value='partnership'>
                                                Partnership Opportunity
                                            </option>
                                            <option value='other'>Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor='message'
                                            className='block text-sm font-medium text-gray-700 mb-2'>
                                            Message *
                                        </label>
                                        <textarea
                                            id='message'
                                            name='message'
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            rows={5}
                                            className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-[#511076] transition-colors duration-200 resize-none'
                                            placeholder='Tell us how we can help you...'></textarea>
                                    </div>

                                    <button
                                        type='submit'
                                        disabled={isSubmitting}
                                        className={`w-full font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-purple-200 ${
                                            isSubmitting
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-[#511076] hover:bg-[#6b2a8f] hover:scale-105 shadow-lg hover:shadow-xl'
                                        } text-white`}>
                                        {isSubmitting ? (
                                            <span className='flex items-center justify-center'>
                                                <svg
                                                    className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    fill='none'
                                                    viewBox='0 0 24 24'>
                                                    <circle
                                                        className='opacity-25'
                                                        cx='12'
                                                        cy='12'
                                                        r='10'
                                                        stroke='currentColor'
                                                        strokeWidth='4'></circle>
                                                    <path
                                                        className='opacity-75'
                                                        fill='currentColor'
                                                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                                                </svg>
                                                Sending...
                                            </span>
                                        ) : (
                                            'Send Message'
                                        )}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className='py-20 px-4 bg-gray-50'>
                <div className='max-w-4xl mx-auto text-center'>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}>
                        <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
                            Frequently Asked Questions
                        </h2>
                        <p className='text-lg text-gray-600 mb-8 max-w-2xl mx-auto'>
                            Can&apos;t find what you&apos;re looking for? Check
                            out our FAQ section or get in touch directly.
                        </p>
                        <Link
                            href='/'
                            className='inline-block bg-[#511076] hover:bg-[#6b2a8f] text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-200'>
                            View FAQ
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

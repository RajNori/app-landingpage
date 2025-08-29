'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FaPlus, FaMinus, FaQuestionCircle } from 'react-icons/fa';

interface FAQ {
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
    const router = useRouter();
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const handleContactSupport = () => router.push('/contact');

    return (
        <section className='py-20 px-4 bg-gray-50'>
            <div className='max-w-4xl mx-auto'>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className='text-center mb-16'>
                    <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                        Frequently Asked Questions
                    </h2>
                    <p className='text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed'>
                        Everything you need to know about Helpi&apos;s cleaning
                        services
                    </p>
                </motion.div>

                {/* Accordion */}
                <div className='space-y-4'>
                    {faqs.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            viewport={{ once: true }}>
                            <div className='bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300'>
                                <button
                                    onClick={() => toggleAccordion(idx)}
                                    className='w-full flex items-center justify-between text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-200 focus-visible:ring-offset-2 rounded-xl p-2 -m-2'>
                                    <div className='flex items-center flex-1'>
                                        <div className='w-8 h-8 flex items-center justify-center rounded-full bg-purple-50 text-[#511076] mr-4 group-hover:bg-purple-100 transition-all duration-200'>
                                            <FaQuestionCircle className='w-4 h-4' />
                                        </div>
                                        <span className='font-semibold text-lg text-gray-900 leading-tight'>
                                            {faq.question}
                                        </span>
                                    </div>
                                    <div className='flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-purple-50 group-hover:bg-purple-100 transition-all duration-200'>
                                        {expandedIndex === idx ? (
                                            <FaMinus className='w-4 h-4 text-[#511076] transition-transform duration-200' />
                                        ) : (
                                            <FaPlus className='w-4 h-4 text-[#511076] transition-transform duration-200' />
                                        )}
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {expandedIndex === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{
                                                height: 'auto',
                                                opacity: 1,
                                            }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{
                                                duration: 0.3,
                                                ease: 'easeInOut',
                                            }}
                                            className='overflow-hidden'>
                                            <div className='mt-6 pt-6 border-t border-gray-100'>
                                                <p className='text-gray-600 leading-relaxed text-base'>
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Help */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className='text-center mt-16'>
                    <div className='bg-white rounded-2xl p-8 lg:p-10 shadow-xl border border-gray-100 relative overflow-hidden'>
                        {/* Background gradient */}
                        <div className='absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 opacity-50' />
                        <div className='relative z-10'>
                            <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                                Still have questions?
                            </h3>
                            <p className='text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed'>
                                Our support team is here to help you 24/7. Get
                                in touch and we&apos;ll get back to you as soon
                                as possible.
                            </p>
                            <button
                                onClick={handleContactSupport}
                                className='bg-[#511076] hover:bg-[#6b2a8f] text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-200'>
                                Contact Support
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

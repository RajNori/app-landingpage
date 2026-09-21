'use client';

import { useId, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { SUPPORT_EMAIL } from '@/utils/constants';

interface FAQ {
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const baseId = useId();
    const reduceMotion = useReducedMotion();

    return (
        <section className='border-t border-gray-100 bg-white px-4 py-12 md:pb-8 md:pt-16'>
            <div className='mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.25fr)] lg:items-start lg:gap-12'>
                <div className='lg:sticky lg:top-24'>
                    <p className='mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-helpi-primary'>
                        FAQ
                    </p>
                    <h2 className='mb-3 text-balance text-3xl font-bold tracking-tight text-gray-900 md:text-4xl'>
                        Frequently asked questions
                    </h2>
                    <p className='mb-6 max-w-md text-base leading-relaxed text-gray-600 md:text-lg'>
                        Booking through the app, choosing a time, and getting
                        support.
                    </p>
                    <div className='rounded-2xl bg-helpi-soft/50 px-5 py-4'>
                        <p className='mb-1 text-sm font-semibold text-gray-900'>
                            Still have a question?
                        </p>
                        <p className='mb-2 text-sm text-gray-600'>
                            Email the Helpi team and we will get back to you.
                        </p>
                        <a
                            href={`mailto:${SUPPORT_EMAIL}`}
                            className='inline-flex min-h-11 items-center text-sm font-medium text-helpi-primary underline-offset-2 hover:underline focus:outline-none focus-visible:ring-4 focus-visible:ring-helpi-soft'>
                            {SUPPORT_EMAIL}
                        </a>
                    </div>
                </div>

                <div className='divide-y divide-gray-100 overflow-hidden rounded-[1.5rem] ring-1 ring-gray-100'>
                    {faqs.map((faq, idx) => {
                        const panelId = `${baseId}-panel-${idx}`;
                        const buttonId = `${baseId}-button-${idx}`;
                        const open = expandedIndex === idx;
                        return (
                            <div key={faq.question} className='bg-white'>
                                <h3>
                                    <button
                                        type='button'
                                        id={buttonId}
                                        aria-expanded={open}
                                        aria-controls={panelId}
                                        onClick={() =>
                                            setExpandedIndex(open ? null : idx)
                                        }
                                        className='flex min-h-11 w-full items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-helpi-soft'>
                                        <span className='text-base font-semibold text-gray-900'>
                                            {faq.question}
                                        </span>
                                        <span
                                            className={`shrink-0 text-lg font-medium text-helpi-primary ${
                                                open ? 'rotate-0' : ''
                                            }`}>
                                            {open ? '−' : '+'}
                                        </span>
                                    </button>
                                </h3>
                                <AnimatePresence initial={false}>
                                    {open ? (
                                        <motion.div
                                            id={panelId}
                                            role='region'
                                            aria-labelledby={buttonId}
                                            initial={
                                                reduceMotion === true
                                                    ? false
                                                    : { height: 0, opacity: 0 }
                                            }
                                            animate={{
                                                height: 'auto',
                                                opacity: 1,
                                            }}
                                            exit={
                                                reduceMotion === true
                                                    ? undefined
                                                    : {
                                                          height: 0,
                                                          opacity: 0,
                                                      }
                                            }
                                            className='overflow-hidden'>
                                            <p className='px-5 pb-4 text-sm leading-relaxed text-gray-600 md:text-base'>
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    ) : null}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

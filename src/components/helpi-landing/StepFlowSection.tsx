'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SECTION_IDS } from '@/utils/constants';
import PhoneFrame from './PhoneFrame';
import AppBookingDemo from './AppBookingDemo';

interface Step {
    icon: string;
    title: string;
    text: string;
}

interface StepFlowSectionProps {
    steps: Step[];
}

export default function StepFlowSection({ steps }: StepFlowSectionProps) {
    const reduceMotion = useReducedMotion();

    return (
        <section
            id={SECTION_IDS.howItWorks}
            className='scroll-mt-20 bg-helpi-soft/40 px-4 py-14 md:py-20'>
            <div className='mx-auto max-w-6xl'>
                <div className='mb-10 max-w-2xl'>
                    <p className='mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-helpi-primary'>
                        How it works
                    </p>
                    <h2 className='mb-3 text-balance text-3xl font-bold tracking-tight text-gray-900 md:text-4xl'>
                        How it works
                    </h2>
                    <p className='text-base leading-relaxed text-gray-600 md:text-lg'>
                        Arrange a clean in three steps in the Helpi app.
                    </p>
                </div>

                <div className='grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_auto] lg:gap-14'>
                    <div className='flex flex-col gap-4'>
                        {steps.map((step, index) => (
                            <motion.article
                                key={step.title}
                                initial={
                                    reduceMotion === true
                                        ? false
                                        : { opacity: 0, y: 16 }
                                }
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.45,
                                    delay: index * 0.08,
                                }}
                                viewport={{ once: true, amount: 0.3 }}
                                className='rounded-[1.5rem] bg-white p-5 shadow-[0_12px_32px_-20px_rgba(106,26,217,0.35)] ring-1 ring-white'>
                                <span className='mb-3 inline-flex h-9 min-w-9 items-center justify-center rounded-full bg-helpi-primary px-3 text-sm font-semibold text-white'>
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <h3 className='mb-1.5 text-lg font-semibold tracking-tight text-gray-900'>
                                    {step.title}
                                </h3>
                                <p className='text-sm leading-relaxed text-gray-600'>
                                    {step.text}
                                </p>
                            </motion.article>
                        ))}
                    </div>

                    <div className='flex flex-col items-center'>
                        <p className='sr-only'>
                            Illustrative Helpi app preview: home cleaning, then
                            choosing a time. Pricing shown is not a live quote.
                        </p>
                        <div className='hero-phone-stage relative'>
                            <PhoneFrame decorative>
                                <AppBookingDemo />
                            </PhoneFrame>
                        </div>
                        <p className='mt-3 max-w-xs text-center text-xs leading-relaxed text-gray-500'>
                            Preview only. Pricing and availability shown are
                            illustrative.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

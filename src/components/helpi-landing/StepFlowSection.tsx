'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
    FaCalendarCheck,
    FaUserCheck,
    FaShieldAlt,
    FaMoneyCheckAlt,
} from 'react-icons/fa';

interface Step {
    icon: string;
    title: string;
    text: string;
}

interface StepFlowSectionProps {
    steps: Step[];
}

const stepIcons = {
    '📱': FaCalendarCheck,
    '👥': FaUserCheck,
    '✨': FaShieldAlt,
    '💳': FaMoneyCheckAlt,
};

const STEP_LADDER_PX = [0, 16, 32, 48];

function formatStepLabel(index: number): string {
    return `STEP ${String(index + 1).padStart(2, '0')}`;
}

function ladderOffsetFor(index: number): number {
    const value = STEP_LADDER_PX[index];
    if (value !== undefined) {
        return value;
    }
    return 48;
}

function useIsMobile(): boolean {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const media = window.matchMedia('(max-width: 639px)');
        const update = () => {
            setIsMobile(media.matches);
        };
        update();
        media.addEventListener('change', update);
        return () => {
            media.removeEventListener('change', update);
        };
    }, []);

    return isMobile;
}

function StepLabel({
    index,
    label,
    inView,
}: {
    index: number;
    label: string;
    inView: boolean;
}) {
    const isMobile = useIsMobile();
    const reduceMotion = useReducedMotion();
    const fromLeft = index % 2 === 0;
    const shouldSlide = isMobile && reduceMotion !== true;
    const startX = fromLeft ? -80 : 80;
    const visible = inView || !shouldSlide;

    return (
        <motion.p
            animate={{
                opacity: visible ? 1 : 0,
                x: visible ? 0 : startX,
            }}
            transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
            }}
            style={isMobile ? { top: ladderOffsetFor(index) } : undefined}
            className={`inline-flex self-start items-center rounded-full bg-[#511076]/15 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-[#511076] ring-1 ring-inset ring-[#511076]/25 max-sm:absolute ${
                fromLeft
                    ? 'max-sm:left-0 max-sm:right-auto'
                    : 'max-sm:left-auto max-sm:right-0'
            }`}>
            {label}
        </motion.p>
    );
}

function StepCard({
    step,
    index,
    total,
}: {
    step: Step;
    index: number;
    total: number;
}) {
    const [entered, setEntered] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const IconComponent = stepIcons[step.icon as keyof typeof stepIcons];

    const setCardNode = (node: HTMLDivElement | null) => {
        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
        }
        if (!node || entered) {
            return;
        }
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry && entry.isIntersecting) {
                    setEntered(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
        );
        observer.observe(node);
        observerRef.current = observer;
    };

    useEffect(() => {
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    return (
        <div ref={setCardNode} className='group relative'>
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                onViewportEnter={() => setEntered(true)}
                transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                }}
                viewport={{ once: true, amount: 0.2 }}
                className='relative h-full overflow-visible rounded-2xl border border-gray-100 bg-white px-5 pb-5 pt-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group-hover:border-purple-200 md:px-6 md:pb-6 md:pt-5'>
                <div
                    className='pointer-events-none absolute inset-0 overflow-hidden rounded-2xl'
                    aria-hidden='true'>
                    <div className='absolute -right-8 -top-8 h-20 w-20 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 opacity-50 transition-opacity duration-300 group-hover:opacity-70' />
                </div>

                <div className='relative z-10 flex flex-col items-center text-center'>
                    <div className='relative w-full max-sm:h-[72px]'>
                        <StepLabel
                            index={index}
                            label={formatStepLabel(index)}
                            inView={entered}
                        />
                    </div>
                    <div className='mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-[#511076] shadow-sm transition-all duration-300 group-hover:bg-purple-100'>
                        {IconComponent ? (
                            <IconComponent
                                className='text-xl'
                                aria-label={step.title}
                            />
                        ) : null}
                    </div>
                    <h3 className='mt-3 text-lg font-semibold leading-snug text-gray-900'>
                        {step.title}
                    </h3>
                    <p className='mt-2 text-sm leading-relaxed text-gray-600'>
                        {step.text}
                    </p>
                </div>
            </motion.div>

            {index < total - 1 ? (
                <div className='absolute top-1/2 -right-3 hidden h-0.5 w-6 -translate-y-1/2 bg-gray-200 lg:block lg:-right-4 lg:w-8'>
                    <motion.div
                        className='h-full w-full origin-left scale-x-0 bg-[#511076]'
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: index * 0.1 + 0.5,
                        }}
                        viewport={{ once: true }}
                    />
                </div>
            ) : null}
        </div>
    );
}

export default function StepFlowSection({ steps }: StepFlowSectionProps) {
    return (
        <section className='overflow-x-hidden bg-white px-4 py-14 md:py-20'>
            <div className='mx-auto max-w-7xl'>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className='mb-10 text-center md:mb-14'>
                    <h2 className='mb-3 text-3xl font-bold text-gray-900 md:mb-4 md:text-4xl'>
                        How It Works
                    </h2>
                    <p className='mx-auto max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg'>
                        Get your home professionally cleaned in {steps.length}{' '}
                        simple steps
                    </p>
                </motion.div>

                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6'>
                    {steps.map((step, index) => (
                        <StepCard
                            key={step.title}
                            step={step}
                            index={index}
                            total={steps.length}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

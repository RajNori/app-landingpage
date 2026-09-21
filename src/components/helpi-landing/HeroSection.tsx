'use client';

import { FaUserCheck, FaCertificate, FaHeadset } from 'react-icons/fa';
import { SECTION_IDS } from '@/utils/constants';
import { scrollToAppDownload, scrollToId } from '@/utils/scroll';
import HelpiVideo from './HelpiVideo';

interface HeroSectionProps {
    title: string;
    subtitle: string;
    primaryCTA: string;
    secondaryCTA: string;
}

export default function HeroSection({
    title,
    subtitle,
    primaryCTA,
    secondaryCTA,
}: HeroSectionProps) {
    const trustItems = [
        { icon: FaUserCheck, label: 'Trained Professional' },
        { icon: FaCertificate, label: 'Verified Expert' },
        { icon: FaHeadset, label: 'Dedicated Support' },
    ];

    return (
        <section className='relative isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-[#160a24] text-white'>
            <div className='absolute inset-0'>
                <HelpiVideo
                    mode='cover'
                    autoPlay
                    showControl={false}
                    label='Helpi cleaners at work'
                />
            </div>
            <div
                aria-hidden='true'
                className='pointer-events-none absolute inset-0 bg-gradient-to-r from-[#120818]/90 via-[#120818]/55 to-[#120818]/20'
            />
            <div
                aria-hidden='true'
                className='pointer-events-none absolute inset-0 bg-gradient-to-t from-[#120818]/80 via-transparent to-[#120818]/25'
            />

            <div className='relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl items-end px-4 pb-28 pt-16 sm:items-center sm:pb-16 lg:pb-20 lg:pt-10'>
                <div className='max-w-xl text-left'>
                    <h1 className='mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-[3.4rem] lg:leading-[1.06]'>
                        {title}
                    </h1>
                    <p className='mb-7 max-w-lg text-lg leading-relaxed text-white/85 md:text-xl'>
                        {subtitle}
                    </p>
                    <div className='mb-6 flex flex-col gap-3 sm:flex-row'>
                        <button
                            type='button'
                            onClick={scrollToAppDownload}
                            className='min-h-11 rounded-full bg-helpi-primary px-7 py-3.5 font-semibold text-white shadow-[0_16px_36px_-12px_rgba(106,26,217,0.9)] transition-colors hover:bg-helpi-secondary focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40'>
                            {primaryCTA}
                        </button>
                        <button
                            type='button'
                            onClick={() => scrollToId(SECTION_IDS.howItWorks)}
                            className='min-h-11 rounded-full border border-white/35 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40'>
                            {secondaryCTA}
                        </button>
                    </div>
                    <ul className='flex flex-row flex-wrap gap-2'>
                        {trustItems.map((item) => (
                            <li
                                key={item.label}
                                className='inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur-sm'>
                                <item.icon className='text-helpi-soft' />
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

export function TrustBand() {
    const items = [
        { icon: FaUserCheck, label: 'Trained Professional' },
        { icon: FaCertificate, label: 'Verified Expert' },
        { icon: FaHeadset, label: 'Dedicated Support' },
    ];

    return (
        <section className='bg-helpi-primary px-4 py-7 text-white'>
            <ul className='mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8'>
                {items.map((item) => (
                    <li
                        key={item.label}
                        className='flex items-center justify-center gap-3 text-center sm:flex-col'>
                        <item.icon className='text-2xl text-helpi-soft' />
                        <span className='text-sm font-semibold tracking-tight'>
                            {item.label}
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    );
}

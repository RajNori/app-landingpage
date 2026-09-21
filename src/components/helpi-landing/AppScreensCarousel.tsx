'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SECTION_IDS } from '@/utils/constants';
import { scrollToAppDownload } from '@/utils/scroll';
import PhoneFrame from './PhoneFrame';

interface PreviewScreen {
    id: string;
    title: string;
    description: string;
    image: string;
}

const PREVIEW_SCREENS: PreviewScreen[] = [
    {
        id: 'home',
        title: 'Home',
        description:
            'See cleaning options for your place, with a clear way to schedule.',
        image: '/images/hero-home.jpg',
    },
    {
        id: 'services',
        title: 'Services',
        description:
            'Browse Home, Office, and Warehouse the way they appear in Helpi.',
        image: '/images/home.jpg',
    },
    {
        id: 'schedule',
        title: 'Schedule',
        description:
            'Choose a date, duration, and time slot, then continue in the app.',
        image: '/images/schedule.jpg',
    },
];

export default function AppScreensCarousel() {
    const [activeId, setActiveId] = useState(PREVIEW_SCREENS[0]?.id ?? 'home');
    const active =
        PREVIEW_SCREENS.find((screen) => screen.id === activeId) ??
        PREVIEW_SCREENS[0];

    if (!active) {
        return null;
    }

    return (
        <section
            id={SECTION_IDS.appPreview}
            className='scroll-mt-20 bg-white px-4 py-12 md:py-16'>
            <div className='mx-auto grid max-w-6xl items-center justify-center gap-8 lg:grid-cols-[auto_minmax(17rem,24rem)] lg:gap-14'>
                    <div className='flex justify-center lg:order-1'>
                        <PhoneFrame className='preview-phone-frame'>
                            <Image
                                src={active.image}
                                alt={active.title}
                                width={472}
                                height={1024}
                                className='h-full w-full object-cover object-top'
                            />
                        </PhoneFrame>
                    </div>

                    <div className='order-first lg:order-2'>
                        <p className='mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-helpi-primary'>
                            The app
                        </p>
                        <h2 className='mb-3 text-balance text-3xl font-bold tracking-tight text-gray-900 md:text-4xl'>
                            The Helpi app
                        </h2>
                        <p className='mb-6 text-base leading-relaxed text-gray-600 md:text-lg'>
                            A straightforward path from choosing a clean to
                            picking a time.
                        </p>
                        <div
                            role='tablist'
                            aria-label='App screens'
                            className='mb-5 flex flex-col gap-2'>
                            {PREVIEW_SCREENS.map((screen) => {
                                const selected = screen.id === active.id;
                                return (
                                    <button
                                        key={screen.id}
                                        type='button'
                                        role='tab'
                                        aria-selected={selected}
                                        id={`preview-tab-${screen.id}`}
                                        aria-controls='preview-panel'
                                        onClick={() => setActiveId(screen.id)}
                                        className={`min-h-11 rounded-2xl px-4 py-3 text-left transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-helpi-soft ${
                                            selected
                                                ? 'bg-helpi-primary text-white shadow-[0_12px_28px_-16px_rgba(106,26,217,0.8)]'
                                                : 'bg-helpi-soft/70 text-gray-800 hover:bg-helpi-soft'
                                        }`}>
                                        <span className='block text-sm font-semibold'>
                                            {screen.title}
                                        </span>
                                        {selected ? (
                                            <span className='mt-1 block text-sm font-normal leading-relaxed text-white/90'>
                                                {screen.description}
                                            </span>
                                        ) : null}
                                    </button>
                                );
                            })}
                        </div>
                        <div
                            id='preview-panel'
                            role='tabpanel'
                            aria-labelledby={`preview-tab-${active.id}`}>
                            <p className='mb-5 text-xs text-gray-500'>
                                Screens shown are from the Helpi app. Pricing
                                and availability are illustrative.
                            </p>
                            <button
                                type='button'
                                onClick={scrollToAppDownload}
                                className='min-h-11 rounded-full bg-helpi-primary px-6 py-3 text-sm font-semibold text-white hover:bg-helpi-secondary focus:outline-none focus-visible:ring-4 focus-visible:ring-helpi-soft'>
                                Get the App
                            </button>
                        </div>
                    </div>
                </div>
        </section>
    );
}

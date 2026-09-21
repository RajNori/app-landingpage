'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SECTION_IDS } from '@/utils/constants';
import { scrollToId, scrollToAppDownload } from '@/utils/scroll';

const NAV_LINKS = [
    { id: SECTION_IDS.services, label: 'Services' },
    { id: SECTION_IDS.howItWorks, label: 'How it works' },
    { id: SECTION_IDS.appPreview, label: 'The app' },
];

export default function LandingHeader() {
    const [open, setOpen] = useState(false);

    const goTo = (id: string) => {
        setOpen(false);
        scrollToId(id);
    };

    return (
        <header className='sticky top-0 z-40 border-b border-white/10 bg-white/90 backdrop-blur-md'>
            <div className='mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6'>
                <Link href='/' className='flex items-center' aria-label='Helpi home'>
                    <Image
                        src='/helpi-logo.png'
                        alt='Helpi'
                        width={160}
                        height={81}
                        className='h-8 w-auto'
                        priority
                    />
                </Link>

                <nav
                    className='hidden items-center gap-1 md:flex'
                    aria-label='Page'>
                    {NAV_LINKS.map((link) => (
                        <button
                            key={link.id}
                            type='button'
                            onClick={() => goTo(link.id)}
                            className='min-h-11 rounded-full px-3.5 text-sm font-medium text-gray-600 transition-colors hover:bg-helpi-soft/70 hover:text-helpi-primary focus:outline-none focus-visible:ring-4 focus-visible:ring-helpi-soft'>
                            {link.label}
                        </button>
                    ))}
                    <button
                        type='button'
                        onClick={scrollToAppDownload}
                        className='ml-2 min-h-11 rounded-full bg-helpi-primary px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(106,26,217,0.8)] transition-colors hover:bg-helpi-secondary focus:outline-none focus-visible:ring-4 focus-visible:ring-helpi-soft'>
                        Get the App
                    </button>
                </nav>

                <button
                    type='button'
                    className='inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-gray-800 md:hidden focus:outline-none focus-visible:ring-4 focus-visible:ring-helpi-soft'
                    aria-expanded={open}
                    aria-controls='mobile-landing-nav'
                    onClick={() => setOpen((current) => !current)}>
                    <span className='sr-only'>
                        {open ? 'Close menu' : 'Open menu'}
                    </span>
                    <span className='text-sm font-semibold'>
                        {open ? 'Close' : 'Menu'}
                    </span>
                </button>
            </div>

            {open ? (
                <nav
                    id='mobile-landing-nav'
                    className='border-t border-gray-100 bg-white px-4 py-3 md:hidden'
                    aria-label='Page'>
                    <div className='flex flex-col gap-1'>
                        {NAV_LINKS.map((link) => (
                            <button
                                key={link.id}
                                type='button'
                                onClick={() => goTo(link.id)}
                                className='min-h-11 rounded-xl px-3 text-left text-sm font-medium text-gray-800 hover:bg-helpi-soft focus:outline-none focus-visible:ring-4 focus-visible:ring-helpi-soft'>
                                {link.label}
                            </button>
                        ))}
                        <button
                            type='button'
                            onClick={() => {
                                setOpen(false);
                                scrollToAppDownload();
                            }}
                            className='mt-2 min-h-11 rounded-xl bg-helpi-primary px-3 text-sm font-semibold text-white hover:bg-helpi-secondary focus:outline-none focus-visible:ring-4 focus-visible:ring-helpi-soft'>
                            Get the App
                        </button>
                    </div>
                </nav>
            ) : null}
        </header>
    );
}

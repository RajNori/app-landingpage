'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { APP_DOWNLOAD_SECTION_ID } from '@/utils/scroll';
import { SUPPORT_EMAIL } from '@/utils/constants';

interface FinalCTAProps {
    title: string;
    subtitle: string;
    primaryCTA: string;
}

export default function FinalCTA({
    title,
    subtitle,
    primaryCTA,
}: FinalCTAProps) {
    const [showSticky, setShowSticky] = useState(true);
    const mailHref = `mailto:${SUPPORT_EMAIL}`;

    useEffect(() => {
        const target = document.getElementById(APP_DOWNLOAD_SECTION_ID);
        if (!target) {
            return;
        }
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry) {
                    setShowSticky(!entry.isIntersecting);
                }
            },
            { threshold: 0.35 }
        );
        observer.observe(target);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id={APP_DOWNLOAD_SECTION_ID}
            className='relative overflow-hidden bg-white px-4 pb-10 pt-6 md:pb-12 md:pt-4'>
            <div className='relative mx-auto grid h-[40rem] max-w-6xl scroll-mt-24 grid-cols-1 grid-rows-2 overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-helpi-primary via-helpi-secondary to-helpi-accent sm:h-[28rem] sm:rounded-[2rem] md:h-[26rem] md:grid-cols-2 md:grid-rows-1'>
                <div className='flex min-h-0 min-w-0 flex-col items-center justify-center px-5 py-5 text-center text-white md:items-start md:px-12 md:text-left'>
                    <h2 className='mb-2 text-balance text-2xl font-bold leading-tight tracking-tight sm:mb-3 sm:text-3xl md:text-4xl'>
                        {title}
                    </h2>
                    <p className='mb-4 max-w-lg text-pretty text-sm leading-relaxed text-white/90 sm:mb-6 sm:text-lg'>
                        {subtitle}
                    </p>
                    <a
                        href={mailHref}
                        className='inline-flex min-h-11 w-fit max-w-full items-center justify-center rounded-full bg-white px-4 py-2.5 text-center text-sm font-semibold text-helpi-primary shadow-md transition-colors hover:bg-helpi-soft focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50 sm:px-6 sm:py-3'>
                        {primaryCTA}
                    </a>
                    <p className='mt-2 text-sm text-white/80 sm:mt-3'>
                        {SUPPORT_EMAIL}
                    </p>
                    <div
                        className='mt-4 flex h-7 flex-row flex-wrap items-center justify-center gap-2 opacity-90 sm:mt-6 sm:h-8 md:justify-start'
                        aria-hidden='true'>
                        <Image
                            src='/badges/app-store-badge.svg'
                            width={90}
                            height={30}
                            alt=''
                            className='h-7 w-auto sm:h-8'
                        />
                        <Image
                            src='/badges/google-play-badge.svg'
                            width={102}
                            height={30}
                            alt=''
                            className='h-7 w-auto sm:h-8'
                        />
                    </div>
                    <p className='mt-2 max-w-sm text-pretty text-xs leading-relaxed text-white/70'>
                        Coming to iOS and Android. Store listings are not linked
                        here yet.
                    </p>
                </div>
                <div className='min-h-0 min-w-0 p-3 sm:p-4'>
                    <div className='relative h-full w-full overflow-hidden rounded-[1.15rem] sm:rounded-[1.35rem]'>
                        <Image
                            src='/images/cta-office.jpg'
                            alt='Helpi cleaner wiping an office desk'
                            fill
                            sizes='(min-width: 768px) 50vw, 100vw'
                            className='object-cover object-center'
                        />
                    </div>
                </div>
            </div>

            {showSticky ? (
                <div className='fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-xl sm:hidden'>
                    <div className='flex items-center justify-between gap-3'>
                        <div>
                            <p className='text-sm font-semibold text-helpi-primary'>
                                Get Helpi
                            </p>
                            <p className='text-xs text-gray-500'>
                                Email us for the app
                            </p>
                        </div>
                        <a
                            href={mailHref}
                            className='inline-flex min-h-11 items-center rounded-xl bg-helpi-primary px-4 text-sm font-semibold text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-helpi-soft'>
                            {primaryCTA}
                        </a>
                    </div>
                </div>
            ) : null}
        </section>
    );
}

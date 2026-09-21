'use client';

import Link from 'next/link';
import Image from 'next/image';
import { HELPI_CONFIG, SUPPORT_EMAIL } from '@/utils/constants';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

const { footer } = HELPI_CONFIG;

export default function Footer() {
    return (
        <footer className='border-t border-gray-100 bg-white px-4'>
            <div className='mx-auto flex max-w-6xl flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between'>
                <div className='flex flex-col items-center gap-1 md:items-start'>
                    <Image
                        src='/helpi-logo.png'
                        alt='Helpi'
                        width={140}
                        height={71}
                        className='h-7 w-auto'
                    />
                    <a
                        href={`mailto:${SUPPORT_EMAIL}`}
                        className='text-sm font-medium text-helpi-primary underline-offset-2 hover:underline focus:outline-none focus-visible:ring-4 focus-visible:ring-helpi-soft'>
                        {SUPPORT_EMAIL}
                    </a>
                </div>

                <nav
                    className='flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-gray-600'
                    aria-label='Legal'>
                    <Link
                        href='/privacy'
                        className='inline-flex min-h-11 items-center hover:text-helpi-primary'>
                        Privacy
                    </Link>
                    <Link
                        href='/terms'
                        className='inline-flex min-h-11 items-center hover:text-helpi-primary'>
                        Terms
                    </Link>
                    <Link
                        href='/cookies'
                        className='inline-flex min-h-11 items-center hover:text-helpi-primary'>
                        Cookies
                    </Link>
                </nav>

                <div className='flex justify-center gap-2'>
                    <a
                        href={footer.social.facebook}
                        aria-label='Follow us on Facebook'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-helpi-primary hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-helpi-soft'>
                        <FaFacebookF className='h-4 w-4' />
                    </a>
                    <a
                        href={footer.social.instagram}
                        aria-label='Follow us on Instagram'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-helpi-primary hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-helpi-soft'>
                        <FaInstagram className='h-4 w-4' />
                    </a>
                    <a
                        href={footer.social.twitter}
                        aria-label='Follow us on Twitter'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-helpi-primary hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-helpi-soft'>
                        <svg
                            className='h-4 w-4'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                            aria-hidden='true'>
                            <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' />
                        </svg>
                    </a>
                </div>
            </div>

            <div className='mx-auto max-w-6xl border-t border-gray-100 py-5 text-center text-xs text-gray-500'>
                © {new Date().getFullYear()} Helpi. All rights reserved.
            </div>
        </footer>
    );
}

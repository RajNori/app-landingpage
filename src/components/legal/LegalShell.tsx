import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SUPPORT_EMAIL } from '@/utils/constants';

export const LEGAL_UPDATED = '25 September 2026';
export const LEGAL_ENTITY = 'Helpi Pty Ltd (ACN 670 371 445)';

const LINKS = [
    { href: '/terms', label: 'Terms' },
    { href: '/privacy', label: 'Privacy' },
    { href: '/cookies', label: 'Cookies' },
    { href: '/support', label: 'Support' },
];

export default function LegalShell({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children: ReactNode;
}) {
    return (
        <div className='min-h-screen bg-white text-gray-900'>
            <header className='border-b border-gray-100 bg-white'>
                <div className='mx-auto flex h-16 max-w-3xl items-center justify-between px-4'>
                    <Link href='/' aria-label='Helpi home'>
                        <Image
                            src='/helpi-logo.png'
                            alt='Helpi'
                            width={140}
                            height={71}
                            className='h-7 w-auto'
                        />
                    </Link>
                    <nav className='flex gap-4 text-sm text-gray-600' aria-label='Legal'>
                        {LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className='hover:text-helpi-primary'>
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </header>
            <main className='mx-auto max-w-3xl px-4 py-12'>
                <p className='mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-helpi-primary'>
                    Helpi Legal Centre
                </p>
                <h1 className='mb-3 text-3xl font-bold tracking-tight md:text-4xl'>
                    {title}
                </h1>
                <p className='mb-2 text-sm text-gray-500'>
                    {LEGAL_ENTITY}. Last updated {LEGAL_UPDATED}.
                </p>
                <p className='mb-10 text-base leading-relaxed text-gray-600'>
                    {description}
                </p>
                <article className='space-y-8 text-[15px] leading-relaxed text-gray-700'>
                    {children}
                </article>
                <p className='mt-12 border-t border-gray-100 pt-6 text-sm text-gray-500'>
                    {LEGAL_ENTITY}, Victoria.{' '}
                    <a
                        href={`mailto:${SUPPORT_EMAIL}`}
                        className='font-medium text-helpi-primary underline-offset-2 hover:underline'>
                        {SUPPORT_EMAIL}
                    </a>
                    . Version 1.0, {LEGAL_UPDATED}.
                </p>
            </main>
        </div>
    );
}

export function LegalSection({
    id,
    title,
    children,
}: {
    id?: string;
    title: string;
    children: ReactNode;
}) {
    return (
        <section id={id} className='scroll-mt-24'>
            <h2 className='mb-3 text-xl font-semibold tracking-tight text-gray-900'>
                {title}
            </h2>
            <div className='space-y-3'>{children}</div>
        </section>
    );
}

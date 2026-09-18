'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { KMS_CONTENT, UserRole } from '@/data/knowledgebase';
import ArticleCard from '@/components/knowledgebase/ArticleCard';
import ArticleDetail from '@/components/knowledgebase/ArticleDetail';
import FilterSheet from '@/components/knowledgebase/FilterSheet';

const fuzzy = (q: string, s: string) =>
    s.toLowerCase().includes(q.toLowerCase());

export default function KnowledgeBasePage() {
    const [role, setRole] = useState<UserRole>('helpers');
    const [query, setQuery] = useState('');
    const [facet, setFacet] = useState<{ [k: string]: string | null }>({
        type: null,
        status: null,
    });
    const [view, setView] = useState<'grid' | 'article'>('grid');
    const [openSlug, setOpenSlug] = useState<string | null>(null);
    const [filtersOpen, setFiltersOpen] = useState(false);

    const filtered = useMemo(() => {
        const base = KMS_CONTENT.articles[role];
        return base.filter((a) => {
            if (
                query &&
                !fuzzy(query, a.title) &&
                !fuzzy(query, a.excerpt ?? '')
            )
                return false;
            if (facet.type && a.type !== facet.type) return false;
            if (facet.status && a.status !== facet.status) return false;
            return true;
        });
    }, [role, query, facet]);

    const openArticle = (slug: string) => {
        setOpenSlug(slug);
        setView('article');
    };

    return (
        <div className='min-h-screen bg-white text-zinc-900'>
            {/* Knowledge Base Header */}
            <header className='sticky top-0 z-30 border-b border-zinc-100 bg-white/80 backdrop-blur'>
                <div className='max-w-6xl mx-auto px-5 py-4 flex items-center gap-4'>
                    {/* Logo */}
                    <div className='flex items-center gap-3 mr-auto'>
                        <Image
                            src='/helpi-icon.png'
                            alt='Helpi'
                            width={32}
                            height={32}
                            className='h-8 w-8 object-contain rounded-lg flex-shrink-0'
                        />
                        <span className='font-semibold tracking-tight'>
                            Helpi Knowledge
                        </span>
                    </div>

                    {/* Search Bar */}
                    <div className='relative flex-1 max-w-md'>
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder='Search help…'
                            className='w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500'
                        />
                        <span className='absolute right-3 top-2.5 text-zinc-400'>
                            🔍
                        </span>
                    </div>

                    {/* Filters Button */}
                    <button
                        onClick={() => setFiltersOpen(true)}
                        className='hidden sm:inline-flex px-3 py-2 rounded-lg border border-zinc-200 hover:bg-zinc-50 text-sm'>
                        Filters
                    </button>
                </div>
            </header>

            {/* Hero: role pills */}
            <section className='border-b border-zinc-100 bg-gradient-to-r from-purple-50 to-white'>
                <div className='max-w-6xl mx-auto px-5 py-6'>
                    {/* Page Title */}
                    <div className='flex items-center gap-3 mb-4'>
                        <div className='h-10 w-10 rounded-lg bg-purple-600 flex items-center justify-center'>
                            <span className='text-white font-bold text-lg'>
                                H
                            </span>
                        </div>
                        <div>
                            <h1 className='text-2xl font-bold text-zinc-900'>
                                Helpi Knowledge Base
                            </h1>
                            <p className='text-sm text-zinc-600'>
                                Find answers and guides for your role
                            </p>
                        </div>
                    </div>

                    {/* Role Pills and Results Count */}
                    <div className='flex flex-wrap items-center gap-2'>
                        {KMS_CONTENT.roles.map((r) => (
                            <button
                                key={r.key}
                                onClick={() => {
                                    setRole(r.key);
                                    setView('grid');
                                }}
                                className={`px-3 py-1.5 rounded-full text-sm transition ${
                                    role === r.key
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-white text-zinc-700 hover:bg-purple-50 border border-zinc-200'
                                }`}>
                                {r.label}
                            </button>
                        ))}

                        <div className='ml-auto text-sm text-zinc-500'>
                            {filtered.length} result
                            {filtered.length === 1 ? '' : 's'}
                        </div>
                    </div>
                </div>
            </section>

            {/* Body */}
            <main className='max-w-6xl mx-auto px-5 py-8'>
                {view === 'grid' ? (
                    <>
                        {/* Minimal categories row */}
                        <div className='flex flex-wrap gap-2 mb-6'>
                            {KMS_CONTENT.categories[role].map((c) => (
                                <span
                                    key={c}
                                    className='px-3 py-1.5 rounded-full bg-zinc-50 text-zinc-700 text-sm border border-zinc-100'>
                                    {c}
                                </span>
                            ))}
                        </div>

                        {/* Article list */}
                        <div className='grid md:grid-cols-2 gap-4'>
                            {filtered.map((a) => (
                                <ArticleCard
                                    key={a.slug}
                                    article={a}
                                    onClick={() => openArticle(a.slug)}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <ArticleDetail
                        role={role}
                        slug={openSlug!}
                        onBack={() => setView('grid')}
                    />
                )}
            </main>

            {/* Filters sheet */}
            <FilterSheet
                isOpen={filtersOpen}
                onClose={() => setFiltersOpen(false)}
                facet={facet}
                onFacetChange={setFacet}
            />

            {/* Footer */}
            <footer className='max-w-6xl mx-auto px-5 py-12 text-sm text-zinc-500'>
                <div className='border-t border-zinc-100 pt-6 flex flex-wrap items-center gap-3'>
                    <span>© Helpi</span>
                    <span className='hidden sm:inline'>•</span>
                    <a href='#' className='hover:underline'>
                        Release notes
                    </a>
                    <span className='hidden sm:inline'>•</span>
                    <a href='#' className='hover:underline'>
                        Contact support
                    </a>
                </div>
            </footer>
        </div>
    );
}

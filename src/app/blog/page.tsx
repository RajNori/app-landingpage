import Link from 'next/link';
import { getPublishedBlogPosts } from '@/lib/blog';

export const metadata = {
    title: 'Blog - Helpi',
    description:
        'Cleaning tips, home maintenance advice, and product updates from Helpi.',
};

export const dynamic = 'force-dynamic';

function formatDate(date: Date | null) {
    if (!date) return null;
    return new Intl.DateTimeFormat('en-AU', {
        dateStyle: 'medium',
    }).format(date);
}

export default async function BlogPage() {
    const posts = await getPublishedBlogPosts();

    return (
        <div className='bg-white min-h-screen'>
            <section className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
                <div className='mb-8 sm:mb-12'>
                    <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-3'>
                        Helpi Blog
                    </h1>
                    <p className='text-gray-600 text-base sm:text-lg'>
                        Practical cleaning advice, home care guides, and Helpi
                        updates.
                    </p>
                </div>

                {posts.length === 0 ? (
                    <div className='rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center text-gray-600'>
                        No published posts yet. Check back soon.
                    </div>
                ) : (
                    <div className='grid gap-5 sm:gap-6'>
                        {posts.map((post) => (
                            <article
                                key={post.id}
                                className='rounded-2xl border border-gray-200 p-5 sm:p-6 hover:border-purple-300 transition-colors duration-200'>
                                <div className='flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-3'>
                                    <span>{post.authorName}</span>
                                    {formatDate(post.publishedAt) && (
                                        <>
                                            <span>•</span>
                                            <span>
                                                {formatDate(post.publishedAt)}
                                            </span>
                                        </>
                                    )}
                                </div>
                                <h2 className='text-xl sm:text-2xl font-semibold text-gray-900 mb-2'>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className='hover:text-[#511076] transition-colors duration-200'>
                                        {post.title}
                                    </Link>
                                </h2>
                                {post.excerpt && (
                                    <p className='text-gray-600 mb-4'>
                                        {post.excerpt}
                                    </p>
                                )}
                                <div className='flex flex-wrap gap-2'>
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className='text-xs font-medium px-2.5 py-1 rounded-full bg-purple-100 text-purple-700'>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

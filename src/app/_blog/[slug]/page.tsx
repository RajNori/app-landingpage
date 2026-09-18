import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPublishedBlogPostBySlug } from '@/lib/blog';

type BlogPostPageProps = {
    params: Promise<{ slug: string }>;
};

export const dynamic = 'force-dynamic';

function formatDate(date: Date | null) {
    if (!date) return null;
    return new Intl.DateTimeFormat('en-AU', {
        dateStyle: 'medium',
    }).format(date);
}

export async function generateMetadata({
    params,
}: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPublishedBlogPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post not found - Helpi',
        };
    }

    return {
        title: `${post.title} - Helpi Blog`,
        description:
            post.excerpt || `Read ${post.title} on the Helpi blog.`,
        openGraph: {
            title: post.title,
            description: post.excerpt || undefined,
            type: 'article',
            images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = await getPublishedBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className='bg-white min-h-screen'>
            <article className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
                <Link
                    href='/blog'
                    className='inline-flex items-center text-sm text-[#511076] hover:text-[#6b2a8f] mb-8'>
                    ← Back to blog
                </Link>

                <header className='mb-8'>
                    <div className='flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-3'>
                        <span>{post.authorName}</span>
                        {formatDate(post.publishedAt) && (
                            <>
                                <span>•</span>
                                <span>{formatDate(post.publishedAt)}</span>
                            </>
                        )}
                    </div>
                    <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
                        {post.title}
                    </h1>
                    {post.excerpt && (
                        <p className='text-lg text-gray-600'>{post.excerpt}</p>
                    )}
                </header>

                <div className='prose prose-gray max-w-none'>
                    {post.contentHtml ? (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: post.contentHtml,
                            }}
                        />
                    ) : (
                        <div className='whitespace-pre-wrap text-gray-700 leading-relaxed'>
                            {post.contentMarkdown ||
                                'This post does not have content yet.'}
                        </div>
                    )}
                </div>

                {post.tags.length > 0 && (
                    <footer className='mt-10 pt-6 border-t border-gray-100 flex flex-wrap gap-2'>
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className='text-xs font-medium px-2.5 py-1 rounded-full bg-purple-100 text-purple-700'>
                                {tag}
                            </span>
                        ))}
                    </footer>
                )}
            </article>
        </div>
    );
}

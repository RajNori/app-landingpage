import { BlogPostStatus } from '@prisma/client';
import { prisma } from '@/lib/db';

export interface PublishedBlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    coverImageUrl: string | null;
    authorName: string;
    tags: string[];
    publishedAt: Date | null;
    updatedAt: Date;
}

export interface PublishedBlogPostDetail extends PublishedBlogPost {
    contentHtml: string | null;
    contentMarkdown: string | null;
}

const DUMMY_BLOG_POST: PublishedBlogPostDetail = {
    id: 'demo-helpi-seo-post',
    title: 'How to Prepare Your Home Before a Professional Cleaner Arrives',
    slug: 'prepare-home-before-professional-cleaner',
    excerpt:
        'A simple 15-minute checklist to help your cleaner focus on deep cleaning, not tidying.',
    coverImageUrl: null,
    authorName: 'Helpi Team',
    tags: ['Cleaning Tips', 'Home Care', 'Checklist'],
    publishedAt: new Date('2026-03-21T09:00:00.000Z'),
    updatedAt: new Date('2026-03-21T09:00:00.000Z'),
    contentHtml: `
        <p>Booking a professional clean is the easiest way to reset your home, especially before guests or after a busy week. A little prep helps your cleaner spend more time on what matters most.</p>
        <h2>1. Clear key surfaces</h2>
        <p>Move small personal items from kitchen benches, bathroom vanities, and bedside tables. This gives your cleaner direct access to wipe and sanitize thoroughly.</p>
        <h2>2. Secure valuables and fragile items</h2>
        <p>Place jewellery, important documents, and delicate decor in a safe spot so everyone feels comfortable during the service.</p>
        <h2>3. Share priority zones</h2>
        <p>Tell your cleaner where to focus first. Common priorities include bathrooms, kitchens, and high-traffic living areas.</p>
        <h2>4. Keep pets comfortable</h2>
        <p>If you have pets, set up a quiet room or outdoor area to reduce stress and avoid interruptions while cleaning is underway.</p>
        <h2>5. Leave clear access instructions</h2>
        <p>Provide parking notes, gate codes, or buzzer details in advance. Good access saves time and starts the appointment smoothly.</p>
        <p>At Helpi, we designed the experience to be fast, reliable, and mobile-first. With a quick pre-clean setup, your cleaner can deliver better results in less time.</p>
    `,
    contentMarkdown: null,
};

export async function getPublishedBlogPosts(): Promise<PublishedBlogPost[]> {
    const posts = await prisma.blogPost.findMany({
        where: { status: BlogPostStatus.PUBLISHED },
        orderBy: { publishedAt: 'desc' },
        select: {
            id: true,
            title: true,
            slug: true,
            excerpt: true,
            coverImageUrl: true,
            authorName: true,
            tags: true,
            publishedAt: true,
            updatedAt: true,
        },
    });

    return posts.length > 0 ? posts : [DUMMY_BLOG_POST];
}

export async function getPublishedBlogPostBySlug(
    slug: string
): Promise<PublishedBlogPostDetail | null> {
    const post = await prisma.blogPost.findFirst({
        where: { slug, status: BlogPostStatus.PUBLISHED },
    });

    if (post) return post;
    if (slug === DUMMY_BLOG_POST.slug) return DUMMY_BLOG_POST;
    return null;
}

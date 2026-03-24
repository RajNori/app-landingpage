import { BlogPostStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { createSlug, verifySyncSignature } from '@/lib/blog-sync';

type SyncPayload = {
    externalId: string;
    source?: string;
    title: string;
    slug?: string;
    excerpt?: string | null;
    contentHtml?: string | null;
    contentMarkdown?: string | null;
    coverImageUrl?: string | null;
    authorName?: string | null;
    tags?: string[];
    status?: 'draft' | 'published' | 'archived';
    publishedAt?: string | null;
    checksum?: string | null;
    syncVersion?: number;
};

function mapStatus(status?: SyncPayload['status']): BlogPostStatus {
    switch (status) {
        case 'published':
            return BlogPostStatus.PUBLISHED;
        case 'archived':
            return BlogPostStatus.ARCHIVED;
        default:
            return BlogPostStatus.DRAFT;
    }
}

export async function POST(request: NextRequest) {
    try {
        const secret = process.env.BLOG_SYNC_SECRET;
        if (!secret) {
            return NextResponse.json(
                { error: 'Server misconfigured: BLOG_SYNC_SECRET missing' },
                { status: 500 }
            );
        }

        const rawBody = await request.text();
        const signatureResult = verifySyncSignature({
            timestamp: request.headers.get('x-helpi-timestamp'),
            signature: request.headers.get('x-helpi-signature'),
            rawBody,
            secret,
        });

        if (!signatureResult.ok) {
            return NextResponse.json(
                { error: signatureResult.error },
                { status: 401 }
            );
        }

        let payload: SyncPayload;
        try {
            payload = JSON.parse(rawBody) as SyncPayload;
        } catch {
            return NextResponse.json(
                { error: 'Invalid JSON payload' },
                { status: 400 }
            );
        }

        if (!payload.externalId || !payload.title) {
            return NextResponse.json(
                { error: 'externalId and title are required' },
                { status: 400 }
            );
        }

        const slug = createSlug(payload.slug || payload.title);
        if (!slug) {
            return NextResponse.json(
                { error: 'Could not generate a valid slug' },
                { status: 400 }
            );
        }

        const existingBySlug = await prisma.blogPost.findUnique({
            where: { slug },
            select: { externalId: true },
        });

        if (
            existingBySlug &&
            existingBySlug.externalId !== payload.externalId
        ) {
            return NextResponse.json(
                { error: 'Slug already belongs to another post' },
                { status: 409 }
            );
        }

        const status = mapStatus(payload.status);
        const parsedPublishedAt = payload.publishedAt
            ? new Date(payload.publishedAt)
            : null;
        if (parsedPublishedAt && Number.isNaN(parsedPublishedAt.getTime())) {
            return NextResponse.json(
                { error: 'Invalid publishedAt value' },
                { status: 400 }
            );
        }

        const upsertedPost = await prisma.blogPost.upsert({
            where: { externalId: payload.externalId },
            create: {
                externalId: payload.externalId,
                source: payload.source || 'third-party',
                title: payload.title,
                slug,
                excerpt: payload.excerpt ?? null,
                contentHtml: payload.contentHtml ?? null,
                contentMarkdown: payload.contentMarkdown ?? null,
                coverImageUrl: payload.coverImageUrl ?? null,
                authorName: payload.authorName || 'Helpi Team',
                tags: payload.tags ?? [],
                status,
                publishedAt:
                    status === BlogPostStatus.PUBLISHED
                        ? parsedPublishedAt ?? new Date()
                        : null,
                checksum: payload.checksum ?? null,
                syncVersion: payload.syncVersion ?? 1,
                lastSyncedAt: new Date(),
            },
            update: {
                source: payload.source || 'third-party',
                title: payload.title,
                slug,
                excerpt: payload.excerpt ?? null,
                contentHtml: payload.contentHtml ?? null,
                contentMarkdown: payload.contentMarkdown ?? null,
                coverImageUrl: payload.coverImageUrl ?? null,
                authorName: payload.authorName || 'Helpi Team',
                tags: payload.tags ?? [],
                status,
                publishedAt:
                    status === BlogPostStatus.PUBLISHED
                        ? parsedPublishedAt ?? new Date()
                        : null,
                checksum: payload.checksum ?? null,
                syncVersion: payload.syncVersion ?? 1,
                lastSyncedAt: new Date(),
            },
            select: {
                id: true,
                externalId: true,
                slug: true,
                status: true,
                updatedAt: true,
            },
        });

        revalidatePath('/blog');
        revalidatePath(`/blog/${upsertedPost.slug}`);

        return NextResponse.json({
            ok: true,
            post: upsertedPost,
        });
    } catch (error) {
        console.error('Blog sync error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

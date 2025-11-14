'use client';

import {
    KMS_CONTENT,
    ARTICLE_DETAILS,
    UserRole,
    StructuredContentSegment,
} from '@/data/knowledgebase';

// Icon mapping for modules and common terms
const MODULE_ICONS: Record<string, string> = {
    Dashboard: '📊',
    Users: '👥',
    Services: '🔧',
    Documents: '📄',
    Helpers: '🛠️',
    Clients: '💼',
    Jobs: '📋',
    Payments: '💳',
    Invoices: '🧾',
    'Payment Methods': '💵',
    Tickets: '🎫',
    Reports: '📈',
    Settings: '⚙️',
    Logout: '🚪',
};

const ACTION_ICONS: Record<string, string> = {
    Add: '➕',
    Edit: '✏️',
    Delete: '🗑️',
    View: '👁️',
    Search: '🔍',
    Approve: '✅',
    Reject: '❌',
    Verify: '✓',
    Update: '🔄',
    Create: '✨',
    Assign: '📤',
    Monitor: '👀',
    Close: '🔒',
};

interface ArticleDetailProps {
    role: UserRole;
    slug: string;
    onBack: () => void;
}

export default function ArticleDetail({
    role,
    slug,
    onBack,
}: ArticleDetailProps) {
    const article = KMS_CONTENT.articles[role].find((x) => x.slug === slug);

    if (!article) return null;

    // Try both key formats: with and without role prefix
    const detail = ARTICLE_DETAILS[`${role}-${slug}`] || ARTICLE_DETAILS[slug];
    const toc = detail?.toc || [];
    const content = detail?.content || [];
    const callouts = detail?.callouts || [];
    const troubleshooting = detail?.troubleshooting || [];

    // Show placeholder if no detailed content exists
    if (!detail || content.length === 0) {
        return (
            <article>
                <div className='max-w-6xl mx-auto px-5 py-8'>
                    <button
                        onClick={onBack}
                        className='text-sm text-zinc-500 hover:text-zinc-700 mb-4'>
                        ← Back to results
                    </button>
                    <div className='bg-white rounded-2xl border border-zinc-100 p-8 text-center'>
                        <h1 className='text-2xl font-bold text-zinc-900 mb-2'>
                            {article.title}
                        </h1>
                        <p className='text-zinc-600 mb-4'>{article.excerpt}</p>
                        <p className='text-sm text-zinc-500'>
                            Detailed content coming soon...
                        </p>
                    </div>
                </div>
            </article>
        );
    }

    return (
        <article>
            {/* Breadcrumbs */}
            <div className='max-w-6xl mx-auto px-5'>
                <button
                    onClick={onBack}
                    className='text-sm text-zinc-500 hover:text-zinc-700'>
                    ← Back to results
                </button>
            </div>

            {/* Hero header */}
            <div className='mt-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white'>
                <div className='max-w-6xl mx-auto px-5 py-8'>
                    <div className='flex items-start gap-3'>
                        <div className='h-10 w-10 rounded-lg bg-white/15 flex items-center justify-center text-lg'>
                            📘
                        </div>
                        <div>
                            <div className='flex flex-wrap items-center gap-2 text-xs opacity-90'>
                                <span className='px-2 py-0.5 rounded-full bg-white/15 border border-white/20'>
                                    {article.type}
                                </span>
                                <span className='px-2 py-0.5 rounded-full bg-white/15 border border-white/20'>
                                    {article.status}
                                </span>
                                <span className='opacity-90'>
                                    Updated {article.updated}
                                </span>
                            </div>
                            <h1 className='text-2xl md:text-3xl font-semibold tracking-tight mt-2'>
                                {article.title}
                            </h1>
                            <p className='text-white/90 mt-2 text-sm max-w-2xl'>
                                {article.excerpt}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Body grid */}
            <div className='max-w-6xl mx-auto px-5 py-8 grid grid-cols-12 gap-8'>
                {/* Content */}
                <div className='col-span-12 md:col-span-9 space-y-6'>
                    {/* Meta strip */}
                    <div className='rounded-xl border border-zinc-100 bg-white p-4 mb-2'>
                        <dl className='grid grid-cols-2 md:grid-cols-4 gap-y-2 text-sm'>
                            <div>
                                <dt className='text-zinc-500'>Role</dt>
                                <dd className='font-medium capitalize'>
                                    {role}
                                </dd>
                            </div>
                            <div>
                                <dt className='text-zinc-500'>Article</dt>
                                <dd className='font-medium'>{article.type}</dd>
                            </div>
                            <div>
                                <dt className='text-zinc-500'>Status</dt>
                                <dd className='font-medium'>
                                    {article.status}
                                </dd>
                            </div>
                            <div>
                                <dt className='text-zinc-500'>Last updated</dt>
                                <dd className='font-medium'>
                                    {article.updated} ago
                                </dd>
                            </div>
                        </dl>
                    </div>

                    {/* Steps timeline */}
                    <div className='space-y-0'>
                        {content.map((section, index) => (
                            <section
                                key={section.id}
                                id={section.id}
                                className='scroll-mt-24'>
                                <StepCard
                                    index={index}
                                    title={section.title}
                                    content={section.content}
                                />
                            </section>
                        ))}
                    </div>

                    {/* Callouts */}
                    {callouts.length > 0 && (
                        <div className='grid md:grid-cols-2 gap-4 mb-8'>
                            {callouts.map((callout, index) => (
                                <Callout
                                    key={index}
                                    tone={callout.tone}
                                    title={callout.title}>
                                    {callout.content}
                                </Callout>
                            ))}
                        </div>
                    )}

                    {/* Troubleshooting */}
                    {troubleshooting.length > 0 && (
                        <section id='troubleshoot' className='mb-10'>
                            <div className='rounded-2xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50/50 p-6 shadow-md relative overflow-hidden'>
                                {/* Decorative accent */}
                                <div className='absolute top-0 left-0 w-32 h-32 bg-orange-100/30 rounded-br-full -ml-16 -mt-16' />
                                <div className='relative'>
                                    <div className='flex items-center gap-3 mb-4'>
                                        <span className='text-2xl'>🔧</span>
                                        <h2 className='text-xl font-bold tracking-tight text-orange-900'>
                                            Troubleshooting
                                        </h2>
                                    </div>
                                    <div className='relative'>
                                        {/* Vertical line positioned to the left with padding */}
                                        <div className='absolute left-0 top-0 bottom-0 w-0.5 bg-orange-300' />
                                        <ul className='space-y-3 relative pl-5'>
                                            {troubleshooting.map(
                                                (item, index) => (
                                                    <li
                                                        key={index}
                                                        className='flex items-start gap-3 text-sm text-orange-900 leading-relaxed'>
                                                        {/* Bullet dot with padding from line */}
                                                        <div className='flex-shrink-0 w-2 h-2 rounded-full bg-orange-500 mt-[6px]' />
                                                        <span className='flex-1'>
                                                            {item}
                                                        </span>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Bottom nav */}
                    <div className='flex items-center gap-3 border-t border-zinc-100 pt-6'>
                        <button
                            onClick={onBack}
                            className='px-4 py-2 rounded-lg border border-zinc-200 hover:bg-zinc-50 text-sm'>
                            ← All articles
                        </button>
                        <a
                            href='#'
                            className='ml-auto text-sm text-purple-700 hover:underline'>
                            Suggest an edit
                        </a>
                    </div>
                </div>

                {/* Sidebar TOC */}
                <aside className='col-span-12 md:col-span-3'>
                    <div className='md:sticky md:top-24 space-y-4'>
                        <div className='rounded-xl border border-zinc-100 bg-white p-4'>
                            <div className='text-xs uppercase text-zinc-500 mb-2'>
                                On this page
                            </div>
                            <nav className='space-y-1'>
                                {toc.map((t) => (
                                    <a
                                        key={t.id}
                                        href={`#${t.id}`}
                                        className='block text-sm text-zinc-700 hover:text-purple-700'>
                                        {t.label}
                                    </a>
                                ))}
                            </nav>
                        </div>
                        <div className='rounded-xl border border-zinc-100 bg-white p-4'>
                            <div className='text-xs uppercase text-zinc-500 mb-2'>
                                Related
                            </div>
                            <ul className='space-y-2 text-sm'>
                                {KMS_CONTENT.articles[role]
                                    .filter((x) => x.slug !== article.slug)
                                    .slice(0, 3)
                                    .map((x) => (
                                        <li key={x.slug}>
                                            <a
                                                className='block text-zinc-700 hover:text-purple-700'
                                                href='#'>
                                                {x.title}
                                            </a>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Feedback bar */}
            <div className='border-t border-zinc-100 bg-zinc-50'>
                <div className='max-w-6xl mx-auto px-5 py-5 flex flex-wrap items-center gap-2'>
                    <span className='text-sm text-zinc-700'>
                        Was this helpful?
                    </span>
                    <button className='px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-sm'>
                        👍 Yes
                    </button>
                    <button className='px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-sm'>
                        👎 No
                    </button>
                    <a
                        className='ml-auto text-sm text-purple-700 hover:underline'
                        href='#'>
                        Report an issue
                    </a>
                </div>
            </div>
        </article>
    );
}

function StepCard({
    index,
    title,
    content,
}: {
    index: number;
    title: string;
    content: string | StructuredContentSegment | React.ReactNode;
}) {
    // Handle structured content first
    if (typeof content === 'object' && content !== null && 'type' in content) {
        const structured = content as StructuredContentSegment;
        if (structured.type === 'columns') {
            return (
                <article className='relative bg-white rounded-xl border overflow-hidden mb-8 transition-all hover:shadow-lg border-zinc-200 shadow-sm'>
                    <div className='absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-purple-500 via-purple-400 to-purple-600' />
                    <div className='p-6 pl-8'>
                        <div className='flex items-start gap-4 mb-5'>
                            <div className='relative flex-shrink-0'>
                                <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center text-base font-bold shadow-lg'>
                                    {index + 1}
                                </div>
                                <div className='absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white border-2 border-purple-500 flex items-center justify-center'>
                                    <span className='text-[10px] font-bold text-purple-600'>
                                        {index + 1}
                                    </span>
                                </div>
                            </div>
                            <div className='flex-1'>
                                <h2 className='text-xl font-bold tracking-tight text-zinc-900 pt-1.5'>
                                    {title}
                                </h2>
                            </div>
                        </div>
                        <div className='ml-16 space-y-5'>
                            {structured.intro && (
                                <p className='text-base text-zinc-700 leading-relaxed mb-1'>
                                    {structured.intro}
                                </p>
                            )}
                            <div className='space-y-3'>
                                <p className='text-base text-zinc-900 font-semibold leading-relaxed'>
                                    {structured.label}:
                                </p>
                                <div className='relative'>
                                    <div className='absolute left-0 top-0 bottom-0 w-0.5 bg-purple-200' />
                                    <ul className='space-y-3 relative pl-5'>
                                        {structured.items.map((item, idx) => (
                                            <li
                                                key={idx}
                                                className='flex items-start gap-4'>
                                                <div className='flex-shrink-0 w-2 h-2 rounded-full bg-purple-500 mt-[6px]' />
                                                <span className='text-base text-zinc-700 leading-relaxed flex-1 pt-0.5'>
                                                    <span className='font-semibold text-zinc-900'>
                                                        {item.category}
                                                    </span>
                                                    {' — '}
                                                    <span>
                                                        {item.description}
                                                    </span>
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            {structured.closing && (
                                <p className='text-base text-zinc-700 leading-relaxed mt-2 pt-2 border-t border-zinc-100'>
                                    {structured.closing}
                                </p>
                            )}
                        </div>
                    </div>
                </article>
            );
        }
    }

    // Convert to string for legacy string-based parsing
    const contentString =
        typeof content === 'string' ? content : String(content);

    // Detect if this is a module section (Dashboard, Users, Services, etc.)
    const isModuleSection = Object.keys(MODULE_ICONS).some(
        (key) => title.includes(key) || title === key
    );
    const moduleIcon = Object.keys(MODULE_ICONS).find(
        (key) => title.includes(key) || title === key
    );

    // Parse content to format lists and improve readability
    const formatContent = (content: string) => {
        // First, check if content contains special patterns that need visual treatment
        // We'll process the content in segments, detecting and formatting embedded patterns

        // Define pattern labels to search for (order matters - more specific first)
        const patternLabels = [
            {
                type: 'columns' as const,
                regex: /(Key columns|Columns|Fields)(\s+include)?:\s*/gi,
                label: (m: RegExpMatchArray) => m[1],
            },
            {
                type: 'actions' as const,
                regex: /(Admin actions|Admin tasks|Key admin tasks):\s*/gi,
                label: (m: RegExpMatchArray) => m[1],
            },
            {
                type: 'youcan' as const,
                regex: /You can:\s*/gi,
                label: () => 'You can',
            },
            { type: 'tabs' as const, regex: /Tabs:\s*/gi, label: () => 'Tabs' },
        ];

        // Find all pattern label positions
        interface PatternMatch {
            type: 'columns' | 'actions' | 'youcan' | 'tabs';
            labelStart: number;
            contentStart: number;
            label: string;
        }

        const patternMatches: PatternMatch[] = [];

        // Find all pattern labels in the content
        patternLabels.forEach((pattern) => {
            const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
            let match;
            while ((match = regex.exec(content)) !== null) {
                patternMatches.push({
                    type: pattern.type,
                    labelStart: match.index,
                    contentStart: match.index + match[0].length, // Start after the label and colon
                    label: pattern.label(match),
                });
            }
        });

        // Sort by position
        patternMatches.sort((a, b) => a.labelStart - b.labelStart);

        // If we found patterns, process them
        if (patternMatches.length > 0) {
            const segments: Array<{
                type: 'text' | 'columns' | 'actions' | 'youcan' | 'tabs';
                content: string;
                label?: string;
            }> = [];
            let lastIndex = 0;

            // For each pattern, extract content until the next pattern or end of string
            patternMatches.forEach((patternMatch, idx) => {
                // Add text segment before this pattern
                if (patternMatch.labelStart > lastIndex) {
                    const textSegment = content
                        .substring(lastIndex, patternMatch.labelStart)
                        .trim();
                    if (textSegment) {
                        segments.push({ type: 'text', content: textSegment });
                    }
                }

                // Find where this pattern's content ends (start of next pattern or end of content)
                const nextPatternStart =
                    idx < patternMatches.length - 1
                        ? patternMatches[idx + 1].labelStart
                        : content.length;

                // Extract content between this pattern's content start and next pattern
                let patternContent = content
                    .substring(patternMatch.contentStart, nextPatternStart)
                    .trim();

                // Clean up: remove trailing period if it's followed by a space and the next pattern starts with a capital
                // This handles cases like "...columns. Admin actions:" where the period belongs to the columns content
                if (patternContent.endsWith('.')) {
                    const afterPeriod = content
                        .substring(
                            patternMatch.contentStart + patternContent.length,
                            nextPatternStart
                        )
                        .trim();
                    // If there's a space and then a capital letter (likely start of next pattern), keep the period
                    // Otherwise, it might be part of the content
                    if (afterPeriod && /^\s+[A-Z]/.test(afterPeriod)) {
                        // Period is likely a sentence end, keep it
                    } else {
                        // Remove trailing period if it seems to be just punctuation
                        patternContent = patternContent
                            .replace(/\.\s*$/, '')
                            .trim();
                    }
                }

                // Add the pattern segment
                segments.push({
                    type: patternMatch.type,
                    content: patternContent,
                    label: patternMatch.label,
                });

                lastIndex = nextPatternStart;
            });

            // Add remaining text after last pattern
            if (lastIndex < content.length) {
                const textSegment = content.substring(lastIndex).trim();
                if (textSegment) {
                    segments.push({ type: 'text', content: textSegment });
                }
            }

            // Render segments
            return (
                <div className='space-y-6'>
                    {segments.map((segment, idx) => {
                        if (segment.type === 'columns') {
                            // Parse items with descriptions in parentheses or after colons
                            // Split by comma, but be smart about it - look for comma followed by capital letter
                            // This handles cases like "Email (login), Mobile (verified), Role (Admin, Helper, or Client)"
                            const items: string[] = [];
                            let currentItem = '';
                            let inParens = 0;
                            let inQuotes = false;

                            for (let i = 0; i < segment.content.length; i++) {
                                const char = segment.content[i];

                                // Track parentheses for nested content
                                if (char === '(') inParens++;
                                else if (char === ')') inParens--;

                                // Track quotes (though less common in this context)
                                if (char === '"' || char === "'")
                                    inQuotes = !inQuotes;

                                // Check for comma that might be a separator
                                if (
                                    char === ',' &&
                                    inParens === 0 &&
                                    !inQuotes &&
                                    i + 1 < segment.content.length
                                ) {
                                    // Look ahead to find the next non-whitespace character
                                    const remaining = segment.content.substring(
                                        i + 1
                                    );
                                    const nextNonSpaceMatch =
                                        remaining.match(/^\s*([^\s,])/);

                                    if (nextNonSpaceMatch) {
                                        const nextChar = nextNonSpaceMatch[1];
                                        // Split if next char is uppercase (likely start of new item)
                                        // OR if we've accumulated a substantial item (more than 3 chars)
                                        if (
                                            nextChar ===
                                                nextChar.toUpperCase() &&
                                            currentItem.trim().length > 0
                                        ) {
                                            items.push(currentItem.trim());
                                            currentItem = '';
                                            // Skip the comma and any following whitespace
                                            i +=
                                                nextNonSpaceMatch[0].length - 1; // -1 because loop will increment
                                            continue;
                                        }
                                    }
                                }
                                currentItem += char;
                            }

                            // Add the last item
                            if (currentItem.trim()) {
                                items.push(currentItem.trim());
                            }

                            // Fallback to simple split if parsing failed or only got one item
                            const finalItems =
                                items.length > 1
                                    ? items
                                    : segment.content
                                          .split(',')
                                          .map((item) => item.trim())
                                          .filter(Boolean);

                            const parsedItems = finalItems.map((item) => {
                                // Match "Item (description)" or "Item: description"
                                const parenMatch = item.match(
                                    /^(.+?)\s*\(([^)]+)\)\s*\.?$/
                                );
                                const colonMatch = item.match(
                                    /^(.+?):\s*(.+?)\s*\.?$/
                                );

                                if (parenMatch) {
                                    return {
                                        name: parenMatch[1].trim(),
                                        desc: parenMatch[2].trim(),
                                    };
                                } else if (colonMatch) {
                                    return {
                                        name: colonMatch[1].trim(),
                                        desc: colonMatch[2].trim(),
                                    };
                                } else {
                                    return {
                                        name: item.replace(/\.$/, '').trim(),
                                        desc: null,
                                    };
                                }
                            });

                            return (
                                <div key={idx} className='space-y-3'>
                                    <p className='text-base text-zinc-900 font-semibold leading-relaxed'>
                                        {segment.label}:
                                    </p>
                                    <div className='grid md:grid-cols-2 gap-3'>
                                        {parsedItems.map((item, itemIdx) => (
                                            <div
                                                key={itemIdx}
                                                className='bg-gradient-to-br from-purple-50 to-indigo-50/50 rounded-lg p-4 border border-purple-200 hover:border-purple-300 hover:shadow-md transition-all'>
                                                <div className='font-semibold text-zinc-900 text-sm mb-1.5'>
                                                    {item.name}
                                                </div>
                                                {item.desc && (
                                                    <div className='text-xs text-zinc-600 leading-relaxed'>
                                                        {item.desc}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        }

                        if (segment.type === 'actions') {
                            // Parse action items - split on comma followed by capital letter
                            // This handles: "Search users, View and edit, Deactivate accounts"
                            const items = segment.content
                                .split(/,\s*(?=[A-Z][a-z])/) // Match comma-space followed by capital+lowercase (word start)
                                .map((item) => item.trim())
                                .filter(Boolean);

                            return (
                                <div key={idx} className='space-y-3'>
                                    <p className='text-base text-zinc-900 font-semibold leading-relaxed'>
                                        {segment.label}:
                                    </p>
                                    <div className='relative'>
                                        {/* Vertical line positioned to the left with padding */}
                                        <div className='absolute left-0 top-0 bottom-0 w-0.5 bg-purple-200' />
                                        <div className='space-y-3 relative pl-5'>
                                            {items.map((item, itemIdx) => {
                                                const actionMatch = Object.keys(
                                                    ACTION_ICONS
                                                ).find((action) =>
                                                    item
                                                        .toLowerCase()
                                                        .startsWith(
                                                            action.toLowerCase() +
                                                                ' '
                                                        )
                                                );
                                                return (
                                                    <div
                                                        key={itemIdx}
                                                        className='flex items-start gap-3 bg-purple-50/50 rounded-lg p-3 border border-purple-100 hover:bg-purple-50 hover:border-purple-200 transition-colors'>
                                                        {actionMatch && (
                                                            <span className='text-lg flex-shrink-0 mt-0.5'>
                                                                {
                                                                    ACTION_ICONS[
                                                                        actionMatch
                                                                    ]
                                                                }
                                                            </span>
                                                        )}
                                                        <span className='text-sm text-zinc-700 leading-relaxed flex-1 font-medium'>
                                                            {item}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        if (segment.type === 'youcan') {
                            // Parse "You can:" items with em-dashes (e.g., "Add New Services — define...")
                            // Split on em-dash (—) or en-dash (–) followed by capital letter
                            const items = segment.content
                                .split(/\s*[—–]\s*(?=[A-Z][a-z])/) // Match em-dash or en-dash followed by capital+lowercase
                                .map((item) => item.trim())
                                .filter(Boolean);

                            return (
                                <div key={idx} className='space-y-3'>
                                    <p className='text-base text-zinc-900 font-semibold leading-relaxed'>
                                        {segment.label}:
                                    </p>
                                    <div className='relative'>
                                        {/* Vertical line positioned to the left with padding */}
                                        <div className='absolute left-0 top-0 bottom-0 w-0.5 bg-purple-200' />
                                        <div className='space-y-4 relative pl-5'>
                                            {items.map((item, itemIdx) => {
                                                // Split by dash if item has "Action — description" format
                                                const dashMatch =
                                                    item.match(
                                                        /^(.+?)\s*—\s*(.+)$/
                                                    );
                                                const actionMatch = dashMatch
                                                    ? Object.keys(
                                                          ACTION_ICONS
                                                      ).find((action) =>
                                                          dashMatch[1]
                                                              .toLowerCase()
                                                              .startsWith(
                                                                  action.toLowerCase() +
                                                                      ' '
                                                              )
                                                      )
                                                    : Object.keys(
                                                          ACTION_ICONS
                                                      ).find((action) =>
                                                          item
                                                              .toLowerCase()
                                                              .startsWith(
                                                                  action.toLowerCase() +
                                                                      ' '
                                                              )
                                                      );

                                                return (
                                                    <div
                                                        key={itemIdx}
                                                        className='flex items-start gap-3 bg-gradient-to-r from-purple-50/80 to-transparent rounded-lg p-4 border border-purple-100 hover:border-purple-200 hover:shadow-sm transition-all'>
                                                        {actionMatch && (
                                                            <span className='text-xl flex-shrink-0 mt-0.5'>
                                                                {
                                                                    ACTION_ICONS[
                                                                        actionMatch
                                                                    ]
                                                                }
                                                            </span>
                                                        )}
                                                        <div className='flex-1'>
                                                            {dashMatch ? (
                                                                <>
                                                                    <div className='font-semibold text-zinc-900 text-sm mb-1'>
                                                                        {
                                                                            dashMatch[1]
                                                                        }
                                                                    </div>
                                                                    <div className='text-xs text-zinc-600 leading-relaxed'>
                                                                        {
                                                                            dashMatch[2]
                                                                        }
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <span className='text-sm text-zinc-700 leading-relaxed font-medium'>
                                                                    {item}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        if (segment.type === 'tabs') {
                            // Parse tab items with descriptions (e.g., "Pending (new documents), Active (approved)")
                            // Split on comma followed by capital letter (start of next tab name)
                            const items = segment.content
                                .split(/,\s*(?=[A-Z][a-z])/) // Match comma-space followed by capital+lowercase (tab name start)
                                .map((item) => item.trim())
                                .filter(Boolean);

                            const parsedItems = items.map((item) => {
                                const parenMatch = item.match(
                                    /^(.+?)\s*\(([^)]+)\)\s*\.?$/
                                );
                                if (parenMatch) {
                                    return {
                                        name: parenMatch[1].trim(),
                                        desc: parenMatch[2].trim(),
                                    };
                                }
                                return {
                                    name: item.replace(/\.$/, '').trim(),
                                    desc: null,
                                };
                            });

                            return (
                                <div key={idx} className='space-y-3'>
                                    <p className='text-base text-zinc-900 font-semibold leading-relaxed'>
                                        {segment.label}:
                                    </p>
                                    <div className='grid md:grid-cols-2 gap-3'>
                                        {parsedItems.map((item, itemIdx) => (
                                            <div
                                                key={itemIdx}
                                                className='bg-indigo-50 rounded-lg p-3 border border-indigo-200 hover:border-indigo-300 hover:shadow-sm transition-all'>
                                                <div className='font-semibold text-indigo-900 text-sm mb-1'>
                                                    {item.name}
                                                </div>
                                                {item.desc && (
                                                    <div className='text-xs text-indigo-700 leading-relaxed'>
                                                        {item.desc}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        }

                        // Regular text segment
                        return (
                            <p
                                key={idx}
                                className='text-base text-zinc-700 leading-relaxed whitespace-pre-line'>
                                {segment.content}
                            </p>
                        );
                    })}
                </div>
            );
        }
        // Handle step-by-step patterns first (e.g., "Step 1: ... Step 2: ...")
        if (/Step\s+\d+[.:]/.test(content)) {
            // Match all "Step X: content" patterns - match everything until next "Step X:" or end
            const stepRegex =
                /Step\s+(\d+)[.:]\s+([\s\S]+?)(?=\s*Step\s+\d+[.:]|$)/g;
            const steps: Array<{ num: string; text: string }> = [];
            let match;

            while ((match = stepRegex.exec(content)) !== null) {
                let stepText = match[2].trim();
                // Remove trailing period that appears before the next "Step"
                stepText = stepText.replace(/\.\s*$/, '').trim();
                // Ensure we don't have "Step" word at the end
                if (stepText && !stepText.endsWith('Step')) {
                    steps.push({ num: match[1], text: stepText });
                }
            }

            if (steps.length > 1) {
                return (
                    <div className='relative'>
                        {/* Vertical line positioned to the left with padding */}
                        <div className='absolute left-0 top-0 bottom-0 w-0.5 bg-purple-200' />
                        <div className='space-y-4 relative pl-5'>
                            {steps.map((step, idx) => (
                                <div
                                    key={idx}
                                    className='flex gap-4 items-start'>
                                    {/* Number badge with padding from line */}
                                    <div className='flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center text-sm font-bold shadow-sm'>
                                        {step.num}
                                    </div>
                                    <p className='text-base text-zinc-700 leading-relaxed flex-1 pt-0.5'>
                                        {step.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            }
        }

        // Handle numbered patterns without "Step" prefix (e.g., "1: ... 2: ...")
        if (
            /\d+[.:]\s+[A-Z]/.test(content) &&
            content.match(/\d+[.:]/g) &&
            content.match(/\d+[.:]/g)!.length > 1 &&
            !content.includes('Step')
        ) {
            const steps = content
                .split(/(?=\d+[.:]\s+[A-Z])/)
                .map((step) => step.trim())
                .filter(Boolean);

            if (steps.length > 1) {
                return (
                    <div className='relative'>
                        {/* Vertical line positioned to the left with padding */}
                        <div className='absolute left-0 top-0 bottom-0 w-0.5 bg-purple-200' />
                        <div className='space-y-4 relative pl-5'>
                            {steps.map((step, idx) => {
                                const match = step.match(/^(\d+)[.:]\s+(.+)$/);
                                if (match) {
                                    return (
                                        <div
                                            key={idx}
                                            className='flex gap-4 items-start'>
                                            {/* Number badge with padding from line */}
                                            <div className='flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center text-sm font-bold shadow-sm'>
                                                {match[1]}
                                            </div>
                                            <p className='text-base text-zinc-700 leading-relaxed flex-1 pt-0.5'>
                                                {match[2]}
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                );
            }
        }

        // Handle colon-separated lists (e.g., "Use this guide when: Item 1, Item 2, Item 3")
        if (content.includes(':')) {
            const colonIndex = content.indexOf(':');
            const beforeColon = content.substring(0, colonIndex + 1).trim();
            const afterColon = content.substring(colonIndex + 1).trim();

            // Skip if this is a flowing sentence
            const isFlowingSentence = /,\s+and\s+[A-Z]|\.\s+All\s+three/.test(
                afterColon
            );
            const hasParentheticalDescriptions =
                (afterColon.match(/\(/g) || []).length >= 2;

            // Check if after colon contains multiple comma-separated items
            if (
                afterColon.includes(',') &&
                !isFlowingSentence &&
                !hasParentheticalDescriptions
            ) {
                const items = afterColon
                    .split(',')
                    .map((item) => item.trim())
                    .filter(Boolean);

                // Only format as list if items are clearly standalone (not part of a sentence)
                const itemsEndWithPeriods = items.some((item) =>
                    item.endsWith('.')
                );
                const hasAndConnector = items.some((item) =>
                    /^\s*and\s+/i.test(item)
                );
                const isSentence =
                    items.length === 1 && afterColon.includes('.');

                if (
                    items.length >= 2 &&
                    items[0].match(/^[A-Z]/) &&
                    !itemsEndWithPeriods &&
                    !hasAndConnector &&
                    !isSentence
                ) {
                    // Detect action words and add icons
                    const formatItem = (item: string) => {
                        const actionMatch = Object.keys(ACTION_ICONS).find(
                            (action) =>
                                item
                                    .toLowerCase()
                                    .startsWith(action.toLowerCase() + ' ')
                        );
                        if (actionMatch) {
                            return (
                                <div className='flex items-start gap-3'>
                                    <span className='text-lg flex-shrink-0 mt-0.5'>
                                        {ACTION_ICONS[actionMatch]}
                                    </span>
                                    <span className='text-base text-zinc-700 leading-relaxed flex-1'>
                                        {item}
                                    </span>
                                </div>
                            );
                        }
                        return (
                            <span className='text-base text-zinc-700 leading-relaxed'>
                                {item}
                            </span>
                        );
                    };

                    return (
                        <div className='space-y-4'>
                            <p className='text-base text-zinc-900 font-semibold leading-relaxed mb-3'>
                                {beforeColon}
                            </p>
                            <div className='relative'>
                                {/* Vertical line positioned to the left with padding */}
                                <div className='absolute left-0 top-0 bottom-0 w-0.5 bg-purple-200' />
                                <ul className='space-y-3 relative pl-5'>
                                    {items.map((item, idx) => (
                                        <li
                                            key={idx}
                                            className='flex items-start gap-4'>
                                            {/* Bullet dot with padding from line */}
                                            <div className='flex-shrink-0 w-2 h-2 rounded-full bg-purple-500 mt-[6px]' />
                                            <div className='flex-1 pt-0.5'>
                                                {formatItem(item)}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                }
            }
        }

        // Handle dash/em-dash separated lists (only if multiple dashes)
        const dashMatches = content.match(/—/g);
        const hasMultipleDashes = dashMatches && dashMatches.length > 1;

        if (hasMultipleDashes) {
            const items = content
                .split('—')
                .map((item) => item.trim())
                .filter(Boolean);
            if (items.length > 2) {
                return (
                    <div className='relative'>
                        {/* Vertical line positioned to the left with padding */}
                        <div className='absolute left-0 top-0 bottom-0 w-0.5 bg-purple-200' />
                        <ul className='space-y-3 relative pl-5'>
                            {items.map((item, idx) => (
                                <li
                                    key={idx}
                                    className='flex items-start gap-4'>
                                    {/* Bullet dot with padding from line */}
                                    <div className='flex-shrink-0 w-2 h-2 rounded-full bg-purple-500 mt-[6px]' />
                                    <span className='text-base text-zinc-700 leading-relaxed flex-1 pt-0.5'>
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            }
        }

        // Handle "Admins handle:" pattern (same format as "Key features include:")
        if (content.includes('Admins handle:')) {
            const parts = content.split('Admins handle:');
            if (parts.length === 2) {
                const introText = parts[0].trim();
                const featuresText = parts[1].trim();

                // Extract closing sentence if it exists
                const lastPeriodIndex = featuresText.lastIndexOf('.');
                let closingSentence = '';
                let cleanFeaturesText = featuresText;

                if (
                    lastPeriodIndex > 0 &&
                    lastPeriodIndex < featuresText.length - 10
                ) {
                    const textAfterPeriod = featuresText
                        .substring(lastPeriodIndex + 1)
                        .trim();
                    if (
                        textAfterPeriod.length > 20 &&
                        !textAfterPeriod.match(/^(While|As)/i)
                    ) {
                        closingSentence = '';
                    } else if (textAfterPeriod.length > 0) {
                        closingSentence = textAfterPeriod;
                        cleanFeaturesText = featuresText.substring(
                            0,
                            lastPeriodIndex
                        );
                    }
                }

                const featureItems: Array<{
                    category: string;
                    description: string;
                }> = [];

                const categoryPattern =
                    /([A-Z][A-Za-z]+(?:\s+[A-Z][A-Za-z]+)*(?:\s*&\s*[A-Z][A-Za-z]+)?)\s*—/g;
                const categoryMatches: Array<{
                    index: number;
                    category: string;
                }> = [];

                let match;
                while (
                    (match = categoryPattern.exec(cleanFeaturesText)) !== null
                ) {
                    categoryMatches.push({
                        index: match.index,
                        category: match[1].trim(),
                    });
                }

                for (let i = 0; i < categoryMatches.length; i++) {
                    const currentMatch = categoryMatches[i];
                    const nextMatch = categoryMatches[i + 1];

                    const segmentStart = currentMatch.index;
                    const segmentEnd = nextMatch
                        ? nextMatch.index
                        : cleanFeaturesText.length;

                    // Extract the segment and ensure we start exactly at the category name
                    let segment = cleanFeaturesText.substring(
                        segmentStart,
                        segmentEnd
                    );

                    // Remove any leading punctuation and whitespace to ensure clean start
                    segment = segment.replace(/^[,\s]+/, '').trim();

                    // Safety check: ensure we start at the category
                    const categoryStartInSegment = segment.indexOf(
                        currentMatch.category
                    );
                    if (categoryStartInSegment > 0) {
                        segment = segment.substring(categoryStartInSegment);
                    }

                    const dashMatch = segment.match(
                        /^([A-Z][A-Za-z\s&]+?)\s*—\s*(.+?)$/
                    );
                    if (dashMatch) {
                        let category = dashMatch[1].trim();
                        let description = dashMatch[2].trim();

                        description = description.replace(/,\s*$/, '').trim();
                        if (!nextMatch) {
                            if (!description.match(/\.\s*[A-Z]/)) {
                                description = description
                                    .replace(/\.\s*$/, '')
                                    .trim();
                            }
                        } else {
                            description = description
                                .replace(/\.\s*$/, '')
                                .trim();
                        }

                        category = category.replace(/[.,]\s*$/, '').trim();

                        if (category && description) {
                            featureItems.push({ category, description });
                        }
                    }
                }

                if (featureItems.length > 1) {
                    return (
                        <div className='space-y-5'>
                            {/* Intro text - no bullet, clear paragraph */}
                            {introText && (
                                <p className='text-base text-zinc-700 leading-relaxed mb-1'>
                                    {introText}
                                </p>
                            )}
                            {/* Feature list section with clear separation */}
                            <div className='space-y-3'>
                                <p className='text-base text-zinc-900 font-semibold leading-relaxed'>
                                    Admins handle:
                                </p>
                                <div className='relative'>
                                    <div className='absolute left-0 top-0 bottom-0 w-0.5 bg-purple-200' />
                                    <ul className='space-y-3 relative pl-5'>
                                        {featureItems.map((item, idx) => (
                                            <li
                                                key={idx}
                                                className='flex items-start gap-4'>
                                                <div className='flex-shrink-0 w-2 h-2 rounded-full bg-purple-500 mt-[6px]' />
                                                <span className='text-base text-zinc-700 leading-relaxed flex-1 pt-0.5'>
                                                    <span className='font-semibold text-zinc-900'>
                                                        {item.category}
                                                    </span>
                                                    {' — '}
                                                    <span>
                                                        {item.description}
                                                    </span>
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            {/* Closing sentence - clearly separated */}
                            {closingSentence && (
                                <p className='text-base text-zinc-700 leading-relaxed mt-2 pt-2 border-t border-zinc-100'>
                                    {closingSentence}
                                </p>
                            )}
                        </div>
                    );
                }
            }
        }

        // Handle "What you need to know:" pattern (comma-separated capitalized items)
        if (content.includes('What you need to know:')) {
            const parts = content.split('What you need to know:');
            if (parts.length === 2) {
                const introText = parts[0].trim();
                const featuresText = parts[1].trim();

                // Extract closing sentence
                const lastPeriodIndex = featuresText.lastIndexOf('.');
                let closingSentence = '';
                let cleanFeaturesText = featuresText;

                if (
                    lastPeriodIndex > 0 &&
                    lastPeriodIndex < featuresText.length - 10
                ) {
                    const textAfterPeriod = featuresText
                        .substring(lastPeriodIndex + 1)
                        .trim();
                    if (textAfterPeriod.length > 30) {
                        closingSentence = textAfterPeriod;
                        cleanFeaturesText = featuresText.substring(
                            0,
                            lastPeriodIndex
                        );
                    }
                }

                // Split on commas followed by capital letters (item boundaries)
                // Pattern: "Item text, NextItem text, AnotherItem text"
                const items: string[] = [];
                const itemPattern = /([A-Z][^,]+?)(?=,\s*[A-Z]|$)/g;
                let match;
                while ((match = itemPattern.exec(cleanFeaturesText)) !== null) {
                    const item = match[1]
                        .trim()
                        .replace(/\.\s*$/, '')
                        .trim();
                    if (item) items.push(item);
                }

                // Fallback: simple comma split if regex doesn't work
                if (items.length === 0) {
                    const simpleItems = cleanFeaturesText
                        .split(/, (?=[A-Z])/)
                        .map((i) =>
                            i
                                .trim()
                                .replace(/\.\s*$/, '')
                                .trim()
                        )
                        .filter(Boolean);
                    items.push(...simpleItems);
                }

                if (items.length > 1) {
                    return (
                        <div className='space-y-5'>
                            {/* Intro text - no bullet, clear paragraph */}
                            {introText && (
                                <p className='text-base text-zinc-700 leading-relaxed mb-1'>
                                    {introText}
                                </p>
                            )}
                            {/* Feature list section with clear separation */}
                            <div className='space-y-3'>
                                <p className='text-base text-zinc-900 font-semibold leading-relaxed'>
                                    What you need to know:
                                </p>
                                <div className='relative'>
                                    <div className='absolute left-0 top-0 bottom-0 w-0.5 bg-purple-200' />
                                    <ul className='space-y-3 relative pl-5'>
                                        {items.map((item, idx) => (
                                            <li
                                                key={idx}
                                                className='flex items-start gap-4'>
                                                <div className='flex-shrink-0 w-2 h-2 rounded-full bg-purple-500 mt-[6px]' />
                                                <span className='text-base text-zinc-700 leading-relaxed flex-1 pt-0.5'>
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            {/* Closing sentence - clearly separated */}
                            {closingSentence && (
                                <p className='text-base text-zinc-700 leading-relaxed mt-2 pt-2 border-t border-zinc-100'>
                                    {closingSentence}
                                </p>
                            )}
                        </div>
                    );
                }
            }
        }

        // Handle "Key features include:" pattern with dash-separated items
        // Simplified parser: find all "CategoryName — description" patterns directly
        if (content.includes('Key features include:')) {
            const parts = content.split('Key features include:');
            if (parts.length === 2) {
                const introText = parts[0].trim();
                let featuresText = parts[1].trim();

                // Extract closing sentence (typically starts with "The app" or similar)
                let closingSentence = '';
                const closingPattern = /\.\s+(The\s+[^—]+?\.)$/i;
                const closingMatch = featuresText.match(closingPattern);
                if (closingMatch && closingMatch.index !== undefined) {
                    closingSentence = closingMatch[1].trim();
                    featuresText = featuresText.substring(
                        0,
                        closingMatch.index + 1
                    );
                }

                // Parse "Category — description" patterns
                // Strategy: Split on the pattern ", [Capital Letter]... —" to separate features
                // Then parse each segment as "Category — description"
                const featureItems: Array<{
                    category: string;
                    description: string;
                }> = [];

                // Split on comma followed by space, then capital letter(s), then dash
                // This pattern identifies the start of a new category
                const segments = featuresText.split(
                    /,\s+(?=[A-Z][A-Za-z]+(?:\s+[A-Z][A-Za-z]+)*(?:\s*[&]\s*[A-Z][A-Za-z]+)?\s*[—–-])/
                );

                segments.forEach((segment) => {
                    // Each segment should be "Category — description"
                    const dashMatch = segment.match(
                        /^([A-Z][A-Za-z]+(?:\s+[A-Z][A-Za-z]+)*(?:\s*[&]\s*[A-Z][A-Za-z]+)?)\s*[—–-]\s*(.+)$/
                    );
                    if (dashMatch) {
                        const category = dashMatch[1].trim().replace(/\.$/, '');
                        let description = dashMatch[2].trim();

                        // Remove trailing comma/period (unless it's the closing sentence)
                        description = description.replace(/,\s*$/, '').trim();
                        if (!description.match(/\.\s+The\s/i)) {
                            description = description
                                .replace(/\.\s*$/, '')
                                .trim();
                        }

                        if (category && description) {
                            featureItems.push({
                                category: category,
                                description: description,
                            });
                        }
                    }
                });

                const items = featureItems;

                if (items.length > 1) {
                    return (
                        <div className='space-y-5'>
                            {/* Intro text - no bullet, clear paragraph */}
                            {introText && (
                                <p className='text-base text-zinc-700 leading-relaxed mb-1'>
                                    {introText}
                                </p>
                            )}
                            {/* Feature list section with clear separation */}
                            <div className='space-y-3'>
                                <p className='text-base text-zinc-900 font-semibold leading-relaxed'>
                                    Key features include:
                                </p>
                                <div className='relative'>
                                    {/* Vertical line positioned to the left with padding */}
                                    <div className='absolute left-0 top-0 bottom-0 w-0.5 bg-purple-200' />
                                    <ul className='space-y-3 relative pl-5'>
                                        {items.map((item, idx) => (
                                            <li
                                                key={idx}
                                                className='flex items-start gap-4'>
                                                {/* Bullet dot with padding from line */}
                                                <div className='flex-shrink-0 w-2 h-2 rounded-full bg-purple-500 mt-[6px]' />
                                                <span className='text-base text-zinc-700 leading-relaxed flex-1 pt-0.5'>
                                                    {item.category ? (
                                                        <>
                                                            <span className='font-semibold text-zinc-900'>
                                                                {item.category}
                                                            </span>
                                                            {' — '}
                                                            <span>
                                                                {
                                                                    item.description
                                                                }
                                                            </span>
                                                        </>
                                                    ) : (
                                                        item.description
                                                    )}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            {/* Closing sentence - clearly separated */}
                            {closingSentence && (
                                <p className='text-base text-zinc-700 leading-relaxed mt-2 pt-2 border-t border-zinc-100'>
                                    {closingSentence}
                                </p>
                            )}
                        </div>
                    );
                }
            }
        }

        // Detect table-like structures (e.g., "Field | Description" patterns)
        if (content.includes('|') || /^[A-Z][^:]+:\s+[A-Z]/.test(content)) {
            // Try to parse as table or key-value pairs
            const lines = content.split('\n').filter((l) => l.trim());
            if (lines.length > 1 && lines.some((l) => l.includes('|'))) {
                // Table format
                const rows = lines
                    .filter((l) => l.includes('|'))
                    .map((l) => l.split('|').map((cell) => cell.trim()));
                if (rows.length > 0) {
                    return (
                        <div className='overflow-x-auto -mx-2'>
                            <table className='w-full border-collapse'>
                                <tbody>
                                    {rows.map((row, idx) => (
                                        <tr
                                            key={idx}
                                            className={
                                                idx === 0
                                                    ? 'bg-purple-50 border-b-2 border-purple-200'
                                                    : 'border-b border-zinc-100 hover:bg-zinc-50'
                                            }>
                                            {row.map((cell, cellIdx) => (
                                                <td
                                                    key={cellIdx}
                                                    className={`p-3 text-sm ${
                                                        idx === 0
                                                            ? 'font-semibold text-zinc-900'
                                                            : 'text-zinc-700'
                                                    } ${
                                                        cellIdx === 0
                                                            ? 'font-medium'
                                                            : ''
                                                    }`}>
                                                    {cell}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    );
                }
            }
        }

        // Detect "Key columns include:" or similar patterns with descriptive lists
        const keyColumnsMatch = content.match(
            /(Key columns|Columns|Fields|Admin actions|Tabs|You can)(\s+include)?:?\s*([\s\S]+?)(?:\n\n|$)/
        );
        if (keyColumnsMatch) {
            const label = keyColumnsMatch[1];
            const itemsText = keyColumnsMatch[3];
            // Parse items that look like "Item (description)" or "Item: description"
            const items = itemsText
                .split(/[,;]\s*(?=[A-Z])/)
                .map((item) => item.trim())
                .filter(Boolean)
                .slice(0, 15); // Limit to prevent overflow

            if (items.length > 1) {
                return (
                    <div className='space-y-4'>
                        <p className='text-base text-zinc-900 font-semibold leading-relaxed mb-3'>
                            {label}:
                        </p>
                        <div className='grid md:grid-cols-2 gap-3'>
                            {items.map((item, idx) => {
                                const match = item.match(
                                    /^(.+?)\s*[(:]\s*(.+?)[)]?$/
                                );
                                if (match) {
                                    return (
                                        <div
                                            key={idx}
                                            className='bg-zinc-50 rounded-lg p-3 border border-zinc-200 hover:border-purple-300 hover:bg-purple-50/30 transition-colors'>
                                            <div className='font-medium text-zinc-900 text-sm mb-1'>
                                                {match[1]}
                                            </div>
                                            <div className='text-xs text-zinc-600'>
                                                {match[2]}
                                            </div>
                                        </div>
                                    );
                                }
                                return (
                                    <div
                                        key={idx}
                                        className='bg-zinc-50 rounded-lg p-3 border border-zinc-200'>
                                        <span className='text-sm text-zinc-700'>
                                            {item}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            }
        }

        // Default: regular paragraph with better typography and action highlighting
        const highlightedContent = content.split(
            /(\b(Add|Edit|Delete|View|Search|Approve|Reject|Verify|Update|Create|Assign|Monitor|Close)\s+[A-Z][^.!?]*[.!?])/g
        );
        if (highlightedContent.length > 1) {
            return (
                <div className='space-y-3'>
                    {highlightedContent.map((part, idx) => {
                        const actionMatch = Object.keys(ACTION_ICONS).find(
                            (action) =>
                                part
                                    .toLowerCase()
                                    .startsWith(action.toLowerCase() + ' ')
                        );
                        if (actionMatch) {
                            return (
                                <div
                                    key={idx}
                                    className='flex items-start gap-3 bg-purple-50/50 rounded-lg p-3 border border-purple-100'>
                                    <span className='text-xl flex-shrink-0 mt-0.5'>
                                        {ACTION_ICONS[actionMatch]}
                                    </span>
                                    <span className='text-base text-zinc-700 leading-relaxed flex-1 font-medium'>
                                        {part}
                                    </span>
                                </div>
                            );
                        }
                        return (
                            <p
                                key={idx}
                                className='text-base text-zinc-700 leading-relaxed whitespace-pre-line'>
                                {part}
                            </p>
                        );
                    })}
                </div>
            );
        }

        return (
            <p className='text-base text-zinc-700 leading-relaxed whitespace-pre-line'>
                {content}
            </p>
        );
    };

    return (
        <article
            className={`relative bg-white rounded-xl border overflow-hidden mb-8 transition-all hover:shadow-lg ${
                isModuleSection
                    ? 'border-purple-200 shadow-md bg-gradient-to-br from-white to-purple-50/20'
                    : 'border-zinc-200 shadow-sm'
            }`}>
            {/* Number badge with gradient */}
            <div className='absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-purple-500 via-purple-400 to-purple-600' />

            <div className='p-6 pl-8'>
                {/* Step number and title with icon */}
                <div className='flex items-start gap-4 mb-5'>
                    <div className='relative flex-shrink-0'>
                        <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center text-base font-bold shadow-lg'>
                            {moduleIcon ? MODULE_ICONS[moduleIcon] : index + 1}
                        </div>
                        {!moduleIcon && (
                            <div className='absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white border-2 border-purple-500 flex items-center justify-center'>
                                <span className='text-[10px] font-bold text-purple-600'>
                                    {index + 1}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className='flex-1'>
                        <h2 className='text-xl font-bold tracking-tight text-zinc-900 pt-1.5 flex items-center gap-2'>
                            {title}
                            {isModuleSection && (
                                <span className='text-xs font-normal px-2 py-1 rounded-full bg-purple-100 text-purple-700 border border-purple-200'>
                                    Module
                                </span>
                            )}
                        </h2>
                    </div>
                </div>

                {/* Content */}
                <div className='ml-16'>{formatContent(contentString)}</div>
            </div>
        </article>
    );
}

function Callout({
    tone = 'info',
    title,
    children,
}: React.PropsWithChildren<{ tone?: 'info' | 'warning'; title: string }>) {
    const toneMap =
        tone === 'warning'
            ? {
                  wrap: 'bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-300 shadow-md',
                  icon: '⚠️',
                  titleColor: 'text-amber-900',
                  textColor: 'text-amber-800',
                  chip: 'bg-amber-500',
              }
            : {
                  wrap: 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-300 shadow-md',
                  icon: '💡',
                  titleColor: 'text-indigo-900',
                  textColor: 'text-indigo-800',
                  chip: 'bg-indigo-500',
              };
    return (
        <div
            className={`rounded-2xl border-2 p-6 ${toneMap.wrap} relative overflow-hidden`}>
            {/* Decorative corner accent */}
            <div className='absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-bl-full -mr-12 -mt-12' />
            <div className='relative flex items-start gap-4'>
                <div className='flex-shrink-0 text-2xl'>{toneMap.icon}</div>
                <div className='flex-1'>
                    <div
                        className={`font-semibold text-base mb-2 ${toneMap.titleColor}`}>
                        {title}
                    </div>
                    <div
                        className={`text-sm leading-relaxed ${toneMap.textColor}`}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

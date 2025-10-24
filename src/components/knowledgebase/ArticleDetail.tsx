'use client';

import { KMS_CONTENT, ARTICLE_DETAILS, UserRole } from '@/data/knowledgebase';

interface ArticleDetailProps {
  role: UserRole;
  slug: string;
  onBack: () => void;
}

export default function ArticleDetail({ role, slug, onBack }: ArticleDetailProps) {
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
        <div className="max-w-6xl mx-auto px-5 py-8">
          <button
            onClick={onBack}
            className="text-sm text-zinc-500 hover:text-zinc-700 mb-4"
          >
            ← Back to results
          </button>
          <div className="bg-white rounded-2xl border border-zinc-100 p-8 text-center">
            <h1 className="text-2xl font-bold text-zinc-900 mb-2">{article.title}</h1>
            <p className="text-zinc-600 mb-4">{article.excerpt}</p>
            <p className="text-sm text-zinc-500">
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
      <div className="max-w-6xl mx-auto px-5">
        <button
          onClick={onBack}
          className="text-sm text-zinc-500 hover:text-zinc-700"
        >
          ← Back to results
        </button>
      </div>

      {/* Hero header */}
      <div className="mt-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white">
        <div className="max-w-6xl mx-auto px-5 py-8">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg bg-white/15 flex items-center justify-center text-lg">
              📘
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs opacity-90">
                <span className="px-2 py-0.5 rounded-full bg-white/15 border border-white/20">
                  {article.type}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/15 border border-white/20">
                  {article.status}
                </span>
                <span className="opacity-90">Updated {article.updated}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mt-2">
                {article.title}
              </h1>
              <p className="text-white/90 mt-2 text-sm max-w-2xl">
                {article.excerpt}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Body grid */}
      <div className="max-w-6xl mx-auto px-5 py-8 grid grid-cols-12 gap-8">
        {/* Content */}
        <div className="col-span-12 md:col-span-9">
          {/* Meta strip */}
          <div className="rounded-xl border border-zinc-100 bg-white p-4 mb-6">
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-y-2 text-sm">
              <div>
                <dt className="text-zinc-500">Role</dt>
                <dd className="font-medium capitalize">{role}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Article</dt>
                <dd className="font-medium">{article.type}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Status</dt>
                <dd className="font-medium">{article.status}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Last updated</dt>
                <dd className="font-medium">{article.updated} ago</dd>
              </div>
            </dl>
          </div>

          {/* Steps timeline */}
          {content.map((section, index) => (
            <section key={section.id} id={section.id} className="mb-6">
              <StepCard index={index} title={section.title}>
                {section.content}
              </StepCard>
            </section>
          ))}

          {/* Callouts */}
          {callouts.length > 0 && (
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {callouts.map((callout, index) => (
                <Callout
                  key={index}
                  tone={callout.tone}
                  title={callout.title}
                >
                  {callout.content}
                </Callout>
              ))}
            </div>
          )}

          {/* Troubleshooting */}
          {troubleshooting.length > 0 && (
            <section id="troubleshoot" className="mb-10">
              <div className="rounded-2xl border border-zinc-100 bg-white p-5">
                <h2 className="text-lg font-semibold tracking-tight">
                  Troubleshooting
                </h2>
                <ul className="list-disc ml-5 mt-3 text-sm text-zinc-700 space-y-1">
                  {troubleshooting.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Bottom nav */}
          <div className="flex items-center gap-3 border-t border-zinc-100 pt-6">
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-lg border border-zinc-200 hover:bg-zinc-50 text-sm"
            >
              ← All articles
            </button>
            <a
              href="#"
              className="ml-auto text-sm text-purple-700 hover:underline"
            >
              Suggest an edit
            </a>
          </div>
        </div>

        {/* Sidebar TOC */}
        <aside className="col-span-12 md:col-span-3">
          <div className="md:sticky md:top-24 space-y-4">
            <div className="rounded-xl border border-zinc-100 bg-white p-4">
              <div className="text-xs uppercase text-zinc-500 mb-2">
                On this page
              </div>
              <nav className="space-y-1">
                {toc.map((t) => (
                  <a
                    key={t.id}
                    href={`#${t.id}`}
                    className="block text-sm text-zinc-700 hover:text-purple-700"
                  >
                    {t.label}
                  </a>
                ))}
              </nav>
            </div>
            <div className="rounded-xl border border-zinc-100 bg-white p-4">
              <div className="text-xs uppercase text-zinc-500 mb-2">Related</div>
              <ul className="space-y-2 text-sm">
                {KMS_CONTENT.articles[role]
                  .filter((x) => x.slug !== article.slug)
                  .slice(0, 3)
                  .map((x) => (
                    <li key={x.slug}>
                      <a
                        className="block text-zinc-700 hover:text-purple-700"
                        href="#"
                      >
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
      <div className="border-t border-zinc-100 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-5 py-5 flex flex-wrap items-center gap-2">
          <span className="text-sm text-zinc-700">Was this helpful?</span>
          <button className="px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-sm">
            👍 Yes
          </button>
          <button className="px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-sm">
            👎 No
          </button>
          <a
            className="ml-auto text-sm text-purple-700 hover:underline"
            href="#"
          >
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
  children,
}: React.PropsWithChildren<{ index: number; title: string }>) {
  return (
    <div className="relative rounded-2xl border border-zinc-100 bg-white p-5">
      <div
        className="absolute -left-3 -top-3 h-8 w-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm shadow"
        aria-hidden
      >
        {index}
      </div>
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <div className="text-sm text-zinc-700 mt-2">{children}</div>
    </div>
  );
}

function Callout({
  tone = 'info',
  title,
  children,
}: React.PropsWithChildren<{ tone?: 'info' | 'warning'; title: string }>) {
  const toneMap =
    tone === 'warning'
      ? { wrap: 'bg-amber-50 border-amber-200', chip: 'bg-amber-500' }
      : { wrap: 'bg-indigo-50 border-indigo-200', chip: 'bg-indigo-500' };
  return (
    <div className={`rounded-2xl border p-5 ${toneMap.wrap}`}>
      <div className="flex items-start gap-2">
        <div className={`h-2.5 w-2.5 rounded-full mt-2 ${toneMap.chip}`} />
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-sm text-zinc-700 mt-1">{children}</div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { Article } from '@/data/knowledgebase';

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
}

export default function ArticleCard({ article, onClick }: ArticleCardProps) {
  return (
    <article
      onClick={onClick}
      className="group rounded-2xl border border-zinc-100 bg-white p-5 hover:shadow-sm transition cursor-pointer"
    >
      <div className="flex items-center gap-2 text-xs text-zinc-500">
        <span>{article.type}</span>
        <span>•</span>
        <span>Updated {article.updated}</span>
      </div>
      <h3 className="text-base font-semibold mt-1 tracking-tight group-hover:text-purple-700">
        {article.title}
      </h3>
      <p className="text-sm text-zinc-600 mt-2">{article.excerpt}</p>
    </article>
  );
}

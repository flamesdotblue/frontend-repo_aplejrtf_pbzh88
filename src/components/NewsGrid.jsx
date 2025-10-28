import { Clock } from "lucide-react";

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
  if (diff < 1) return "just now";
  if (diff < 60) return `${diff}m ago`;
  const h = Math.floor(diff / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

function ArticleCard({ article, onSummarize }) {
  return (
    <article className="group rounded-xl border border-emerald-100 bg-white/70 backdrop-blur hover:shadow-md transition overflow-hidden">
      {article.image && (
        <div className="aspect-[16/9] overflow-hidden bg-emerald-50">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2 text-xs text-emerald-700/80">
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-200">
            {article.category}
          </span>
          <span className="flex items-center gap-1 text-emerald-600/80">
            <Clock className="h-3.5 w-3.5" /> {timeAgo(article.publishedAt)}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-emerald-900 leading-snug">
          {article.title}
        </h3>
        <p className="text-sm text-emerald-800/80 line-clamp-3">{article.description}</p>
        <div className="flex items-center gap-2 pt-1">
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="text-emerald-700 hover:text-emerald-800 text-sm font-medium"
          >
            Read full story →
          </a>
          <span className="text-emerald-300">•</span>
          <button
            onClick={() => onSummarize(article)}
            className="text-sm text-emerald-700 hover:text-emerald-900 font-medium"
          >
            Summarize
          </button>
        </div>
      </div>
    </article>
  );
}

export default function NewsGrid({ articles, onSummarize }) {
  if (!articles.length) {
    return (
      <div className="text-center py-16 text-emerald-800/70">
        No stories found. Try a different search or category.
      </div>
    );
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((a) => (
        <ArticleCard key={a.id} article={a} onSummarize={onSummarize} />
      ))}
    </div>
  );
}

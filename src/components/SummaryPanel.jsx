import { X, Sparkles } from "lucide-react";

function extractSummary(text, sentences = 3) {
  if (!text) return "No content available to summarize.";
  const cleaned = text
    .replace(/\s+/g, " ")
    .replace(/\(([^)]*)\)/g, "")
    .trim();
  const parts = cleaned.split(/(?<=[.!?])\s+/).filter(Boolean);
  const short = parts.slice(0, sentences).join(" ");

  // simple keyword extraction by frequency
  const words = cleaned
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 3);
  const freq = new Map();
  for (const w of words) freq.set(w, (freq.get(w) || 0) + 1);
  const keywords = Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([w]) => w);

  return { short, keywords };
}

export default function SummaryPanel({ article, onClose }) {
  if (!article) return null;
  const { short, keywords } = extractSummary(
    `${article.title}. ${article.description}`
  );

  return (
    <div className="fixed inset-0 z-40">
      <div
        className="absolute inset-0 bg-emerald-950/40"
        onClick={onClose}
        aria-hidden
      />
      <div className="absolute right-0 top-0 h-full w-full sm:w-[28rem] bg-white shadow-xl border-l border-emerald-100 flex flex-col">
        <div className="p-4 border-b border-emerald-100 flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-emerald-500/10 grid place-items-center">
            <Sparkles className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-emerald-900">AI Summary</h4>
            <p className="text-xs text-emerald-700/80">Quick overview generated locally</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-emerald-50 text-emerald-700"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 overflow-y-auto">
          <div>
            <h3 className="text-lg font-semibold text-emerald-900 leading-snug">
              {article.title}
            </h3>
            <p className="mt-2 text-emerald-800/80">{short}</p>
          </div>

          {keywords?.length > 0 && (
            <div>
              <h5 className="text-sm font-medium text-emerald-900 mb-2">Key topics</h5>
              <div className="flex flex-wrap gap-2">
                {keywords.map((k) => (
                  <span
                    key={k}
                    className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          )}

          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition font-medium"
          >
            Read full article
          </a>
        </div>
      </div>
    </div>
  );
}

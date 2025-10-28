const CATEGORIES = [
  "Top",
  "World",
  "Business",
  "Technology",
  "Science",
  "Health",
  "Sports",
  "Entertainment",
];

export default function CategoryTabs({ active, onChange }) {
  return (
    <div className="w-full border-b border-emerald-100 bg-gradient-to-b from-emerald-50/60 to-transparent">
      <div className="max-w-6xl mx-auto px-4 py-3 overflow-x-auto">
        <div className="flex items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => onChange(cat)}
                className={`shrink-0 px-3 py-1.5 rounded-full border transition-all ${
                  isActive
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                    : "bg-white text-emerald-700 border-emerald-200 hover:border-emerald-400"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

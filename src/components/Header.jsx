import { Search, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Header({ onSearch }) {
  const [query, setQuery] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-emerald-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-emerald-500/10 grid place-items-center">
            <Sparkles className="h-5 w-5 text-emerald-600" />
          </div>
          <span className="text-xl font-bold tracking-tight text-emerald-700">newspot</span>
        </div>

        <form onSubmit={submit} className="ml-auto flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search today's headlines..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 bg-white/70"
            />
          </div>
        </form>
      </div>
    </header>
  );
}

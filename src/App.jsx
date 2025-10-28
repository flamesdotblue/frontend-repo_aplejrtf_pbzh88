import { useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import CategoryTabs from "./components/CategoryTabs.jsx";
import NewsGrid from "./components/NewsGrid.jsx";
import SummaryPanel from "./components/SummaryPanel.jsx";

const MOCK_NEWS = [
  {
    id: "1",
    title: "Global markets rally as green tech outperforms",
    description:
      "Stocks surged today with renewable energy and climate-focused companies leading gains amid strong quarterly results and fresh policy support across regions.",
    category: "Business",
    image:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1600&auto=format&fit=crop",
    url: "https://news.example.com/markets-green-tech",
    publishedAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
  },
  {
    id: "2",
    title: "Breakthrough battery cuts charging time to 5 minutes",
    description:
      "Researchers unveil a new solid-state battery architecture promising ultra-fast charging and improved safety for electric vehicles and consumer devices.",
    category: "Technology",
    image:
      "https://images.unsplash.com/photo-1581093458791-9d1cca0a7f2e?q=80&w=1600&auto=format&fit=crop",
    url: "https://news.example.com/battery-breakthrough",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "3",
    title: "Urban parks expand as cities prioritize green living",
    description:
      "New initiatives aim to add tree canopies, micro-forests, and bike routes, bringing cooler neighborhoods and healthier commutes to millions of residents.",
    category: "World",
    image:
      "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=1600&auto=format&fit=crop",
    url: "https://news.example.com/urban-parks",
    publishedAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
  },
  {
    id: "4",
    title: "Study links daily walks to improved mental wellbeing",
    description:
      "A multi-year analysis highlights how short, regular walks significantly reduce stress markers and improve sleep quality across age groups.",
    category: "Health",
    image:
      "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?q=80&w=1600&auto=format&fit=crop",
    url: "https://news.example.com/daily-walks",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: "5",
    title: "Championship goes down to dramatic final seconds",
    description:
      "An unforgettable finish caps a season of comebacks as the underdogs clinch the title with a last-second play that stunned fans worldwide.",
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1521417531071-6e1f9d63b9b3?q=80&w=1600&auto=format&fit=crop",
    url: "https://news.example.com/championship-finale",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
  },
  {
    id: "6",
    title: "New exoplanet discovered in star's habitable zone",
    description:
      "Astronomers report the discovery of an Earth-sized exoplanet situated within its star's habitable zone, raising hopes for future atmospheric studies.",
    category: "Science",
    image:
      "https://images.unsplash.com/photo-1447433909565-04bfc496fe9d?q=80&w=1600&auto=format&fit=crop",
    url: "https://news.example.com/new-exoplanet",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
  },
];

export default function App() {
  const [category, setCategory] = useState("Top");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return MOCK_NEWS.filter((a) => {
      const matchesCategory = category === "Top" || a.category === category;
      const matchesSearch =
        !term ||
        a.title.toLowerCase().includes(term) ||
        a.description.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white text-emerald-900">
      <Header onSearch={setSearch} />
      <CategoryTabs active={category} onChange={setCategory} />

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <section className="rounded-2xl border border-emerald-100 bg-white/70 backdrop-blur p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/40 via-transparent to-transparent pointer-events-none" />
          <h2 className="text-2xl font-semibold tracking-tight">
            Fresh, green daily news — distilled for you
          </h2>
          <p className="text-emerald-800/80 mt-1">
            Welcome to newspot. Explore today's stories and tap Summarize for a quick AI overview.
          </p>
        </section>

        <NewsGrid articles={filtered} onSummarize={setSelected} />
      </main>

      <footer className="max-w-6xl mx-auto px-4 py-10 text-sm text-emerald-800/70">
        © {new Date().getFullYear()} newspot — daily stories in a clean green look.
      </footer>

      <SummaryPanel article={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

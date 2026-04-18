"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { hydrate } from "@/store/settingsSlice";
import type { SearchResult } from "@/lib/types";

export default function SearchPage() {
  const dispatch = useAppDispatch();
  const { arabicFontFamily, arabicFontSize, translationFontSize, showTranslation } =
    useAppSelector((s) => s.settings);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    dispatch(hydrate());
  }, [dispatch]);

  const doSearch = useCallback(async () => {
    const q = query.trim();
    if (q.length < 2) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&lang=en`);
      const data = await res.json();
      setResults(data.results ?? []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") doSearch();
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold text-white">Search the Quran</h1>

      {/* Search Bar */}
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search in English translation..."
          className="flex-1 rounded-lg border border-dark-border bg-dark-card px-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
        <button
          onClick={doSearch}
          disabled={loading || query.trim().length < 2}
          className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "..." : "Search"}
        </button>
      </div>

      {/* Results */}
      <div className="mt-6 space-y-4">
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
            <p className="mt-2 text-sm text-gray-400">Searching...</p>
          </div>
        )}

        {!loading && searched && results.length === 0 && (
          <p className="text-center text-gray-400 py-8">
            No results found for &ldquo;{query}&rdquo;
          </p>
        )}

        {!loading &&
          results.map((r, i) => (
            <Link
              key={`${r.surahIndex}-${r.verseKey}-${i}`}
              href={`/surahs/${parseInt(r.surahIndex, 10)}`}
            >
              <div className="rounded-xl border border-dark-border bg-dark-card p-5 hover:border-emerald-500/50 hover:shadow-md hover:shadow-emerald-900/20 transition-all mb-3">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-emerald-600/20 px-3 py-0.5 text-xs font-semibold text-emerald-400">
                    {r.surahName} : {r.verseNumber}
                  </span>
                </div>

                {/* Arabic */}
                {r.arabic && (
                  <p
                    className="text-gray-100 leading-loose"
                    dir="rtl"
                    style={{
                      fontFamily: `"${arabicFontFamily}", serif`,
                      fontSize: `${arabicFontSize}px`,
                      lineHeight: 1.8,
                    }}
                  >
                    {r.arabic}
                  </p>
                )}

                {/* Translation */}
                {showTranslation && (
                  <p
                    className="mt-2 text-gray-400"
                    style={{ fontSize: `${translationFontSize}px` }}
                  >
                    {r.text}
                  </p>
                )}
              </div>
            </Link>
          ))}
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeSurahSidebar } from "@/store/settingsSlice";
import type { Surah } from "@/lib/types";
import { SURAH_MEANINGS } from "@/lib/surahMeanings";

interface Props {
  surahs: Surah[];
  currentId?: number;
}

export default function SurahSidebar({ surahs, currentId }: Props) {
  const dispatch = useAppDispatch();
  const surahSidebarOpen = useAppSelector((s) => s.settings.surahSidebarOpen);
  const [search, setSearch] = useState("");

  const filtered = surahs.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      String(parseInt(s.index, 10)).includes(search)
  );

  return (
    <>
      {/* Mobile backdrop */}
      {surahSidebarOpen && (
        <div
          className="fixed bottom-0 left-0 right-0 top-12 z-30 bg-black/60 lg:hidden"
          onClick={() => dispatch(closeSurahSidebar())}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed bottom-0 top-12 z-30 flex w-72 flex-col border-r border-qm-border bg-qm-sidebar
          transition-transform duration-300
          lg:left-14 lg:translate-x-0
          ${surahSidebarOpen ? "left-14 translate-x-0" : "-translate-x-full left-14"}
        `}
      >
        {/* Header — "Surah | Juz | Page" tabs */}
        <div className="flex items-center justify-between border-b border-qm-border px-3 py-2">
          <div className="flex gap-1">
            {["Surah", "Juz", "Page"].map((tab) => (
              <button
                key={tab}
                className={`rounded px-3 py-1 text-xs font-semibold transition-colors ${
                  tab === "Surah"
                    ? "bg-qm-green/20 text-qm-green"
                    : "text-qm-muted hover:text-qm-text"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button
            onClick={() => dispatch(closeSurahSidebar())}
            className="rounded p-1 text-qm-muted transition-colors hover:text-white lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 rounded-lg border border-qm-border bg-qm-bg px-3 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 shrink-0 text-qm-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Surah"
              className="w-full bg-transparent text-sm text-qm-text placeholder-qm-muted outline-none"
            />
          </div>
        </div>

        {/* Surah list */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {filtered.map((surah) => {
            const num = parseInt(surah.index, 10);
            const isActive = currentId === num;
            const meaning = SURAH_MEANINGS[num] ?? surah.type;

            return (
              <Link
                key={surah.index}
                href={`/surahs/${num}`}
                onClick={() => dispatch(closeSurahSidebar())}
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors hover:bg-white/5 ${
                  isActive ? "bg-qm-green-dim/50 border-l-2 border-qm-green" : "border-l-2 border-transparent"
                }`}
              >
                {/* Number badge — circle */}
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    isActive
                      ? "bg-qm-green text-black"
                      : "border border-qm-border text-qm-muted"
                  }`}
                >
                  {num}
                </span>

                {/* Name + meaning */}
                <div className="min-w-0 flex-1">
                  <p
                    className={`truncate text-sm font-semibold ${
                      isActive ? "text-qm-green" : "text-qm-text"
                    }`}
                  >
                    {surah.title}
                  </p>
                  <p className="truncate text-xs text-qm-muted">{meaning}</p>
                </div>

                {/* Arabic name */}
                <span
                  className="shrink-0 text-sm text-qm-muted"
                  style={{ fontFamily: "Amiri, serif" }}
                  dir="rtl"
                >
                  {surah.titleAr}
                </span>
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
}

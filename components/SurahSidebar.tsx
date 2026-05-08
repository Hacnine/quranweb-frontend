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

const TABS = ["Surah", "Juz", "Page"] as const;
type Tab = (typeof TABS)[number];

export default function SurahSidebar({ surahs, currentId }: Props) {
  const dispatch = useAppDispatch();
  const surahSidebarOpen = useAppSelector((s) => s.settings.surahSidebarOpen);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("Surah");

  const filtered = surahs.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      String(parseInt(s.index, 10)).includes(search)
  );

  return (
    <>
      {surahSidebarOpen && (
        <div
          className="fixed bottom-[60px] laptop:bottom-0 left-0 right-0 top-[60px] z-30 bg-black/60 laptop:hidden"
          onClick={() => dispatch(closeSurahSidebar())}
        />
      )}

      <aside
        className={`
          fixed top-[60px] bottom-[60px] laptop:bottom-0 z-30 flex w-[300px] flex-col border-r border-qm-border bg-qm-bg
          transition-transform duration-300
          laptop:left-[60px] laptop:translate-x-0
          ${surahSidebarOpen ? "left-0 translate-x-0" : "-translate-x-full left-0"}
        `}
      >
        <div className="px-[26px] pt-6 pb-4">
          <div className="relative isolate flex min-h-10 items-center rounded-full border-4 border-qm-sidebar bg-qm-sidebar">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`z-10 h-full w-full py-2 text-sm font-semibold transition-colors ${
                  activeTab === tab ? "text-qm-text" : "text-qm-muted"
                }`}
              >
                {tab}
              </button>
            ))}
            <div
              className="absolute h-full rounded-full bg-qm-bg transition-transform duration-300 ease-in-out"
              style={{
                width: "calc(33.333333%)",
                transform: `translateX(${TABS.indexOf(activeTab) * 100}%)`,
              }}
            />
          </div>
        </div>

        <div className="mb-4 px-[26px]">
          <div className="flex h-10 items-center gap-3 rounded-full border border-qm-border bg-qm-sidebar px-3 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none" className="shrink-0 text-qm-muted">
              <path d="M18.3789 18.3721L14.7539 14.7471M16.7122 10.0387C16.7122 13.7206 13.7275 16.7054 10.0456 16.7054C6.36367 16.7054 3.37891 13.7206 3.37891 10.0387C3.37891 6.35684 6.36367 3.37207 10.0456 3.37207C13.7275 3.37207 16.7122 6.35684 16.7122 10.0387Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Surah"
              className="w-full bg-transparent font-light text-qm-text outline-none placeholder:text-qm-muted"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pb-4 scrollbar-thin">
          {filtered.map((surah) => {
            const num = parseInt(surah.index, 10);
            const isActive = currentId === num;
            const meaning = SURAH_MEANINGS[num] ?? surah.type;

            return (
              <div key={surah.index} className="block pb-2 px-[26px]">
                <Link
                  href={`/surahs/${num}`}
                  onClick={() => dispatch(closeSurahSidebar())}
                  className={`group/card flex h-[76px] w-full cursor-pointer select-none items-center justify-between gap-5 rounded-md border px-4 transition-colors hover:bg-qm-green/[0.07] ${
                    isActive
                      ? "border-qm-green/30 bg-qm-green/[0.07]"
                      : "border-qm-border"
                  }`}
                >
                  <div
                    className={`flex size-8 min-h-8 min-w-8 rotate-45 items-center justify-center rounded-[6px] transition-colors ${
                      isActive
                        ? "bg-qm-green"
                        : "bg-qm-card group-hover/card:bg-qm-green"
                    }`}
                  >
                    <span
                      className={`-rotate-45 text-[11px] font-medium transition-colors ${
                        isActive
                          ? "text-qm-fg"
                          : "text-qm-muted group-hover/card:text-qm-fg"
                      }`}
                    >
                      {num}
                    </span>
                  </div>

                  <div className="flex-grow text-start">
                    <p className="line-clamp-1 break-all text-sm font-medium text-qm-text">
                      {surah.title}
                    </p>
                    <p className="line-clamp-1 break-all text-xs font-normal text-qm-muted">
                      {meaning}
                    </p>
                  </div>

                </Link>
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}

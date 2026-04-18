"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { hydrate } from "@/store/settingsSlice";

interface Verse {
  key: string;
  number: number;
  arabic: string;
  translation: string;
}

export default function AyahList({ verses }: { verses: Verse[] }) {
  const dispatch = useAppDispatch();
  const { arabicFontSize, translationFontSize, arabicFontFamily, showTranslation } =
    useAppSelector((s) => s.settings);

  useEffect(() => {
    dispatch(hydrate());
  }, [dispatch]);

  return (
    <div className="space-y-4">
      {verses.map((v) => (
        <div
          key={v.key}
          className="rounded-xl border border-dark-border bg-dark-card p-5 transition-colors hover:border-emerald-500/50"
        >
          {/* Verse number badge */}
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600/20 text-xs font-bold text-emerald-400">
              {v.number}
            </span>
          </div>

          {/* Arabic text */}
          <p
            className="leading-loose text-gray-100"
            dir="rtl"
            style={{
              fontFamily: `"${arabicFontFamily}", serif`,
              fontSize: `${arabicFontSize}px`,
              lineHeight: 2,
            }}
          >
            {v.arabic}
          </p>

          {/* Translation */}
          {showTranslation && v.translation && (
            <p
              className="mt-3 border-t border-dark-border pt-3 text-gray-400"
              style={{ fontSize: `${translationFontSize}px` }}
            >
              {v.translation}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

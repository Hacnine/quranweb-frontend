import Link from "next/link";
import type { Surah } from "@/lib/types";

export default function SurahCard({ surah }: { surah: Surah }) {
  const num = parseInt(surah.index, 10);

  return (
    <Link href={`/surahs/${num}`}>
      <div className="group flex items-center gap-4 rounded-xl border border-dark-border bg-dark-card p-4 transition-all hover:border-emerald-500/50 hover:shadow-md hover:shadow-emerald-900/20">
        {/* Number badge */}
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-600/20 text-sm font-bold text-emerald-400 group-hover:bg-emerald-600/30">
          {num}
        </div>

        {/* Info */}
        <div className="flex flex-1 items-center justify-between min-w-0">
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-100 truncate">
              {surah.title}
            </h3>
            <p className="text-xs text-gray-400">
              {surah.type} · {surah.count} Ayahs
            </p>
          </div>
          <div className="text-right flex-shrink-0 ml-3">
            <p className="font-arabic text-xl text-gray-300" dir="rtl">
              {surah.titleAr}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

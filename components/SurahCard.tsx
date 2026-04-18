import Link from "next/link";
import type { Surah } from "@/lib/types";

export default function SurahCard({ surah }: { surah: Surah }) {
  const num = parseInt(surah.index, 10);

  return (
    <Link href={`/surahs/${num}`}>
      <div className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-emerald-300 hover:shadow-md">
        {/* Number badge */}
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-sm font-bold text-emerald-700 group-hover:bg-emerald-100">
          {num}
        </div>

        {/* Info */}
        <div className="flex flex-1 items-center justify-between min-w-0">
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-800 truncate">
              {surah.title}
            </h3>
            <p className="text-xs text-gray-500">
              {surah.type} · {surah.count} Ayahs
            </p>
          </div>
          <div className="text-right flex-shrink-0 ml-3">
            <p className="font-arabic text-xl text-gray-700" dir="rtl">
              {surah.titleAr}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

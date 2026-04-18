import { getSurahs } from "@/lib/api";
import SurahCard from "@/components/SurahCard";
import Link from "next/link";

export default async function Home() {
  const surahs = await getSurahs();

  return (
    <main className="mx-auto max-w-4xl px-4 py-6">
      {/* Hero */}
      <section className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
          The Holy Quran
        </h1>
        <p className="mt-2 text-gray-500">
          Read, explore, and search the 114 Surahs of the Quran
        </p>
        <Link
          href="/search"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-5 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Search Ayahs
        </Link>
      </section>

      {/* Surah Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {surahs.map((surah) => (
          <SurahCard key={surah.index} surah={surah} />
        ))}
      </div>
    </main>
  );
}

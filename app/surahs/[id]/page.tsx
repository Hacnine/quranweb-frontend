import { getSurahs, getSurahDetail, getTranslation } from "@/lib/api";
import AyahList from "./AyahList";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const surahs = await getSurahs();
  return surahs.map((s) => ({ id: String(parseInt(s.index, 10)) }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const surah = await getSurahDetail(id);
  return { title: `${surah.name} | QuranWeb` };
}

export default async function SurahPage({ params }: PageProps) {
  const { id } = await params;
  const [surah, translation] = await Promise.all([
    getSurahDetail(id),
    getTranslation(id, "en"),
  ]);

  const surahNumber = parseInt(surah.index, 10);

  // Build verse array
  const verses = Object.entries(surah.verse).map(([key, arabic]) => ({
    key,
    number: parseInt(key.replace("verse_", ""), 10),
    arabic,
    translation: translation.verse[key] ?? "",
  }));

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      {/* Surah Header */}
      <div className="mb-6 rounded-xl bg-gradient-to-br from-slate-900 to-emerald-9500 p-6 text-center text-white shadow-lg">
        <p className="text-sm font-medium opacity-80">Surah {surahNumber}</p>
        <h1 className="mt-1 text-3xl font-bold">{surah.name}</h1>
        <p className="mt-1 text-sm opacity-80">
          {surah.count} Ayahs
        </p>
      </div>

      {/* Bismillah (except for Surah 1 and 9) */}
      {surahNumber !== 1 && surahNumber !== 9 && (
        <p
          className="mb-6 text-center font-arabic text-2xl text-gray-300"
          dir="rtl"
        >
          بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </p>
      )}

      <AyahList verses={verses} />
    </main>
  );
}

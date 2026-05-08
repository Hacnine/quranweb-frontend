import { getSurahs, getSurahDetail, getTranslation } from "@/lib/api";
import SurahSidebar from "@/components/SurahSidebar";
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
  const [surahs, surah, translation] = await Promise.all([
    getSurahs(),
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
    <div className="flex h-[calc(100vh-60px)] w-full overflow-hidden">
      {/* Surah list sidebar */}
      <SurahSidebar surahs={surahs} currentId={surahNumber} />

      {/* Main reader area — offset by surah sidebar width (300px) on desktop */}
      <main className="flex-1 overflow-y-auto lg:ml-[300px]">
        {/* Surah header — matches reference design */}
        {(() => {
          const surahMeta = surahs.find((s) => parseInt(s.index, 10) === surahNumber);
          const place = surahMeta?.place === "Mecca" ? "Makkah" : surahMeta?.place === "Medina" ? "Madinah" : surahMeta?.place ?? "";
          return (
            <div className="grid grid-cols-1 items-center px-[--padding-x] py-5 [--padding-x:15px] tablet:[--padding-x:24px] max-tablet:gap-y-6 tablet:grid-cols-3">
              {/* Makkah image — left column, hidden on mobile */}
              <div className="w-[140px] max-tablet:hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/makkah.png"
                  alt="makkah"
                  width={376}
                  height={254}
                  className="w-full object-contain opacity-80"
                />
              </div>

              {/* Surah info — center column */}
              <div className="space-y-2 text-center">
                <h1 className="text-lg font-semibold tablet:text-xl">
                  Surah {surah.name}
                </h1>
                <p className="text-sm capitalize text-qm-muted tablet:text-base">
                  Ayah-{surah.count}, {place}
                </p>
              </div>
            </div>
          );
        })()}

        {/* Bismillah (except Surah 1 and 9) */}
        {surahNumber !== 1 && surahNumber !== 9 && (
          <p
            className="border-b border-qm-border py-6 text-center text-2xl text-qm-text/70"
            dir="rtl"
            style={{ fontFamily: "Amiri, serif", fontSize: "28px" }}
          >
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
        )}

        {/* Ayah list */}
        <AyahList surahId={surahNumber} verses={verses} />
      </main>
    </div>
  );
}


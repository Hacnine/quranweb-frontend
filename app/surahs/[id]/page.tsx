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
    <div className="flex h-full w-full overflow-hidden">
      {/* Surah list sidebar */}
      <SurahSidebar surahs={surahs} currentId={surahNumber} />

      {/* Main reader area — shifted right of surah sidebar on desktop */}
      <main className="flex-1 overflow-y-auto lg:ml-72">
        {/* Surah header — matches reference design */}
        {(() => {
          const surahMeta = surahs.find((s) => parseInt(s.index, 10) === surahNumber);
          const place = surahMeta?.place === "Mecca" ? "Makkah" : surahMeta?.place === "Medina" ? "Madinah" : surahMeta?.place ?? "";
          return (
            <div className="flex items-center gap-6 border-b border-qm-border bg-qm-bg px-6 py-6">
              {/* Mosque illustration */}
              <div className="hidden shrink-0 sm:block">
                <div className="overflow-hidden rounded-xl border border-qm-border" style={{ width: 120, height: 80 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/mosque.svg"
                    alt="Mosque"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Surah info */}
              <div className="flex-1 text-center">
                <h1 className="text-2xl font-bold text-qm-text">
                  Surah {surah.name}
                </h1>
                <p
                  className="mt-1 text-xl text-qm-text/70"
                  dir="rtl"
                  style={{ fontFamily: "Amiri, serif" }}
                >
                  {surahMeta?.titleAr ?? ""}
                </p>
                <p className="mt-1 text-sm text-qm-muted">
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


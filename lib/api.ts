import type { Surah, Ayah, Translation } from "@quranweb/shared";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

export const getSurahs = (): Promise<Surah[]> =>
  apiFetch<Surah[]>("/api/surahs");

export const getSurah = (id: string | number): Promise<Surah> =>
  apiFetch<Surah>(`/api/surahs/${id}`);

export const getAyahs = (surahId: string | number): Promise<Ayah[]> =>
  apiFetch<Ayah[]>(`/api/ayahs/${surahId}`);

export const getTranslation = (
  surahId: string | number,
  lang = "en"
): Promise<Translation[]> =>
  apiFetch<Translation[]>(`/api/ayahs/${surahId}/translation/${lang}`);

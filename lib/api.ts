import type { Surah, SurahDetail, TranslationData, SearchResponse } from "./types";

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

export const getSurahDetail = (id: string | number): Promise<SurahDetail> =>
  apiFetch<SurahDetail>(`/api/surahs/${id}`);

export const getAyahs = (surahId: string | number): Promise<SurahDetail> =>
  apiFetch<SurahDetail>(`/api/ayahs/${surahId}`);

export const getTranslation = (
  surahId: string | number,
  lang = "en"
): Promise<TranslationData> =>
  apiFetch<TranslationData>(`/api/ayahs/${surahId}/translation/${lang}`);

export async function searchAyahs(
  query: string,
  lang = "en"
): Promise<SearchResponse> {
  const res = await fetch(
    `${API_BASE_URL}/api/search?q=${encodeURIComponent(query)}&lang=${lang}`
  );
  if (!res.ok) throw new Error(`Search error ${res.status}`);
  return res.json() as Promise<SearchResponse>;
}

export interface Surah {
  place: string;
  type: string;
  count: number;
  title: string;
  titleAr: string;
  index: string;
  pages: string;
  juz: Array<{
    index: string;
    verse: { start: string; end: string };
  }>;
}

export interface SurahDetail {
  index: string;
  name: string;
  verse: Record<string, string>;
  count: number;
  juz: Array<{
    index: string;
    verse: { start: string; end: string };
  }>;
}

export interface TranslationData {
  name: string;
  index: string;
  verse: Record<string, string>;
  count: number;
}

export interface SearchResult {
  surahIndex: string;
  surahName: string;
  verseKey: string;
  verseNumber: number;
  text: string;
  arabic: string;
}

export interface SearchResponse {
  results: SearchResult[];
  query: string;
}

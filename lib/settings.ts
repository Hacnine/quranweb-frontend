export interface Settings {
  arabicFontSize: number;
  translationFontSize: number;
  arabicFontFamily: string;
  showTranslation: boolean;
  translationLang: string;
}

export type ArabicFontCategory = "Uthmani" | "Indopak";

export interface ArabicFontOption {
  label: string;
  value: string;
  category: ArabicFontCategory;
}

export const ARABIC_FONTS: ArabicFontOption[] = [
  { label: "KFGQ", value: "KFGQ", category: "Uthmani" },
  { label: "KFGQ V2", value: "KFGQ V2", category: "Uthmani" },
  { label: "Me Quran", value: "Me Quran", category: "Uthmani" },
  { label: "Al Mushaf", value: "Al Mushaf", category: "Uthmani" },
  { label: "PDMS Saleem Quran", value: "PDMS Saleem Quran", category: "Uthmani" },
  { label: "PDMS Islamic", value: "PDMS Islamic", category: "Uthmani" },
  { label: "Al Qalam Quran Majeed", value: "Al Qalam Quran Majeed", category: "Uthmani" },
  { label: "Amiri Quran", value: "Amiri Quran", category: "Uthmani" },
  { label: "Noor E Huda", value: "Noor E Huda", category: "Indopak" },
  { label: "Noor E Hedayet", value: "Noor E Hedayet", category: "Indopak" },
  { label: "Noor E Hira", value: "Noor E Hira", category: "Indopak" },
];

export const DEFAULT_SETTINGS: Settings = {
  arabicFontSize: 28,
  translationFontSize: 16,
  arabicFontFamily: "Amiri",
  showTranslation: true,
  translationLang: "en",
};

const SETTINGS_KEY = "quranweb_settings";

export const loadSettings = (): Settings => {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored
      ? { ...DEFAULT_SETTINGS, ...(JSON.parse(stored) as Partial<Settings>) }
      : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const saveSettings = (settings: Partial<Settings>): void => {
  if (typeof window === "undefined") return;
  const current = loadSettings();
  localStorage.setItem(
    SETTINGS_KEY,
    JSON.stringify({ ...current, ...settings })
  );
};

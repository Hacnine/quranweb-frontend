export interface Settings {
  arabicFontSize: number;
  translationFontSize: number;
  arabicFontFamily: string;
  showTranslation: boolean;
  translationLang: string;
  showByWords: boolean;
  tajweed: boolean;
}

export interface ArabicFont {
  label: string;
  value: string;
  script?: "Uthmani" | "Indopak";
}

export const ARABIC_FONTS: ArabicFont[] = [
  { label: "KFGQ", value: "KFGQ", script: "Uthmani" },
  { label: "KFGQ V2", value: "KFGQ V2", script: "Uthmani" },
  { label: "Me Quran", value: "Me Quran" },
  { label: "Al Mushaf", value: "Al Mushaf" },
  { label: "PDMS Saleem Quran", value: "PDMS Saleem Quran", script: "Indopak" },
  { label: "PDMS Islamic", value: "PDMS Islamic" },
  { label: "Al Qalam Quran Majeed", value: "Al Qalam Quran Majeed" },
  { label: "Amiri Quran", value: "Amiri Quran" },
  { label: "Noor E Huda", value: "Noor E Huda", script: "Indopak" },
  { label: "Noor E Hedayet", value: "Noor E Hedayet", script: "Indopak" },
  { label: "Noor E Hira", value: "Noor E Hira", script: "Indopak" },
  { label: "Amiri", value: "Amiri" },
  { label: "Scheherazade New", value: "Scheherazade New" },
  { label: "Noto Naskh Arabic", value: "Noto Naskh Arabic" },
];

export const DEFAULT_SETTINGS: Settings = {
  arabicFontSize: 28,
  translationFontSize: 16,
  arabicFontFamily: "Amiri Quran",
  showTranslation: true,
  translationLang: "en",
  showByWords: false,
  tajweed: false,
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

export interface Settings {
  arabicFontSize: number;
  translationFontSize: number;
  arabicFontFamily: string;
  showTranslation: boolean;
  translationLang: string;
}

export const ARABIC_FONTS = [
  { label: "Amiri", value: "Amiri" },
  { label: "Scheherazade New", value: "Scheherazade New" },
  { label: "Noto Naskh Arabic", value: "Noto Naskh Arabic" },
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

export interface Settings {
  fontSize: number;
  fontFamily: string;
  showTranslation: boolean;
  translationLang: string;
  theme: "light" | "dark";
}

export const DEFAULT_SETTINGS: Settings = {
  fontSize: 24,
  fontFamily: "Amiri",
  showTranslation: true,
  translationLang: "en",
  theme: "light",
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

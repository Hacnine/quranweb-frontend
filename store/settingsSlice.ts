import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Settings,
  DEFAULT_SETTINGS,
  loadSettings,
  saveSettings,
} from "@/lib/settings";

interface SettingsState extends Settings {
  sidebarOpen: boolean;
  surahSidebarOpen: boolean;
  activeTab: "translation" | "reading";
  fontFaceScreenOpen: boolean;
  fontVariant: "Uthmani" | "Indopak";
}

const initialState: SettingsState = {
  ...DEFAULT_SETTINGS,
  sidebarOpen: false,
  surahSidebarOpen: false,
  activeTab: "translation",
  fontFaceScreenOpen: false,
  fontVariant: "Uthmani",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    hydrate(state) {
      const loaded = loadSettings();
      Object.assign(state, loaded);
    },
    setArabicFontSize(state, action: PayloadAction<number>) {
      const clampedSize = Math.min(Math.max(action.payload, 18), 48);
      state.arabicFontSize = clampedSize;
      saveSettings({ arabicFontSize: clampedSize });
    },
    setTranslationFontSize(state, action: PayloadAction<number>) {
      const clampedSize = Math.min(Math.max(action.payload, 12), 28);
      state.translationFontSize = clampedSize;
      saveSettings({ translationFontSize: clampedSize });
    },
    setArabicFontFamily(state, action: PayloadAction<string>) {
      state.arabicFontFamily = action.payload;
      saveSettings({ arabicFontFamily: action.payload });
    },
    setShowTranslation(state, action: PayloadAction<boolean>) {
      state.showTranslation = action.payload;
      saveSettings({ showTranslation: action.payload });
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    closeSidebar(state) {
      state.sidebarOpen = false;
    },
    toggleSurahSidebar(state) {
      state.surahSidebarOpen = !state.surahSidebarOpen;
    },
    closeSurahSidebar(state) {
      state.surahSidebarOpen = false;
    },
    setShowByWords(state, action: PayloadAction<boolean>) {
      state.showByWords = action.payload;
      saveSettings({ showByWords: action.payload });
    },
    setTajweed(state, action: PayloadAction<boolean>) {
      state.tajweed = action.payload;
      saveSettings({ tajweed: action.payload });
    },
    setActiveTab(state, action: PayloadAction<"translation" | "reading">) {
      state.activeTab = action.payload;
    },
    toggleFontFaceScreen(state) {
      state.fontFaceScreenOpen = !state.fontFaceScreenOpen;
    },
    setFontVariant(state, action: PayloadAction<"Uthmani" | "Indopak">) {
      state.fontVariant = action.payload;
    },
  },
});

export const {
  hydrate,
  setArabicFontSize,
  setTranslationFontSize,
  setArabicFontFamily,
  setShowTranslation,
  toggleSidebar,
  closeSidebar,
  toggleSurahSidebar,
  closeSurahSidebar,
  setShowByWords,
  setTajweed,
  setActiveTab,
  toggleFontFaceScreen,
  setFontVariant,
} = settingsSlice.actions;

export default settingsSlice.reducer;

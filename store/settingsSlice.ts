import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Settings,
  DEFAULT_SETTINGS,
  loadSettings,
  saveSettings,
} from "@/lib/settings";

interface SettingsState extends Settings {
  sidebarOpen: boolean;
}

const initialState: SettingsState = {
  ...DEFAULT_SETTINGS,
  sidebarOpen: false,
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
} = settingsSlice.actions;

export default settingsSlice.reducer;

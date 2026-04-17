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
      state.arabicFontSize = action.payload;
      saveSettings({ arabicFontSize: action.payload });
    },
    setTranslationFontSize(state, action: PayloadAction<number>) {
      state.translationFontSize = action.payload;
      saveSettings({ translationFontSize: action.payload });
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

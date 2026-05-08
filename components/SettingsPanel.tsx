"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  closeSidebar,
  setArabicFontSize,
  setTranslationFontSize,
  setArabicFontFamily,
  setShowTranslation,
  setActiveTab,
  toggleFontFaceScreen,
  setFontVariant,
  setShowByWords,
  setTajweed,
} from "@/store/settingsSlice";
import { ARABIC_FONTS } from "@/lib/settings";

const TRANSLATIONS = [
  { label: "Saheeh International", value: "en" },
  { label: "Bengali", value: "bn" },
  { label: "Urdu", value: "ur" },
  { label: "Indonesian", value: "id" },
];

export default function SettingsPanel() {
  const dispatch = useAppDispatch();
  const {
    sidebarOpen,
    arabicFontSize,
    translationFontSize,
    arabicFontFamily,
    showTranslation,
    activeTab,
    fontFaceScreenOpen,
    fontVariant,
    showByWords,
    tajweed,
  } = useAppSelector((s) => s.settings);

  const [expandedSections, setExpandedSections] = useState({
    readingSettings: true,
    fontSettings: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const fontsForVariant = ARABIC_FONTS.filter(
    (f) => !f.script || f.script === fontVariant
  );

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed bottom-0 left-0 right-0 top-[60px] z-40 bg-black/40 transition-opacity"
          onClick={() => dispatch(closeSidebar())}
        />
      )}

      <aside
        className={`fixed bottom-0 right-0 top-[60px] z-50 w-80 max-w-[85vw] transform bg-qm-sidebar shadow-2xl transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-qm-border px-5 py-4">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-qm-green" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-100">Settings</h2>
          </div>
          <button
            onClick={() => dispatch(closeSidebar())}
            className="rounded-full p-1 hover:bg-white/10 transition-colors"
            aria-label="Close settings"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-0 overflow-y-auto" style={{ height: "calc(100% - 65px)" }}>
          {!fontFaceScreenOpen ? (
            <>
              <div className="border-b border-qm-border px-5 py-3 flex gap-4">
                <button
                  onClick={() => dispatch(setActiveTab("translation"))}
                  className={`pb-2 transition-colors ${
                    activeTab === "translation"
                      ? "border-b-2 border-qm-green text-white"
                      : "border-b-2 border-transparent text-qm-muted"
                  }`}
                >
                  Translation
                </button>
                <button
                  onClick={() => dispatch(setActiveTab("reading"))}
                  className={`pb-2 transition-colors ${
                    activeTab === "reading"
                      ? "border-b-2 border-qm-green text-white"
                      : "border-b-2 border-transparent text-qm-muted"
                  }`}
                >
                  Reading
                </button>
              </div>

              {activeTab === "translation" ? (
                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-qm-text mb-3">Translations</h3>
                    <div className="space-y-2">
                      {TRANSLATIONS.map((t) => (
                        <button
                          key={t.value}
                          className="w-full text-left px-4 py-2 rounded-lg hover:bg-qm-bg transition-colors flex items-center justify-between"
                        >
                          <span className="text-sm text-qm-text">{t.label}</span>
                          <svg className="h-5 w-5 text-qm-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-qm-text mb-3">Word-by-word translations</h3>
                    <div className="space-y-2">
                      <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-qm-bg transition-colors flex items-center justify-between">
                        <span className="text-sm text-qm-text">Bengali</span>
                        <svg className="h-5 w-5 text-qm-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-5 space-y-3">
                  <div>
                    <button
                      onClick={() => toggleSection("readingSettings")}
                      className="w-full flex items-center justify-between px-3 py-2 hover:bg-qm-bg/50 rounded transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <svg className="h-5 w-5 text-qm-green" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.3-1.54c-.3-.36-.77-.57-1.25-.57-.99 0-1.66.93-1.3 1.8l2.55 3.13c.35.43.88.68 1.44.68.56 0 1.09-.25 1.44-.68l3.98-5.1c.35-.45.07-1.12-.57-1.12-.68 0-1.16.62-1.44 1.14z" />
                        </svg>
                        <h3 className="text-sm font-medium text-qm-text">Reading Settings</h3>
                      </div>
                      <svg
                        className={`h-5 w-5 text-qm-muted transition-transform ${
                          expandedSections.readingSettings ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </button>

                    {expandedSections.readingSettings && (
                      <div className="mt-2 space-y-4 pl-3">
                        <div>
                          <label className="mb-2 flex items-center justify-between text-sm font-medium text-gray-300">
                            <span>Arabic Font Size</span>
                            <span className="text-qm-green font-semibold">{arabicFontSize}px</span>
                          </label>
                          <input
                            type="range"
                            min={18}
                            max={48}
                            step={2}
                            value={arabicFontSize}
                            onChange={(e) =>
                              dispatch(setArabicFontSize(Number(e.target.value)))
                            }
                            className="w-full accent-qm-green"
                          />
                        </div>

                        <div>
                          <label className="mb-2 flex items-center justify-between text-sm font-medium text-gray-300">
                            <span>Translation Font Size</span>
                            <span className="text-qm-green font-semibold">{translationFontSize}px</span>
                          </label>
                          <input
                            type="range"
                            min={12}
                            max={28}
                            step={1}
                            value={translationFontSize}
                            onChange={(e) =>
                              dispatch(setTranslationFontSize(Number(e.target.value)))
                            }
                            className="w-full accent-qm-green"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      onClick={() => toggleSection("fontSettings")}
                      className="w-full flex items-center justify-between px-3 py-2 hover:bg-qm-bg/50 rounded transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-qm-green bg-qm-green/20 rounded px-2 py-1">F</span>
                        <h3 className="text-sm font-medium text-qm-green">Font Settings</h3>
                      </div>
                      <svg
                        className={`h-5 w-5 text-qm-muted transition-transform ${
                          expandedSections.fontSettings ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </button>

                    {expandedSections.fontSettings && (
                      <div className="mt-2 space-y-3 pl-3">
                        <button
                          onClick={() => dispatch(toggleFontFaceScreen())}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-qm-bg hover:bg-qm-bg/80 transition-colors text-left"
                        >
                          <span className="text-sm text-qm-text">Arabic Font Face</span>
                          <svg className="h-5 w-5 text-qm-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>

                        <div className="px-2 py-1 bg-qm-bg/50 rounded text-xs text-qm-text">
                          <p>Current: {ARABIC_FONTS.find(f => f.value === arabicFontFamily)?.label || arabicFontFamily}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-sm font-medium text-gray-300">Show Translation</span>
                    <button
                      onClick={() => dispatch(setShowTranslation(!showTranslation))}
                      className={`relative h-6 w-11 rounded-full transition-colors ${
                        showTranslation ? "bg-qm-green" : "bg-gray-600"
                      }`}
                    >
                      <span
                        className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                          showTranslation ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-sm font-medium text-gray-300">Show by words</span>
                    <button
                      onClick={() => dispatch(setShowByWords(!showByWords))}
                      className={`relative h-6 w-11 rounded-full transition-colors ${
                        showByWords ? "bg-qm-green" : "bg-gray-600"
                      }`}
                    >
                      <span
                        className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                          showByWords ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-sm font-medium text-gray-300">Tajweed</span>
                    <button
                      onClick={() => dispatch(setTajweed(!tajweed))}
                      className={`relative h-6 w-11 rounded-full transition-colors ${
                        tajweed ? "bg-qm-green" : "bg-gray-600"
                      }`}
                    >
                      <span
                        className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                          tajweed ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="p-5 space-y-4">
              <button
                onClick={() => dispatch(toggleFontFaceScreen())}
                className="flex items-center gap-2 text-qm-green mb-4 hover:opacity-80 transition-opacity"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm font-medium">Select Font Face</span>
              </button>

              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => dispatch(setFontVariant("Uthmani"))}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    fontVariant === "Uthmani"
                      ? "bg-qm-green text-white"
                      : "bg-qm-bg text-qm-text hover:bg-qm-bg/80"
                  }`}
                >
                  Uthmani
                </button>
                <button
                  onClick={() => dispatch(setFontVariant("Indopak"))}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    fontVariant === "Indopak"
                      ? "bg-qm-green text-white"
                      : "bg-qm-bg text-qm-text hover:bg-qm-bg/80"
                  }`}
                >
                  Indopak
                </button>
              </div>

              <div className="space-y-2">
                {fontsForVariant.map((font) => (
                  <button
                    key={font.value}
                    onClick={() => {
                      dispatch(setArabicFontFamily(font.value));
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-qm-bg transition-colors text-left"
                  >
                    <span className="text-sm text-qm-text">{font.label}</span>
                    {arabicFontFamily === font.value && (
                      <svg className="h-5 w-5 text-qm-green" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

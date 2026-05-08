"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  closeSidebar,
  setArabicFontSize,
  setTranslationFontSize,
  setArabicFontFamily,
  setShowTranslation,
} from "@/store/settingsSlice";
import { ARABIC_FONTS, ArabicFontCategory } from "@/lib/settings";

const FONT_CATEGORIES: ArabicFontCategory[] = ["Uthmani", "Indopak"];

export default function SettingsPanel() {
  const dispatch = useAppDispatch();
  const {
    sidebarOpen,
    arabicFontSize,
    translationFontSize,
    arabicFontFamily,
    showTranslation,
  } = useAppSelector((s) => s.settings);
  const [activeTab, setActiveTab] = useState<"Translation" | "Reading">("Translation");
  const [fontCategory, setFontCategory] = useState<ArabicFontCategory>("Uthmani");

  const fontOptions = ARABIC_FONTS.filter((font) => font.category === fontCategory);

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
          <div>
            <h2 className="text-lg font-semibold text-gray-100">Settings</h2>
            <p className="text-xs text-qm-muted">Reading and translation controls</p>
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

        <div className="space-y-6 overflow-y-auto p-5" style={{ height: "calc(100% - 65px)" }}>
          <div className="mb-4 flex items-center gap-2 rounded-full bg-qm-sidebar px-1 py-1">
            {(["Translation", "Reading"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  activeTab === tab
                    ? "bg-qm-green text-qm-bg"
                    : "text-qm-text/70 hover:text-qm-text"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "Reading" ? (
            <>
              <div className="space-y-3 rounded-3xl border border-qm-border bg-qm-card p-4">
                <div className="flex items-center justify-between text-sm font-semibold text-qm-text">
                  <span>Reading Settings</span>
                  <span className="text-qm-muted">Font face + sizes</span>
                </div>
                <div className="rounded-3xl border border-qm-border bg-qm-sidebar p-3">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-sm font-medium text-qm-text">Font Settings</span>
                    <span className="rounded-full bg-qm-green/15 px-2 py-0.5 text-xs font-semibold text-qm-green">Arabic</span>
                  </div>
                  <div className="mb-4 flex gap-2 rounded-full bg-qm-bg p-1">
                    {FONT_CATEGORIES.map((category) => (
                      <button
                        key={category}
                        onClick={() => setFontCategory(category)}
                        className={`flex-1 rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
                          fontCategory === category
                            ? "bg-qm-green text-qm-bg"
                            : "text-qm-text/70 hover:text-qm-text"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {fontOptions.map((font) => (
                      <button
                        key={font.value}
                        onClick={() => dispatch(setArabicFontFamily(font.value))}
                        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition-all ${
                          arabicFontFamily === font.value
                            ? "border-qm-green bg-qm-green/10 text-qm-text"
                            : "border-qm-border bg-qm-sidebar text-qm-text/80 hover:border-qm-green/50 hover:bg-qm-green/5"
                        }`}
                      >
                        <span>{font.label}</span>
                        {arabicFontFamily === font.value && (
                          <span className="text-qm-green">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Arabic Font Size
                  </label>
                  <div className="flex items-center justify-between text-sm text-qm-text/80">
                    <span>Size</span>
                    <span className="text-qm-green font-semibold">{arabicFontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min={18}
                    max={48}
                    step={2}
                    value={arabicFontSize}
                    onChange={(e) =>
                      dispatch(setArabicFontSize(Number(e.target.value)))
                    }
                    className="mt-3 w-full accent-qm-green"
                  />
                  <div className="flex justify-between text-xs text-qm-muted mt-1">
                    <span>18px</span>
                    <span>48px</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4 rounded-3xl border border-qm-border bg-qm-card p-4">
                <div className="text-sm font-semibold text-qm-text">Translation Settings</div>
                <div className="flex items-center justify-between rounded-2xl border border-qm-border bg-qm-sidebar px-4 py-3">
                  <div>
                    <div className="text-sm font-medium text-qm-text">Show Translation</div>
                    <p className="text-xs text-qm-muted">Toggle translation on/off while reading.</p>
                  </div>
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
                  <div className="flex justify-between text-xs text-qm-muted mt-1">
                    <span>12px</span>
                    <span>28px</span>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="rounded-3xl border border-qm-border bg-qm-card p-4">
            <div className="text-sm font-semibold text-qm-text">Preview</div>
            <p
              className="mt-3 text-right text-qm-text"
              style={{
                fontFamily: arabicFontFamily,
                fontSize: `${arabicFontSize}px`,
                lineHeight: "1.8",
              }}
            >
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>
            {showTranslation && (
              <p
                className="mt-4 text-sm leading-7 text-qm-text/80"
                style={{ fontSize: `${translationFontSize}px` }}
              >
                In the name of Allah, the Entirely Merciful, the Especially Merciful.
              </p>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

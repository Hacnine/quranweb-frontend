"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  closeSidebar,
  setArabicFontSize,
  setTranslationFontSize,
  setArabicFontFamily,
  setShowTranslation,
} from "@/store/settingsSlice";
import { ARABIC_FONTS } from "@/lib/settings";

export default function SettingsPanel() {
  const dispatch = useAppDispatch();
  const {
    sidebarOpen,
    arabicFontSize,
    translationFontSize,
    arabicFontFamily,
    showTranslation,
  } = useAppSelector((s) => s.settings);

  return (
    <>
      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 transition-opacity"
          onClick={() => dispatch(closeSidebar())}
        />
      )}

      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-80 max-w-[85vw] transform bg-white shadow-2xl transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-lg font-semibold text-gray-800">Settings</h2>
          <button
            onClick={() => dispatch(closeSidebar())}
            className="rounded-full p-1 hover:bg-gray-100 transition-colors"
            aria-label="Close settings"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
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
          {/* Arabic Font Family */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Arabic Font
            </label>
            <select
              value={arabicFontFamily}
              onChange={(e) => dispatch(setArabicFontFamily(e.target.value))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {ARABIC_FONTS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
            <p
              className="mt-2 text-right text-gray-600"
              style={{ fontFamily: arabicFontFamily, fontSize: "20px" }}
            >
              بِسْمِ ٱللَّهِ
            </p>
          </div>

          {/* Arabic Font Size */}
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-gray-700">
              <span>Arabic Font Size</span>
              <span className="text-emerald-600 font-semibold">{arabicFontSize}px</span>
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
              className="w-full accent-emerald-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>18px</span>
              <span>48px</span>
            </div>
          </div>

          {/* Translation Font Size */}
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-gray-700">
              <span>Translation Font Size</span>
              <span className="text-emerald-600 font-semibold">{translationFontSize}px</span>
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
              className="w-full accent-emerald-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>12px</span>
              <span>28px</span>
            </div>
          </div>

          {/* Show Translation */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Show Translation
            </span>
            <button
              onClick={() => dispatch(setShowTranslation(!showTranslation))}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                showTranslation ? "bg-emerald-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  showTranslation ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

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
    fontSettings: false,
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
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2.5 px-5 py-3 border-b border-qm-border">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
              className="h-7 w-7 text-qm-green"
            >
              <path
                d="M15.3953 6.91501C14.0378 6.91501 13.4828 5.95501 14.1578 4.77751C14.5478 4.09501 14.3153 3.22501 13.6328 2.83501L12.3353 2.09251C11.7428 1.74001 10.9778 1.95001 10.6253 2.54251L10.5428 2.68501C9.86781 3.86251 8.75781 3.86251 8.07531 2.68501L7.99281 2.54251C7.65531 1.95001 6.89031 1.74001 6.29781 2.09251L5.00031 2.83501C4.31781 3.22501 4.08531 4.10251 4.47531 4.78501C5.15781 5.95501 4.60281 6.91501 3.24531 6.91501C2.46531 6.91501 1.82031 7.55251 1.82031 8.34001V9.66001C1.82031 10.44 2.45781 11.085 3.24531 11.085C4.60281 11.085 5.15781 12.045 4.47531 13.2225C4.08531 13.905 4.31781 14.775 5.00031 15.165L6.29781 15.9075C6.89031 16.26 7.65531 16.05 8.00781 15.4575L8.09031 15.315C8.76531 14.1375 9.87531 14.1375 10.5578 15.315L10.6403 15.4575C10.9928 16.05 11.7578 16.26 12.3503 15.9075L13.6478 15.165C14.3303 14.775 14.5628 13.8975 14.1728 13.2225C13.4903 12.045 14.0453 11.085 15.4028 11.085C16.1828 11.085 16.8278 10.4475 16.8278 9.66001V8.34001C16.8203 7.56001 16.1828 6.91501 15.3953 6.91501ZM9.32031 11.4375C7.97781 11.4375 6.88281 10.3425 6.88281 9.00001C6.88281 7.65751 7.97781 6.56251 9.32031 6.56251C10.6628 6.56251 11.7578 7.65751 11.7578 9.00001C11.7578 10.3425 10.6628 11.4375 9.32031 11.4375Z"
                fill="currentColor"
              ></path>
            </svg>
            <p className="py-4 text-lg font-bold text-gray-100">Settings</p>
            <button
              onClick={() => dispatch(closeSidebar())}
              className="ml-auto rounded-full p-1 hover:bg-white/10 transition-colors"
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

          {!fontFaceScreenOpen ? (
            <div className="flex w-full flex-col overflow-hidden flex-1">
              <div className="px-5 py-3">
                <div className="relative isolate flex min-h-10 items-center rounded-full border-4 border-qm-bg bg-qm-bg">
                  <button
                    onClick={() => dispatch(setActiveTab("translation"))}
                    className="z-10 h-full w-full text-sm font-semibold text-white transition-colors"
                  >
                    Translation
                  </button>
                  <button
                    onClick={() => dispatch(setActiveTab("reading"))}
                    className="z-10 h-full w-full text-sm text-qm-muted transition-colors"
                  >
                    Reading
                  </button>
                  <div
                    className="absolute h-full rounded-full bg-qm-sidebar transition-transform duration-300 ease-in-out"
                    style={{
                      width: "50%",
                      transform: `translateX(${activeTab === "reading" ? "100%" : "0%"})`,
                    }}
                  />
                </div>
              </div>

              <div className="relative h-full w-full overflow-hidden flex-1">
                <div className="flex h-full flex-col overflow-hidden">
                  <div className="relative flex h-full flex-col">
                    <div className="h-full overflow-y-auto">
                      {activeTab === "translation" ? (
                        <div className="space-y-1 pb-4">
                          <button
                            type="button"
                            className="flex flex-1 items-center py-3 font-medium transition-all group w-full px-5 hover:bg-qm-bg/30"
                          >
                            <div className="flex w-full items-center gap-4">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                className="h-5 w-5 text-qm-muted transition-all duration-200"
                              >
                                <path
                                  d="M20.1673 15.3449V4.28072C20.1673 3.18072 19.269 2.36489 18.1782 2.45655H18.1232C16.1982 2.62155 13.274 3.60239 11.6423 4.62906L11.4865 4.72989C11.2207 4.89489 10.7807 4.89489 10.5148 4.72989L10.2857 4.59239C8.65398 3.57489 5.73898 2.60322 3.81398 2.44739C2.72315 2.35572 1.83398 3.18072 1.83398 4.27155V15.3449C1.83398 16.2249 2.54898 17.0499 3.42898 17.1599L3.69482 17.1966C5.68398 17.4624 8.75482 18.4707 10.5148 19.4332L10.5515 19.4516C10.799 19.5891 11.1932 19.5891 11.4315 19.4516C13.1915 18.4799 16.2715 17.4624 18.2698 17.1966L18.5723 17.1599C19.4523 17.0499 20.1673 16.2249 20.1673 15.3449Z"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M11 5.03247V18.7825"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M7.10352 7.78247H5.04102"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M7.79102 10.5325H5.04102"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                              <p className="text-sm font-medium text-qm-text">Reading Settings</p>
                            </div>
                          </button>

                          <div className="pb-4 px-5 space-y-8">
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-qm-text">Translations</p>
                              <button className="flex min-h-10 w-full items-center justify-between rounded-sm bg-qm-bg px-4 py-2.5 text-sm text-qm-text hover:bg-qm-bg/80 transition-colors">
                                Saheeh International
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="11"
                                  viewBox="0 0 15 14"
                                  fill="none"
                                  className="-rotate-90 h-4 w-4 text-qm-muted"
                                >
                                  <path
                                    d="M11.8181 5.22095L8.01479 9.02428C7.56562 9.47345 6.83063 9.47345 6.38146 9.02428L2.57812 5.22095"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                </svg>
                              </button>
                            </div>

                            <div className="space-y-2">
                              <p className="text-sm font-medium text-qm-text">Word-by-word translations</p>
                              <button className="flex min-h-10 w-full items-center justify-between rounded-sm bg-qm-bg px-4 py-2.5 text-sm text-qm-text hover:bg-qm-bg/80 transition-colors">
                                Bengali
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="11"
                                  viewBox="0 0 15 14"
                                  fill="none"
                                  className="-rotate-90 h-4 w-4 text-qm-muted"
                                >
                                  <path
                                    d="M11.8181 5.22095L8.01479 9.02428C7.56562 9.47345 6.83063 9.47345 6.38146 9.02428L2.57812 5.22095"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                </svg>
                              </button>
                            </div>

                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-qm-text">Show by words</p>
                              <button
                                onClick={() => dispatch(setShowByWords(!showByWords))}
                                className="relative flex h-6 w-11 cursor-pointer items-center rounded-full border border-qm-border bg-qm-bg px-1 transition-colors"
                                role="switch"
                                aria-checked={showByWords}
                              >
                                <div
                                  className={`h-[18px] w-[18px] rounded-full transition-all duration-200 ease-in-out ${
                                    showByWords ? "translate-x-5 bg-qm-green" : "translate-x-0 bg-qm-green/20"
                                  }`}
                                />
                              </button>
                            </div>

                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-qm-text">Tajweed</p>
                              <button
                                onClick={() => dispatch(setTajweed(!tajweed))}
                                className="relative flex h-6 w-11 cursor-pointer items-center rounded-full border border-qm-border bg-qm-bg px-1 transition-colors"
                                role="switch"
                                aria-checked={tajweed}
                              >
                                <div
                                  className={`h-[18px] w-[18px] rounded-full transition-all duration-200 ease-in-out ${
                                    tajweed ? "translate-x-5 bg-qm-green" : "translate-x-0 bg-qm-green/20"
                                  }`}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-0">
                          <button
                            onClick={() => toggleSection("readingSettings")}
                            type="button"
                            className={`flex flex-1 items-center py-3 font-medium transition-all group w-full px-5 ${
                              expandedSections.readingSettings ? "hover:bg-qm-bg/30" : ""
                            }`}
                          >
                            <div className="flex w-full items-center gap-4">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                className={`h-5 w-5 transition-all duration-200 ${
                                  expandedSections.readingSettings
                                    ? "hidden text-qm-green"
                                    : "block text-qm-muted"
                                }`}
                              >
                                <path
                                  d="M20.1673 15.3449V4.28072C20.1673 3.18072 19.269 2.36489 18.1782 2.45655H18.1232C16.1982 2.62155 13.274 3.60239 11.6423 4.62906L11.4865 4.72989C11.2207 4.89489 10.7807 4.89489 10.5148 4.72989L10.2857 4.59239C8.65398 3.57489 5.73898 2.60322 3.81398 2.44739C2.72315 2.35572 1.83398 3.18072 1.83398 4.27155V15.3449C1.83398 16.2249 2.54898 17.0499 3.42898 17.1599L3.69482 17.1966C5.68398 17.4624 8.75482 18.4707 10.5148 19.4332L10.5515 19.4516C10.799 19.5891 11.1932 19.5891 11.4315 19.4516C13.1915 18.4799 16.2715 17.4624 18.2698 17.1966L18.5723 17.1599C19.4523 17.0499 20.1673 16.2249 20.1673 15.3449Z"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M11 5.03247V18.7825"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M7.10352 7.78247H5.04102"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M7.79102 10.5325H5.04102"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="26"
                                viewBox="0 0 26 26"
                                fill="none"
                                className={`h-5 w-5 transition-all duration-200 ${
                                  expandedSections.readingSettings
                                    ? "block text-qm-green"
                                    : "hidden"
                                }`}
                              >
                                <path
                                  d="M23.8333 5.05916V18.135C23.8333 19.175 22.9883 20.15 21.9483 20.28L21.5908 20.3233C19.2292 20.6375 15.5892 21.84 13.5092 22.9883C13.3683 23.075 13.195 23.1075 13 23.1075V5.74166C13.2058 5.74166 13.4117 5.68749 13.5742 5.58999L13.7583 5.47082C15.6867 4.25749 19.1425 3.09832 21.4175 2.90332H21.4825C22.7717 2.79499 23.8333 3.75916 23.8333 5.05916Z"
                                  fill="currentColor"
                                ></path>
                                <path
                                  opacity="0.4"
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M12.9993 5.74191V23.1077C12.8152 23.1077 12.6202 23.0752 12.4685 22.9886L12.4252 22.9669C10.3452 21.8294 6.71602 20.6377 4.36518 20.3236L4.05102 20.2802C3.01102 20.1502 2.16602 19.1752 2.16602 18.1352V5.04858C2.16602 3.75941 3.21685 2.78441 4.50602 2.89275C6.78102 3.07691 10.226 4.22525 12.1543 5.42775L12.4252 5.59025C12.5877 5.68774 12.7935 5.74191 12.9993 5.74191ZM8.39518 10.0103H5.95768C5.51352 10.0103 5.14518 9.64196 5.14518 9.19779C5.14518 8.75363 5.51352 8.38529 5.95768 8.38529H8.39518C8.83935 8.38529 9.20768 8.75363 9.20768 9.19779C9.20768 9.64196 8.83935 10.0103 8.39518 10.0103ZM5.95768 13.2603H9.20768C9.65185 13.2603 10.0202 12.892 10.0202 12.4478C10.0202 12.0036 9.65185 11.6353 9.20768 11.6353H5.95768C5.51352 11.6353 5.14518 12.0036 5.14518 12.4478C5.14518 12.892 5.51352 13.2603 5.95768 13.2603Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                              <p
                                className={`text-sm transition-all ${
                                  expandedSections.readingSettings
                                    ? "font-bold text-qm-green"
                                    : "font-medium text-qm-text"
                                }`}
                              >
                                Reading Settings
                              </p>
                            </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="11"
                              viewBox="0 0 15 14"
                              fill="none"
                              className={`h-4 w-4 shrink-0 transition-all duration-300 ease-in-out text-qm-muted ${
                                expandedSections.readingSettings ? "rotate-180" : ""
                              }`}
                            >
                              <path
                                d="M11.8181 5.22095L8.01479 9.02428C7.56562 9.47345 6.83063 9.47345 6.38146 9.02428L2.57812 5.22095"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </button>

                          {expandedSections.readingSettings && (
                            <div className="pb-4 px-5 space-y-8 py-3">
                              <div className="space-y-2">
                                <label className="flex items-center justify-between text-sm font-medium text-gray-300">
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

                              <div className="space-y-2">
                                <label className="flex items-center justify-between text-sm font-medium text-gray-300">
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

                          <button
                            onClick={() => toggleSection("fontSettings")}
                            type="button"
                            className={`flex flex-1 items-center py-3 font-medium transition-all group w-full px-5 ${
                              expandedSections.fontSettings ? "hover:bg-qm-bg/30" : ""
                            }`}
                          >
                            <div className="flex w-full items-center gap-4">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="19"
                                height="18"
                                viewBox="0 0 19 18"
                                fill="none"
                                className={`h-5 w-5 transition-all duration-200 ${
                                  expandedSections.fontSettings
                                    ? "hidden text-qm-green"
                                    : "block text-qm-muted"
                                }`}
                              >
                                <path
                                  d="M7.07031 16.5H11.5703C15.3203 16.5 16.8203 15 16.8203 11.25V6.75C16.8203 3 15.3203 1.5 11.5703 1.5H7.07031C3.32031 1.5 1.82031 3 1.82031 6.75V11.25C1.82031 15 3.32031 16.5 7.07031 16.5Z"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M5.57031 6.66749C7.93281 5.48999 10.7078 5.48999 13.0703 6.66749"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M9.32031 12.225V5.94751"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="19"
                                height="18"
                                viewBox="0 0 19 18"
                                fill="none"
                                className={`h-5 w-5 transition-all duration-200 ${
                                  expandedSections.fontSettings
                                    ? "block text-qm-green"
                                    : "hidden"
                                }`}
                              >
                                <path
                                  d="M7.07031 16.5H11.5703C15.3203 16.5 16.8203 15 16.8203 11.25V6.75C16.8203 3 15.3203 1.5 11.5703 1.5H7.07031C3.32031 1.5 1.82031 3 1.82031 6.75V11.25C1.82031 15 3.32031 16.5 7.07031 16.5Z"
                                  fill="currentColor"
                                ></path>
                                <path
                                  d="M5.57031 6.66749C7.93281 5.48999 10.7078 5.48999 13.0703 6.66749"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M9.32031 12.225V5.94751"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                              <p
                                className={`text-sm transition-all ${
                                  expandedSections.fontSettings
                                    ? "font-bold text-qm-green"
                                    : "font-medium text-qm-text"
                                }`}
                              >
                                Font Settings
                              </p>
                            </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="11"
                              viewBox="0 0 15 14"
                              fill="none"
                              className={`h-4 w-4 shrink-0 transition-all duration-300 ease-in-out text-qm-muted ${
                                expandedSections.fontSettings ? "rotate-180" : ""
                              }`}
                            >
                              <path
                                d="M11.8181 5.22095L8.01479 9.02428C7.56562 9.47345 6.83063 9.47345 6.38146 9.02428L2.57812 5.22095"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </button>

                          {expandedSections.fontSettings && (
                            <div className="pb-4 px-5 space-y-3 py-3">
                              <button
                                onClick={() => dispatch(toggleFontFaceScreen())}
                                className="flex items-center justify-between w-full min-h-10 rounded-sm bg-qm-bg px-4 py-2.5 text-sm text-qm-text hover:bg-qm-bg/80 transition-colors"
                              >
                                Arabic Font Face
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="11"
                                  viewBox="0 0 15 14"
                                  fill="none"
                                  className="-rotate-90 h-4 w-4 text-qm-muted"
                                >
                                  <path
                                    d="M11.8181 5.22095L8.01479 9.02428C7.56562 9.47345 6.83063 9.47345 6.38146 9.02428L2.57812 5.22095"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 px-5 pb-4">
                <div className="relative isolate overflow-hidden rounded-md border border-qm-green/10 bg-qm-green/10 px-3 pb-3 pt-3.5">
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-qm-text">Help spread the knowledge of Islam</p>
                    <p className="relative z-20 text-xs text-qm-muted">Your regular support helps us reach our brothers and sisters with the message of Islam.</p>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-full items-center justify-center rounded-sm bg-qm-green text-sm font-semibold text-white hover:bg-qm-green/90 transition-colors"
                      href="https://example.com/support"
                    >
                      Support Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col overflow-hidden flex-1">
              <div className="px-5 py-3">
                <button
                  onClick={() => dispatch(toggleFontFaceScreen())}
                  className="flex items-center gap-2 text-qm-green mb-4 hover:opacity-80 transition-opacity text-sm font-medium"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Select Font Face
                </button>
              </div>

              <div className="px-5 pb-3">
                <div className="relative isolate flex min-h-10 items-center rounded-full border-4 border-qm-bg bg-qm-bg">
                  <button
                    onClick={() => dispatch(setFontVariant("Uthmani"))}
                    className="z-10 h-full w-full text-sm font-semibold transition-colors"
                  >
                    Uthmani
                  </button>
                  <button
                    onClick={() => dispatch(setFontVariant("Indopak"))}
                    className="z-10 h-full w-full text-sm font-semibold transition-colors"
                  >
                    Indopak
                  </button>
                  <div
                    className="absolute h-full rounded-full bg-qm-sidebar transition-transform duration-300 ease-in-out"
                    style={{
                      width: "50%",
                      transform: `translateX(${fontVariant === "Indopak" ? "100%" : "0%"})`,
                    }}
                  />
                </div>
              </div>

              <div className="px-5 flex-1 overflow-y-auto">
                <div className="space-y-2">
                  {fontsForVariant.map((font) => (
                    <button
                      key={font.value}
                      onClick={() => {
                        dispatch(setArabicFontFamily(font.value));
                      }}
                      className="w-full flex items-center justify-between min-h-10 px-4 py-3 rounded-lg hover:bg-qm-bg transition-colors text-left text-sm text-qm-text"
                    >
                      <span>{font.label}</span>
                      {arabicFontFamily === font.value && (
                        <svg
                          className="h-5 w-5 text-qm-green"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

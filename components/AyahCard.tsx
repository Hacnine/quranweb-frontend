"use client";

import { useRef, useState } from "react";

interface Props {
  surahId: number;
  number: number;
  verseKey: string; // e.g. "1:1"
  arabic: string;
  translation: string;
  arabicFontFamily: string;
  arabicFontSize: number;
  translationFontSize: number;
  showTranslation: boolean;
}

function getAudioUrl(surahId: number, ayahNum: number): string {
  const s = String(surahId).padStart(3, "0");
  const a = String(ayahNum).padStart(3, "0");
  return `https://everyayah.com/data/Alafasy_128kbps/${s}${a}.mp3`;
}

export default function AyahCard({
  surahId,
  number,
  verseKey,
  arabic,
  translation,
  arabicFontFamily,
  arabicFontSize,
  translationFontSize,
  showTranslation,
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(getAudioUrl(surahId, number));
      audioRef.current.onended = () => setPlaying(false);
      audioRef.current.onpause = () => setPlaying(false);
      audioRef.current.oncanplay = () => setLoading(false);
      audioRef.current.onwaiting = () => setLoading(true);
    }

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      setLoading(true);
      audioRef.current
        .play()
        .then(() => {
          setPlaying(true);
          setLoading(false);
        })
        .catch(() => {
          setPlaying(false);
          setLoading(false);
        });
    }
  };

  return (
    <div
      id={`ayah-${verseKey}`}
      className="border-b border-qm-border px-6 py-5 transition-colors hover:bg-white/[0.02]"
    >
      {/* Verse key */}
      <p className="mb-3 text-sm font-semibold text-qm-green">{verseKey}</p>

      <div className="flex gap-5">
        {/* Action column — matches reference site */}
        <div className="flex shrink-0 flex-col items-center gap-3 pt-1">
          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            className={`flex h-7 w-7 items-center justify-center rounded transition-colors ${
              playing ? "text-qm-green" : "text-qm-muted hover:text-qm-green"
            }`}
            title={playing ? "Pause" : "Play"}
          >
            {loading ? (
              <span className="block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : playing ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Open book / Reading */}
          <button
            className="flex h-7 w-7 items-center justify-center rounded text-qm-muted transition-colors hover:text-qm-green"
            title="Read"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </button>

          {/* Bookmark */}
          <button
            className="flex h-7 w-7 items-center justify-center rounded text-qm-muted transition-colors hover:text-qm-green"
            title="Bookmark"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
          </button>

          {/* More options */}
          <button
            className="flex h-7 w-7 items-center justify-center rounded text-qm-muted transition-colors hover:text-qm-green"
            title="More options"
            onClick={() => {
              navigator.clipboard
                ?.writeText(`${verseKey}: ${arabic}\n${translation}`)
                .catch(() => {});
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="5" cy="12" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="19" cy="12" r="1.5" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Arabic text */}
          <p
            className="text-right leading-loose text-qm-text"
            dir="rtl"
            style={{
              fontFamily: `"${arabicFontFamily}", serif`,
              fontSize: `${arabicFontSize}px`,
              lineHeight: 2.2,
            }}
          >
            {arabic}
          </p>

          {/* Translation */}
          {showTranslation && translation && (
            <div className="mt-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-qm-muted">
                Saheeh International
              </p>
              <p
                className="text-qm-text/80 leading-relaxed"
                style={{ fontSize: `${translationFontSize}px` }}
              >
                {translation}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

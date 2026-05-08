"use client";

import { useRef, useState } from "react";

interface Props {
  surahId: number;
  number: number;
  verseKey: string;
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

function ActionBtn({
  onClick,
  title,
  children,
}: {
  onClick?: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={title}
      className="group flex size-[34px] min-w-[34px] cursor-pointer items-center justify-center rounded-full bg-transparent text-qm-icon transition-all active:scale-90 hover:bg-qm-green/10 [&>svg]:size-[18px]"
    >
      {children}
    </button>
  );
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
        .then(() => { setPlaying(true); setLoading(false); })
        .catch(() => { setPlaying(false); setLoading(false); });
    }
  };

  return (
    <div
      id={`ayah-card-${verseKey}`}
      className="overflow-hidden border-b border-qm-border py-6 transition-colors duration-200 relative px-[--padding-x] [--padding-x:15px] tablet:[--padding-x:24px]"
    >
      {/* Verse key + mobile more button */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-qm-green pl-0 tablet:pl-2">
          {verseKey}
        </p>
        {/* Mobile-only more button */}
        <div className="tablet:hidden">
          <ActionBtn title="More options">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0"/>
            </svg>
          </ActionBtn>
        </div>
      </div>

      {/* Content grid: actions | arabic + translation */}
      <div className="grid grid-cols-1 gap-7 pt-3 tablet:grid-cols-[auto_1fr]">
        {/* Action column — desktop only */}
        <div className="hidden flex-col items-center gap-2 tablet:flex">
          {/* Play / Pause */}
          <ActionBtn title={playing ? "Pause" : "Play"} onClick={togglePlay}>
            {loading ? (
              <span className="block h-[18px] w-[18px] animate-spin rounded-full border-2 border-qm-icon border-t-transparent" />
            ) : playing ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-qm-green">
                <rect x="3" y="3" width="4" height="12" rx="1" fill="currentColor"/>
                <rect x="11" y="3" width="4" height="12" rx="1" fill="currentColor"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-qm-icon">
                <path d="M3 9.00004V6.33004C3 3.01504 5.3475 1.65754 8.22 3.31504L10.5375 4.65004L12.855 5.98504C15.7275 7.64254 15.7275 10.3575 12.855 12.015L10.5375 13.35L8.22 14.685C5.3475 16.3425 3 14.985 3 11.67V9.00004Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </ActionBtn>

          {/* Open book / Read */}
          <ActionBtn title="Read">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-qm-icon">
              <path d="M20.1673 15.3449V4.28072C20.1673 3.18072 19.269 2.36489 18.1782 2.45655H18.1232C16.1982 2.62155 13.274 3.60239 11.6423 4.62906L11.4865 4.72989C11.2207 4.89489 10.7807 4.89489 10.5148 4.72989L10.2857 4.59239C8.65398 3.57489 5.73898 2.60322 3.81398 2.44739C2.72315 2.35572 1.83398 3.18072 1.83398 4.27155V15.3449C1.83398 16.2249 2.54898 17.0499 3.42898 17.1599L3.69482 17.1966C5.68398 17.4624 8.75482 18.4707 10.5148 19.4332L10.5515 19.4516C10.799 19.5891 11.1932 19.5891 11.4315 19.4516C13.1915 18.4799 16.2715 17.4624 18.2698 17.1966L18.5723 17.1599C19.4523 17.0499 20.1673 16.2249 20.1673 15.3449Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11 5.03247V18.7825" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.10352 7.78247H5.04102" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.79102 10.5325H5.04102" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </ActionBtn>

          {/* Bookmark */}
          <ActionBtn title="Bookmark">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none" className="text-qm-icon">
              <path d="M1.64453 13.7513V7.17862C1.64453 4.29211 1.64453 2.84886 2.57528 1.95214C3.50603 1.05542 5.00405 1.05542 8.00009 1.05542C10.9961 1.05542 12.4942 1.05542 13.4249 1.95214C14.3556 2.84886 14.3556 4.29211 14.3556 7.17862V13.7513C14.3556 15.5832 14.3556 16.4991 13.7417 16.827C12.5527 17.4618 10.3224 15.3437 9.26325 14.7059C8.64899 14.336 8.34186 14.151 8.00009 14.151C7.65832 14.151 7.35118 14.336 6.73692 14.7059C5.67777 15.3437 3.4475 17.4618 2.25852 16.827C1.64453 16.4991 1.64453 15.5832 1.64453 13.7513Z" stroke="currentColor" strokeWidth="1.38569" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1.64453 5.02588H14.3556" stroke="currentColor" strokeWidth="1.38569" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </ActionBtn>

          {/* More options */}
          <ActionBtn
            title="More options"
            onClick={() => {
              navigator.clipboard
                ?.writeText(`${verseKey}: ${arabic}\n${translation}`)
                .catch(() => {});
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="text-qm-icon">
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0"/>
            </svg>
          </ActionBtn>
        </div>

        {/* Arabic + translation */}
        <div>
          <p
            dir="rtl"
            className="mb-4 text-right font-arabic text-qm-text"
            style={{
              fontFamily: `"${arabicFontFamily}", serif`,
              fontSize: `${arabicFontSize}px`,
              lineHeight: `${arabicFontSize * 2}px`,
            }}
          >
            {arabic}
          </p>

          {showTranslation && translation && (
            <div className="mt-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-qm-muted">
                Saheeh International
              </p>
              <p
                className="leading-relaxed text-qm-text/80"
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


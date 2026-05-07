"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { hydrate } from "@/store/settingsSlice";
import AyahCard from "@/components/AyahCard";

interface Verse {
  key: string;
  number: number;
  arabic: string;
  translation: string;
}

interface Props {
  surahId: number;
  verses: Verse[];
}

export default function AyahList({ surahId, verses }: Props) {
  const dispatch = useAppDispatch();
  const { arabicFontSize, translationFontSize, arabicFontFamily, showTranslation } =
    useAppSelector((s) => s.settings);

  useEffect(() => {
    dispatch(hydrate());
  }, [dispatch]);

  return (
    <div>
      {verses.map((v) => (
        <AyahCard
          key={v.key}
          surahId={surahId}
          number={v.number}
          verseKey={`${surahId}:${v.number}`}
          arabic={v.arabic}
          translation={v.translation}
          arabicFontFamily={arabicFontFamily}
          arabicFontSize={arabicFontSize}
          translationFontSize={translationFontSize}
          showTranslation={showTranslation}
        />
      ))}
    </div>
  );
}


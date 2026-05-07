"use client";

import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "@/store/hooks";
import { toggleSidebar } from "@/store/settingsSlice";

export default function Header() {
  const dispatch = useAppDispatch();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-12 items-center justify-between border-b border-qm-border bg-qm-sidebar px-4">
      {/* Left: logo + site name + tagline */}
      <Link href="/surahs/1" className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-qm-green">
          <Image
            src="/Qur'an.svg"
            alt="QuranWeb"
            width={18}
            height={18}
            className="h-[18px] w-[18px] object-contain brightness-0"
          />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-bold text-qm-text">Quran Web</p>
          <p className="hidden text-[10px] text-qm-muted sm:block">
            Read, Study and Search The Quran
          </p>
        </div>
      </Link>

      {/* Right: icons + button */}
      <div className="flex items-center gap-1">
        <Link
          href="/search"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-qm-muted transition-colors hover:bg-white/10 hover:text-qm-green"
          title="Search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </Link>

        {/* Green circle indicator (matches reference) */}
        <div className="flex h-8 w-8 items-center justify-center">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-qm-green/20 ring-2 ring-qm-green">
            <div className="h-2 w-2 rounded-full bg-qm-green" />
          </div>
        </div>

        <button
          onClick={() => dispatch(toggleSidebar())}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-qm-muted transition-colors hover:bg-white/10 hover:text-qm-green"
          title="Font Settings"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        <button className="ml-1 rounded-full bg-qm-green px-4 py-1.5 text-xs font-semibold text-black transition-opacity hover:opacity-90">
          Support Us
        </button>
      </div>
    </header>
  );
}

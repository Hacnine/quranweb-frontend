"use client";

import Link from "next/link";
import { useAppDispatch } from "@/store/hooks";
import { toggleSidebar } from "@/store/settingsSlice";

export default function Header() {
  const dispatch = useAppDispatch();

  return (
    <header className="sticky top-0 z-30 bg-emerald-700 text-white shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">📖</span>
          <span className="text-xl font-bold tracking-tight">QuranWeb</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/"
            className="hidden sm:inline-block rounded px-3 py-1.5 text-sm font-medium hover:bg-emerald-600 transition-colors"
          >
            Surahs
          </Link>
          <Link
            href="/search"
            className="hidden sm:inline-block rounded px-3 py-1.5 text-sm font-medium hover:bg-emerald-600 transition-colors"
          >
            Search
          </Link>
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="rounded p-2 hover:bg-emerald-600 transition-colors"
            aria-label="Open settings"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}

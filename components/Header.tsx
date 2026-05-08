"use client";

import Link from "next/link";
import { useAppDispatch } from "@/store/hooks";
import { toggleSidebar } from "@/store/settingsSlice";

export default function Header() {
  const dispatch = useAppDispatch();

  return (
    <header className="fixed left-0 laptop:left-[60px] right-0 top-0 z-50 flex h-[60px] items-center justify-between border-b border-qm-border bg-qm-bg px-4 tablet:px-6">
      {/* Left: site name + tagline */}
      <div className="flex items-center gap-2.5">
        <Link href="/surahs/1" className="hidden items-center gap-2.5 sm:flex">
          <div className="space-y-[2px] text-left">
            <p className="mt-[2px] text-xl font-bold leading-none text-qm-text">
              Quran Web
            </p>
            <p className="w-max text-[10px] tracking-tight text-qm-muted">
              Read, Study, and Learn The Quran
            </p>
          </div>
        </Link>
        <Link href="/surahs/1" className="sm:hidden">
          <p className="text-base font-bold text-qm-text">Quran Web</p>
        </Link>
      </div>

      {/* Right: action buttons */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Search */}
        <Link
          href="/search"
          className="flex h-[34px] w-[34px] min-w-[34px] cursor-pointer items-center justify-center rounded-full bg-qm-green/10 text-qm-green transition-all active:scale-90"
          aria-label="Search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 21 21" fill="none">
            <path d="M18.3789 18.3721L14.7539 14.7471M16.7122 10.0387C16.7122 13.7206 13.7275 16.7054 10.0456 16.7054C6.36367 16.7054 3.37891 13.7206 3.37891 10.0387C3.37891 6.35684 6.36367 3.37207 10.0456 3.37207C13.7275 3.37207 16.7122 6.35684 16.7122 10.0387Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>

        {/* Globe / language indicator */}
        <button
          className="flex h-[34px] w-[34px] min-w-[34px] cursor-pointer items-center justify-center rounded-full bg-qm-green/10 text-qm-green outline-none transition-all active:scale-90"
          aria-label="Language"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
            <g fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
              <path fill="currentColor" d="M18.364 5.636A9 9 0 0 0 5.636 18.364L12 12"/>
            </g>
          </svg>
        </button>

        {/* Settings */}
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="flex h-[34px] w-[34px] min-w-[34px] cursor-pointer items-center justify-center rounded-full bg-qm-green/10 text-qm-green transition-all active:scale-90"
          aria-label="Settings"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2.25 5.25H15.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M2.25 9H15.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M2.25 12.75H15.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Support Us */}
        <a
          href="https://irdfoundation.com/sadaqa-jaria"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden h-[38px] min-w-[136px] select-none items-center justify-center gap-2 rounded-full bg-qm-green px-4 text-qm-fg transition-opacity hover:opacity-90 lg:flex"
        >
          <span className="text-sm font-medium">Support Us</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 19 18" fill="none">
            <path opacity="0.4" d="M15.2153 6.0675C15.2153 6.18 15.2153 6.29251 15.2078 6.39751C14.0603 5.97001 12.7103 6.23251 11.8103 7.04251C11.2028 6.49501 10.4153 6.18751 9.57531 6.18751C7.73031 6.18751 6.23032 7.69501 6.23032 9.55501C6.23032 11.6775 7.29532 13.23 8.31532 14.235C8.23282 14.2275 8.16532 14.2125 8.10532 14.19C6.16282 13.5225 1.82031 10.7625 1.82031 6.0675C1.82031 3.9975 3.48531 2.32501 5.54031 2.32501C6.76281 2.32501 7.84281 2.91 8.51781 3.8175C9.20031 2.91 10.2803 2.32501 11.4953 2.32501C13.5503 2.32501 15.2153 3.9975 15.2153 6.0675Z" fill="currentColor"/>
            <path d="M13.8217 7.1925C13.0192 7.1925 12.2917 7.58251 11.8417 8.18251C11.3917 7.58251 10.6717 7.1925 9.86171 7.1925C8.49671 7.1925 7.38672 8.30251 7.38672 9.68251C7.38672 10.215 7.46922 10.7025 7.61922 11.1525C8.32422 13.38 10.4917 14.7075 11.5642 15.075C11.7142 15.1275 11.9617 15.1275 12.1192 15.075C13.1917 14.7075 15.3592 13.38 16.0642 11.1525C16.2142 10.695 16.2967 10.2075 16.2967 9.68251C16.2967 8.30251 15.1867 7.1925 13.8217 7.1925Z" fill="currentColor"/>
          </svg>
        </a>
      </div>
    </header>
  );
}

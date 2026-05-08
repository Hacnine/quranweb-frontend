"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { toggleSidebar, toggleSurahSidebar } from "@/store/settingsSlice";

export default function IconSidebar() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const navItem = (
    href: string,
    title: string,
    icon: React.ReactNode
  ) => {
    const active = pathname === href || pathname.startsWith(href + "/");
    return (
      <Link
        href={href}
        className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
          active
            ? "bg-qm-green/20 text-qm-green"
            : "text-qm-muted hover:bg-white/10 hover:text-qm-green"
        }`}
        title={title}
      >
        {icon}
      </Link>
    );
  };

  return (
    <aside className="fixed bottom-0 left-0 top-12 z-40 flex w-14 flex-col items-center border-r border-qm-border bg-qm-sidebar py-3">
      {/* Logo */}
      <Link
        href="/surahs/1"
        className="mb-5 flex h-9 w-9 items-center justify-center rounded-xl"
        title="Home"
      >
        <Image
          src="/Qur'an.svg"
          alt="QuranWeb"
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
        />
      </Link>

      {/* Nav icons */}
      <nav className="flex flex-1 flex-col items-center gap-1">
        {/* Surah list toggle */}
        <button
          onClick={() => dispatch(toggleSurahSidebar())}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-qm-muted transition-colors hover:bg-white/10 hover:text-qm-green"
          title="Surah List"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
          </svg>
        </button>

        {/* Home */}
        {navItem(
          "/surahs/1",
          "Home",
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        )}

        {/* Search */}
        {navItem(
          "/search",
          "Search",
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        )}

        {/* Bookmarks */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-xl text-qm-muted transition-colors hover:bg-white/10 hover:text-qm-green"
          title="Bookmarks"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
          </svg>
        </button>
      </nav>

      {/* Settings at bottom */}
      <button
        onClick={() => dispatch(toggleSidebar())}
        className="mb-1 flex h-10 w-10 items-center justify-center rounded-xl text-qm-muted transition-colors hover:bg-white/10 hover:text-qm-green"
        title="Font Settings"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    </aside>
  );
}


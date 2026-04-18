import type { Metadata } from "next";
import { Providers } from "@/app/providers";
import Header from "@/components/Header";
import SettingsPanel from "@/components/SettingsPanel";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "QuranWeb",
  description: "Read, explore, and search the Holy Quran",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Scheherazade+New:wght@400;700&family=Noto+Naskh+Arabic:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-dark-navy text-gray-100 antialiased">
        <Providers>
          <Header />
          {children}
          <SettingsPanel />
        </Providers>
      </body>
    </html>
  );
}

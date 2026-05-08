"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import Header from "@/components/Header";
import IconSidebar from "@/components/IconSidebar";
import SettingsPanel from "@/components/SettingsPanel";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-qm-bg">
      {/* Fixed top header */}
      <Header />
      {/* Fixed left icon sidebar */}
      <IconSidebar />
      {/* Page content — padded top for header, padded left for icon sidebar on laptop+, padded bottom for bottom nav on mobile */}
      <div className="pt-[60px] laptop:pl-[60px] pb-[60px] laptop:pb-0">
        {children}
      </div>
      <SettingsPanel />
    </div>
  );
}



"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import IconSidebar from "@/components/IconSidebar";
import SettingsPanel from "@/components/SettingsPanel";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-qm-bg">
      <IconSidebar />
      {/* Main content area — pushed right of icon sidebar (w-14 = 3.5rem) */}
      <div className="flex flex-1 overflow-hidden pl-14">
        {children}
      </div>
      <SettingsPanel />
    </div>
  );
}


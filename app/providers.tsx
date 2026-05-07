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
    <div className="flex h-screen flex-col overflow-hidden bg-qm-bg">
      {/* Fixed top header — h-12 = 48px */}
      <Header />
      {/* Everything below the header */}
      <div className="flex flex-1 overflow-hidden pt-12">
        <IconSidebar />
        {/* Main content area — pushed right of icon sidebar */}
        <div className="flex flex-1 overflow-hidden pl-14">
          {children}
        </div>
      </div>
      <SettingsPanel />
    </div>
  );
}



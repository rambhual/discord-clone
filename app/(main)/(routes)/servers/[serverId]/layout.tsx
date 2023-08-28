import React, { ReactNode } from "react";
import SidebarNavigation from "@/components/side-bar/side-bar";

export default function ServerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <SidebarNavigation />
      </div>
      <main className="md:pl-[72px] h-full">{children}</main>
    </div>
  );
}

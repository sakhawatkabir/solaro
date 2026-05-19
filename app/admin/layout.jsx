"use client";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function AdminLayout({ children }) {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen bg-zinc-900">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </TooltipProvider>
  );
}

import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-6 py-10 bg-inherit">
        <Sidebar />

        <div className="flex-1 bg-inherit text-inherit">{children}</div>
      </div>
    </div>
  );
}

import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      {/* SIDEBAR FIXED */}
      <Sidebar />

      <div className="ml-[260px] pt-16">
        {/* NAVBAR */}
        <Navbar />

        {/* MAIN PAGE CONTENT */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

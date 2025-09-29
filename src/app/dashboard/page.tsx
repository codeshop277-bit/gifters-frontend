// components/FullPageSpinner.tsx
'use client';

import DashboardContents from "./dashboardContents";

// app/page.tsx (Next.js 13+ with App Router)
export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f1c52] to-[#1c2a6c] flex flex-col">

      {/* Header Section */}
      <header className="w-full bg-gradient-to-r from-[#162463] to-[#0f1c52] text-white shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg"></div>
            <span className="text-xl font-bold">Gifters</span>
          </div>


          {/* Buttons */}
          <div className="flex space-x-4">
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <DashboardContents />
      </main>
    </div>
  );
}


"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white min-h-screen p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-bold text-teal-600 mb-6">SanaMed</h1>
        <nav className="space-y-2 text-gray-700">
          <Link href="/dashboard" className="flex items-center gap-3 p-2 hover:bg-teal-50 rounded-lg">
            <span className="text-teal-500"></span> Dashboard
          </Link>
          <Link href="/patients" className="flex items-center gap-3 p-2 bg-teal-50 rounded-lg">
            <span className="text-teal-500"></span> Patients
          </Link>
          <Link href="/billing" className="flex items-center gap-3 p-2 hover:bg-teal-50 rounded-lg">
            <span className="text-teal-500"></span> Billing
          </Link>
          <Link href="/rtl" className="flex items-center gap-3 p-2 hover:bg-teal-50 rounded-lg">
            <span className="text-teal-500">🔧</span> RTL
          </Link>
          <div className="mt-4 text-teal-600 font-semibold">ACCOUNT PAGES</div>
          <Link href="/profile" className="flex items-center gap-3 p-2 hover:bg-teal-50 rounded-lg">
            <span className="text-teal-500">🧑</span> Profile
          </Link>
          <Link href="/signup" className="flex items-center gap-3 p-2 hover:bg-teal-50 rounded-lg">
            <span className="text-teal-500">🚀</span> Sign Up
          </Link>
        </nav>
      </div>
      <div className="bg-teal-100 p-4 rounded-lg text-center">
        <p className="mb-2 text-sm text-gray-600">Need help?</p>
        <button className="bg-white text-teal-600 px-3 py-1 rounded-md font-semibold text-xs">
          DOCUMENTATION
        </button>
      </div>
    </aside>
  );
}
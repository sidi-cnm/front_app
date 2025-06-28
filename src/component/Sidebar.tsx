"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4 flex flex-col justify-between fixed h-full">
      {/* Main Navigation */}
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 p-2 mb-6">
          <h1 className="text-xl font-bold text-teal-600">SanaMed</h1>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          <Link 
            href="/dashboard" 
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              pathname === '/dashboard' ? 'bg-teal-50 text-teal-600 font-medium' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="w-6 text-center">📊</span>
            Dashboard
          </Link>
          
          <Link 
            href="/patients" 
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              pathname === '/patients' ? 'bg-teal-50 text-teal-600 font-medium' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="w-6 text-center">👨‍⚕️</span>
            Patients
          </Link>

          <Link 
            href="/billing" 
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              pathname === '/billing' ? 'bg-teal-50 text-teal-600 font-medium' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="w-6 text-center">💳</span>
            Billing
          </Link>

          <Link 
            href="/rtl" 
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              pathname === '/rtl' ? 'bg-teal-50 text-teal-600 font-medium' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="w-6 text-center">🔧</span>
            RTL
          </Link>

          {/* Account Section */}
          <div className="mt-8 mb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Account Pages
          </div>

          <Link 
            href="/profile" 
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              pathname === '/profile' ? 'bg-teal-50 text-teal-600 font-medium' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="w-6 text-center">👤</span>
            Profile
          </Link>

          <Link 
            href="/signup" 
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              pathname === '/signup' ? 'bg-teal-50 text-teal-600 font-medium' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="w-6 text-center">🚀</span>
            Sign Up
          </Link>
        </nav>
      </div>

      {/* Help Section */}
      <div className="bg-teal-50 p-4 rounded-lg border border-teal-100 mb-4">
        <p className="mb-2 text-sm text-gray-600">Need help?</p>
        <button className="w-full bg-white text-teal-600 px-4 py-2 rounded-md font-medium text-sm border border-teal-200 hover:bg-teal-100 transition-colors">
          Documentation
        </button>
      </div>
    </aside>
  );
}
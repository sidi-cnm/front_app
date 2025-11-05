import React from "react";

function HeaderComponent({ pageName }: { pageName: string }) {
  return (
    <header className="bg-white px-6 py-4 border-b border-gray-200">
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-bold text-blue-800">SanaMed</h2>
          <div className="hidden sm:flex items-center text-sm text-gray-500">
            <span className="mx-2">/</span>
            <span className="text-gray-700">{pageName}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search here..."
              className="pl-10 pr-4 py-2 w-full sm:w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
            Sign in
          </button>
        </div>
      </div>
    </header>
  );
}

export default HeaderComponent;
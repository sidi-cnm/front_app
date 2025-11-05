"use client";

import React, { useState } from "react";
import SearchButton from "./SearchButton";
import { Patient } from "./PatientsTable";

function SearchBar({ initialPatients }: { initialPatients: Patient[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 outline-none">
      <div className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Karthi"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <SearchButton onClick={() => {}} />
      </div>
    </div>
  );
}

export default SearchBar;
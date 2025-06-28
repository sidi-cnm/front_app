"use client";

import React, { useState } from "react";
import SearchButton from "./SearchButton";

interface Patient {
  name: string;
  email: string;
  phone: string;
  enroll: string;
  lastVisit: string;
}

function SearchBar({ initialPatients }: { initialPatients: Patient[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState(initialPatients);

  const handleSearch = (term: string) => {
    const filteredPatients = initialPatients.filter(patient =>
      patient.name.toLowerCase().includes(term.toLowerCase())
    );
    setPatients(filteredPatients);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && handleSearch) {
      handleSearch(searchTerm);
    }
  };

  return (
    <div className="p-4 flex justify-between items-center">
      <input
        type="text"
        placeholder="Karthi"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        className="p-2 rounded w-1/2 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"      />
      <SearchButton onClick={() => handleSearch(searchTerm)} />
    </div>
  );
}

export default SearchBar;
"use client";

import React from "react";

function SearchButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Search
    </button>
  );
}

export default SearchButton;
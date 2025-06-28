import React from "react";

function HeaderComponent({ pageName }: { pageName: string }) {
  return (
    <header className="p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-semibold">SanaMed</h2>
        <span className="text-gray-600">{pageName}</span>
      </div>
      <div className="space-x-2">
        <input
          type="text"
          placeholder="Search here..."
          className="p-2 border rounded"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Sign in
        </button>
      </div>
    </header>
  );
}

export default HeaderComponent;
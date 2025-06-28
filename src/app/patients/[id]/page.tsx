import React from "react";
import { notFound } from "next/navigation";

const patients = [
  {
    id: "1",
    name: "Karthi",
    email: "karthi@gmmail.com",
  },
  {
    id: "2",
    name: "John",
    email: "john@example.com",
  },
];

export default function PatientProfile({ params }: { params: { id: string } }) {
  const patient = patients.find((p) => p.id === params.id);

  if (!patient) return notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🎨 Bandeau en-tête */}
      <div className="relative bg-teal-400 h-52 rounded-b-3xl overflow-visible z-0">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          fill="white"
          opacity="0.05"
        >
          <path d="M0,0 C600,100 600,0 1200,100 L1200,0 L0,0 Z"></path>
        </svg>

        <div className="absolute top-4 right-6 text-white text-sm">
          👤 <span className="cursor-pointer hover:underline">Sign in</span>
        </div>

        {/* 📌 Carte profil flottante */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-40px] w-[90%] max-w-5xl bg-white shadow-xl rounded-2xl px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center relative">
              <span className="text-2xl font-bold text-gray-500">{patient.name[0]}</span>
              <span className="absolute bottom-0 right-0 text-xs bg-white border border-gray-300 rounded-full p-0.5">✏️</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold">{patient.name}</h2>
              <p className="text-gray-500 text-sm">{patient.email}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="bg-gray-100 px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-200">
              OVERVIEW
            </button>
            <button className="bg-gray-100 px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-200">
              SETTING
            </button>
          </div>
        </div>
      </div>

      {/* 🧩 Section barre de recherche */}
      <div className="pt-40 px-6 max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Zone gauche */}
          <div className="flex flex-wrap items-center gap-4">
            <input
              type="text"
              placeholder="🔍 HTA"
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-60 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="text-gray-600 text-sm hover:text-black">Favorite</button>
            <button className="text-gray-600 text-sm hover:text-black">Recently added</button>
            <button className="text-gray-600 text-sm hover:text-black">All docs ⌄</button>
          </div>

          {/* Zone droite */}
          <div>
            <button className="bg-[#00022E] text-white text-sm px-5 py-2 rounded-lg shadow hover:bg-[#000244]">
              Import a doc
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

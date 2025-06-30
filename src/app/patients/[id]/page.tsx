'use client';
import React, { useState, useEffect, useRef, use } from "react";
import { notFound } from "next/navigation";

const patients = [
  { id: "1", name: "Karthi", email: "karthi@gmmail.com" },
  { id: "2", name: "John", email: "john@example.com" },
];

export default function PatientProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  console.log("🧱 Component mounted, received id:", id);

  // ✅ Fallback patient for dev/testing
  const patient = patients.find((p) => p.id === id) ?? { name: "DevUser", email: "dev@example.com" };

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetchAllDocuments();
  }, []);

  useEffect(() => {
    if (query.trim() !== "") {
      fetchResults(query);
    }
  }, [query]);

  const fetchAllDocuments = async () => {
    try {
      const res = await fetch("http://localhost:8000/documents");
      const data = await res.json();
      const enriched = data.map((doc: any) => ({
        ...doc,
        date: "19 / 01 / 2023",
        favorite: Math.random() > 0.5,
        score: Math.floor(Math.random() * 100) + 1,
      }));
      setResults(enriched);
    } catch (error) {
      console.error("Erreur récupération des documents:", error);
    }
  };

  const truncateToTwoSentences = (text: string): string => {
    const sentences = text.match(/[^.!?]+[.!?]/g);
    return sentences ? sentences.slice(0, 2).join(" ") : text;
  };

  const fetchResults = async (search: string) => {
    try {
      console.log("🔍 Searching for:", search);

      const body = {
        query: search,
        text_size: 50,
        vector_size: 50,
        final_k: 5,
        weight_text: 1.0,
        weight_vector: 1.0,
        detailed: false,
      };

      const url = `https://34.224.105.165.nip.io/hybrid_search`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error(`❌ Failed search request with status: ${res.status}`);

      const data = await res.json();
      console.log("✅ Received response data:", data);

      const enriched = (data.results || []).map((doc: any) => ({
        ...doc,
        texte_brut: truncateToTwoSentences(doc.summary || doc.texte_brut || ""),
        date: doc.date || "19 / 01 / 2023",
        favorite: Math.random() > 0.5,
        score: Math.floor(Math.random() * 100) + 1,
      }));

      console.log("🧩 Enriched results to display:", enriched);
      setResults(enriched);
    } catch (error) {
      console.error("❌ Erreur fetch recherche :", error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/extract", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      await res.json();
      setPopupMessage("✅ Document indexé avec succès !");
      await fetchAllDocuments();
    } catch (error) {
      console.error("Erreur d'indexation :", error);
      setPopupMessage("❌ Échec lors de l’indexation du document.");
    }

    setTimeout(() => setPopupMessage(null), 4000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🎨 Header */}
      <div className="relative bg-teal-400 h-52 rounded-b-3xl overflow-visible z-0">
        <svg className="absolute top-0 left-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 120" fill="white" opacity="0.05">
          <path d="M0,0 C600,100 600,0 1200,100 L1200,0 L0,0 Z"></path>
        </svg>
        <div className="absolute top-4 right-6 text-white text-sm">👤 <span className="cursor-pointer hover:underline">Sign in</span></div>
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
            <button className="bg-gray-100 px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-200">OVERVIEW</button>
            <button className="bg-gray-100 px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-200">SETTING</button>
          </div>
        </div>
      </div>

      {/* 🗂 Upload + Rechercher */}
      <div className="pt-40 px-6 max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <input
              type="text"
              value={query}
              onChange={(e) => {
                console.log("⌨️ Typing:", e.target.value);
                setQuery(e.target.value);
              }}
              placeholder="🔍 HTA"
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-60 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input type="file" accept=".pdf" onChange={handleFileUpload} ref={fileInputRef} className="hidden" />
            <button className="bg-[#00022E] text-white text-sm px-5 py-2 rounded-lg shadow hover:bg-[#000244]" onClick={() => fileInputRef.current?.click()}>
              Import a doc
            </button>
          </div>
        </div>

        {/* ✅/❌ Message popup */}
        {popupMessage && (
          <div className="mt-4 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-2 rounded shadow">{popupMessage}</div>
        )}
      </div>

      {/* 📑 Résultats affichés en cartes */}
      <div className="mt-8 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 px-6">
        {results.map((doc, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4 flex flex-col justify-between h-44">
            <p className="text-sm text-gray-700 line-clamp-3">{doc.record.texte_brut}</p>
            <div className="flex justify-between items-end mt-auto pt-4">
              <div><div className="text-xs text-gray-400">{doc.date}</div></div>
              <div className="flex flex-col items-end space-y-1">
                <div className="flex gap-2 items-center">
                  {doc.favorite ? (
                    <span className="text-yellow-400 text-lg">★</span>
                  ) : (
                    <span className="text-gray-300 text-lg">☆</span>
                  )}
                </div>
                <div className="text-xs text-blue-600 hover:underline cursor-pointer">View document</div>
                <div className="text-xs text-blue-600 hover:underline cursor-pointer">Download</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

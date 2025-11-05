"use client";

import Topbar from "@/components/Topbar";
import HeroWave from "@/components/HeroWave";
import Avatar from "@/components/Avatar";
import { docs, suggestions } from "@/lib/mock";
import { use, useMemo, useRef, useState } from "react";
import {
  Upload,
  Star,
  StarOff,
  Eye,
  LayoutDashboard,
  Settings as Cog,
} from "lucide-react";

import PatientOverview from "@/components/Overview";
import PatientSetting from "@/components/Settings";
import type { Patient } from "@/types/patient";

function Score({ v }: { v: number }) {
  const color = v >= 70 ? "bg-green-500" : v >= 40 ? "bg-orange-400" : "bg-red-500";
  return (
    <div className="mt-2">
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${v}%` }} />
      </div>
      <div className="text-xs text-gray-500 mt-1">{v}%</div>
    </div>
  );
}

type RouteParams = { id: string };

export default function PatientProfile({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  // Unwrap the new Promise-based params
  const { id } = use(params);

  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  // tabs: show nothing until user clicks
  type Tab = "overview" | "setting" | null;
  const [active, setActive] = useState<Tab>(null);

  const [showResults, setShowResults] = useState(false);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);

  // ---- mock patient (replace with API fetch) ----
  const patient: Patient = {
    id, // <-- use the unwrapped id
    name: "Karthi",
    email: "karthi@gmail.com",
    phone: "7524547760",
    enrollNumber: "1234567894577760",
    gender: "male",
    dob: "1995-03-15",
    address: "Nouakchott, Mauritania",
    lastVisit: "2023-12-08",
    allergies: ["Penicillin"],
    conditions: ["HTA"],
    meds: ["Amlodipine 5mg"],
    stats: { docs: 12, favorites: 3, lastScore: 86 },
    vitals: { height: 175, weight: 74, bmi: 24.2, bp: "120/80", hr: 72 },
  };
  // ------------------------------------------------

  const filtered = useMemo(
    () => docs.filter((d) => d.title.toLowerCase().includes(q.toLowerCase())),
    [q]
  );

  function openPicker() {
    fileRef.current?.click();
  }
  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] || null;
    setFile(f);
  }

  return (
    <main className="w-full">
      <Topbar title="Patient profile" />

      <section className="px-3 sm:px-4 lg:px-6">
        <div className="card p-0 overflow-hidden">
          {/* ===== Hero + identity overlay ===== */}
          <div className="relative">
            <HeroWave />
            <div className="absolute left-0 right-0 -bottom-8 px-3 sm:px-6">
              <div className="mx-auto w-full max-w-none sm:max-w-[92%] card px-4 py-3 sm:px-6 sm:py-4 flex items-center gap-3 sm:gap-4 relative">
                <Avatar name={patient.name} />
                <div className="min-w-0">
                  <h2
                    className="font-semibold text-xl sm:text-2xl text-[#163B5B] leading-tight truncate"
                    title={patient.name}
                  >
                    {patient.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">
                    {patient.email}
                  </p>
                </div>

                {/* ICON TABS pinned to top-right (desktop) */}
                <div className="absolute right-2 top-2 z-20 hidden sm:flex gap-2">
                  <button
                    type="button"
                    onClick={() => setActive("overview")}
                    title="Overview"
                    aria-label="Overview"
                    className={`h-9 w-9 grid place-items-center rounded-full ring-1 ring-black/10 shadow-sm 
                                backdrop-blur bg-white/90 hover:bg-blue-600 hover:text-white
                                ${active === "overview" ? "bg-blue-600 text-white" : "text-gray-700"}`}
                  >
                    <LayoutDashboard size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActive("setting")}
                    title="Settings"
                    aria-label="Settings"
                    className={`h-9 w-9 grid place-items-center rounded-full ring-1 ring-black/10 shadow-sm 
                                backdrop-blur bg-white/90 hover:bg-blue-600 hover:text-white
                                ${active === "setting" ? "bg-blue-600 text-white" : "text-gray-700"}`}
                  >
                    <Cog size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* spacer under overlay */}
          <div className="h-10 sm:h-12" />

          <div className="px-3 sm:px-6 pb-5">
            {/* ===== Search + actions ===== */}
            <div className="mt-2 flex flex-col sm:flex-row gap-2 sm:items-center">
              <div className="relative w-full sm:max-w-sm">
                <input
                  className="input"
                  placeholder="HTA"
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    setShowResults(true);
                  }}
                />
                {showResults && q && (
                  <div className="absolute z-20 mt-1 w-full rounded-xl border bg-white shadow-card">
                    {suggestions.map((s, i) => (
                      <button
                        key={i}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-soft"
                        onClick={() => {
                          setQ(s);
                          setShowResults(false);
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* hidden file input + trigger button */}
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.doc,.docx,image/*"
                hidden
                onChange={onPick}
              />
              <button
                type="button"
                onClick={() => {
                  setOpen(true);
                  openPicker();
                }}
                className="btn w-full sm:w-auto"
              >
                <Upload size={16} className="mr-2" /> Import a doc
              </button>
            </div>

            {/* ===== TAB CONTENT (Overview / Setting) ===== */}
            <div className="mt-4">
              {active === "overview" && <PatientOverview patient={patient} />}
              {active === "setting" && <PatientSetting initial={patient} />}

              {active === null && (
                <div className="text-sm text-gray-500">
                  Select <span className="font-medium">Overview</span> or{" "}
                  <span className="font-medium">Settings</span> in the top-right.
                </div>
              )}
            </div>

            {/* ===== Your existing cards / search results below (optional) ===== */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(q ? filtered : docs).map((d) => (
                <div key={d.id} className="card p-4">
                  <div className="text-sm text-gray-500">{d.date}</div>
                  <div className="font-medium mt-1 line-clamp-2">{d.title}</div>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {d.snippet}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="badge">
                      {d.recent ? "Recently added" : "Favorite"}
                    </span>
                    <div className="flex items-center gap-2">
                      {d.fav ? (
                        <Star className="text-yellow-500" size={16} />
                      ) : (
                        <StarOff size={16} className="text-gray-400" />
                      )}
                      <a
                        className="badge"
                        href={`#view-${d.id}`}
                        onClick={() => setShowResults(true)}
                      >
                        <Eye size={14} /> view
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {q && (
              <div className="mt-6">
                <h3 className="text-gray-500 text-sm mb-2">Search result</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.map((d) => (
                    <div key={d.id} className="card p-4">
                      <div className="text-sm text-gray-500">{d.date}</div>
                      <div className="mt-1">
                        <span className="text-gray-500 text-sm">
                          Les symptômes de{" "}
                        </span>
                        <span className="text-red-500 font-medium">
                          l’hypertension artérielle
                        </span>
                        <span className="text-gray-500 text-sm">
                          {" "}
                          peuvent être...
                        </span>
                      </div>
                      <Score v={d.score} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ===== Split view (kept from your original) ===== */}
        {q && filtered[0] && (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card p-4">
              <div className="text-sm text-gray-500 mb-2">Search result</div>
              {filtered.map((d) => (
                <div key={d.id} className="rounded-xl border p-3 mb-3">
                  <div className="text-sm">
                    Les symptômes de{" "}
                    <span className="text-red-500">
                      l’hypertension artérielle (HTA)
                    </span>
                    …
                  </div>
                  <Score v={d.score} />
                </div>
              ))}
            </div>
            <div className="card p-6">
              <div className="text-xl font-semibold text-blue-700 mb-2">
                exemple
              </div>
              <div className="prose max-w-none">
                <p>
                  <strong>Health technology assessment</strong> (HTA) refers to
                  the systematic evaluation of properties, effects, and/or
                  impacts of health technology…
                </p>
                <p>
                  …main purpose is to inform decision making regarding health
                  technologies…
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ===== Upload modal ===== */}
        {open && (
          <div
            className="fixed inset-0 z-50 bg-black/40 grid place-items-center p-4"
            onClick={() => setOpen(false)}
          >
            <div
              className="card w-full max-w-[460px] p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-lg font-semibold mb-4">
                Upload a document
              </div>

              {!file && (
                <div className="h-40 border-2 border-dashed rounded-xl grid place-items-center text-sm text-gray-500 mb-4">
                  Choose a file (PDF, DOC/DOCX, or image)
                </div>
              )}

              {file && (
                <div className="rounded-xl border p-3 mb-4">
                  <div className="font-medium">{file.name}</div>
                  <div className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB •{" "}
                    {file.type || "unknown"}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="badge"
                  onClick={() => {
                    setOpen(false);
                    setFile(null);
                  }}
                >
                  cancel
                </button>
                <button type="button" className="btn" onClick={openPicker}>
                  Browse
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* fallback input (also used by the modal) */}
      <input
        id="doc-input"
        ref={fileRef}
        type="file"
        accept=".pdf,.doc,.docx,image/*"
        hidden
        onChange={onPick}
      />
    </main>
  );
}

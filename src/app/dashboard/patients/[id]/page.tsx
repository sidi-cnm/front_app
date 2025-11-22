// src/app/dashboard/patients/[id]/page.tsx
"use client";

import { useState, useEffect, useRef, use as usePromise } from "react";
import Topbar from "@/components/Topbar";
import { FileText, Star, StarOff, UploadCloud } from "lucide-react";

/* ----------------- Helpers: patient meta with fallbacks -------------- */
function buildPatientMeta(p: any) {
  return {
    dob: p.dob ?? "23.07.1994",
    registrationDate: p.registrationDate ?? p.lastVisit ?? "12 May 2022",
    address: p.address ?? "Nouakchott, Mauritania",
    allergies: p.allergies ?? "None reported",
    chronicDiseases: p.chronicDiseases ?? "Hypertension",
    bloodType: p.bloodType ?? "O+",
    pastIllnesses: p.pastIllnesses ?? "COVID-19 (2022)",
  };
}

/* -------------------------- Documents panel ------------------------- */
function DocumentsPanel({ docs, patientId }: { docs: any[]; patientId: string }) {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"all" | "favorite" | "recent">("recent");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImportClick = () => fileInputRef.current?.click();

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", file.name);

    const res = await fetch(`/api/patients/${patientId}/documents`, {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    alert(result.message || "Uploaded!");

    window.location.reload();
    e.target.value = "";
  };

  const filtered = docs
    .filter((d) => d.title.toLowerCase().includes(query.trim().toLowerCase()))
    .filter((d, idx) => {
      if (tab === "favorite") return d.isFavorite;
      if (tab === "recent") return idx < 4;
      return true;
    });

  return (
    <section className="mt-8">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Documents</h2>
          <p className="text-xs text-slate-500">
            Upload and manage medical documents associated with this patient.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={handleImportClick}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-emerald-600"
          >
            <UploadCloud className="h-4 w-4" />
            Import a doc
          </button>

          {/* hidden file input */}
          <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
        </div>
      </div>

      {/* Tabs + search */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Tabs */}
        <div className="inline-flex rounded-full bg-slate-100 p-1 text-xs font-medium text-slate-500">
          <button
            type="button"
            onClick={() => setTab("favorite")}
            className={
              "rounded-full px-3 py-1 transition " +
              (tab === "favorite" ? "bg-white text-emerald-600 shadow-sm" : "hover:text-slate-700")
            }
          >
            Favorite
          </button>
          <button
            type="button"
            onClick={() => setTab("recent")}
            className={
              "rounded-full px-3 py-1 transition " +
              (tab === "recent" ? "bg-white text-emerald-600 shadow-sm" : "hover:text-slate-700")
            }
          >
            Recently added
          </button>
          <button
            type="button"
            onClick={() => setTab("all")}
            className={
              "rounded-full px-3 py-1 transition " +
              (tab === "all" ? "bg-white text-emerald-600 shadow-sm" : "hover:text-slate-700")
            }
          >
            All docs
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <input
            className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            placeholder="Search in documents…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((doc) => (
          <article
            key={doc.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:shadow-md"
          >
            <div className="flex items-start gap-2">
              <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
                <FileText className="h-4 w-4" />
              </span>
              <p className="text-xs leading-snug text-slate-700 line-clamp-4">{doc.title}</p>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
              <span>{doc.date}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => alert("TODO: open document preview")}
                  className="flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium text-slate-500 hover:bg-slate-100"
                >
                  View
                </button>
                <button
                  type="button"
                  onClick={() => alert("TODO: toggle favorite")}
                  className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-slate-100"
                >
                  {doc.isFavorite ? (
                    <Star className="h-3.5 w-3.5 text-amber-400" />
                  ) : (
                    <StarOff className="h-3.5 w-3.5 text-slate-300" />
                  )}
                </button>
              </div>
            </div>
          </article>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
            No documents match your filters.
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------------------- Page component ---------------------------- */
export default function PatientProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = usePromise(params);

  const [patient, setPatient] = useState<any>(null);
  const [docs, setDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`/api/patients/${id}`);
        if (res.status === 404) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        const { patient, documents } = await res.json();
        setPatient(patient);
        setDocs(documents || []);
      } catch (error) {
        console.error("Failed to load patient", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  if (loading) {
    return (
      <main className="w-full">
        <Topbar title="Patient Profile" />
        <div className="px-4 py-6 text-sm text-gray-500">Loading...</div>
      </main>
    );
  }

  if (notFound || !patient) {
    return (
      <main className="w-full">
        <Topbar title="Patient Profile" />
        <div className="px-4 py-6 text-sm text-red-600">Patient not found.</div>
      </main>
    );
  }

  const initials = patient.name
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const meta = buildPatientMeta(patient);

  return (
    <main className="w-full">
      <Topbar title="Patient Profile" />

      <section className="px-3 pb-8 pt-4 sm:px-4 lg:px-6">
        {/* Top 3 cards */}
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Identity card */}
          <div className="card flex flex-col items-center px-6 py-8 text-center">
            <div className="mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-emerald-50 text-3xl font-semibold text-emerald-600">
              {initials}
            </div>
            <h2 className="text-lg font-semibold text-slate-900">{patient.name}</h2>

            <p className="mt-1 text-xs text-slate-500">{patient.email}</p>
            {patient.phone && <p className="mt-1 text-xs text-slate-500">{patient.phone}</p>}

            {patient.idnum && (
              <p className="mt-4 text-xs font-medium text-slate-400">
                Enroll number: {patient.idnum}
              </p>
            )}
          </div>

          {/* General information */}
          <div className="card px-6 py-6">
            <h3 className="mb-4 text-sm font-semibold text-slate-800">General Information</h3>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-3 text-xs text-slate-600 sm:grid-cols-2">
              <div>
                <dt className="text-slate-400">Date of birth</dt>
                <dd className="font-medium">{meta.dob}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Registration date</dt>
                <dd className="font-medium">{meta.registrationDate}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-slate-400">Address</dt>
                <dd className="font-medium">{meta.address}</dd>
              </div>
            </dl>
          </div>

          {/* Anamnesis */}
          <div className="card px-6 py-6">
            <h3 className="mb-4 text-sm font-semibold text-slate-800">Anamnesis</h3>
            <dl className="grid grid-cols-1 gap-y-3 text-xs text-slate-600">
              <div>
                <dt className="text-slate-400">Allergies</dt>
                <dd className="font-medium">{meta.allergies}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Chronic diseases</dt>
                <dd className="font-medium">{meta.chronicDiseases}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Blood type</dt>
                <dd className="font-medium">{meta.bloodType}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Past illnesses</dt>
                <dd className="font-medium">{meta.pastIllnesses}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Documents section */}
        <DocumentsPanel docs={docs} patientId={id} />
      </section>
    </main>
  );
}

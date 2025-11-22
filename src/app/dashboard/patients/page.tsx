"use client";

import Topbar from "@/components/Topbar";
import Avatar from "@/components/Avatar";
import Link from "next/link";
import {
  PencilLine,
  Trash2,
  Eye,
  Mail,
  Phone,
  IdCard,
  Plus,
  Search as SearchIcon,
  Filter,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { ChangeEvent } from "react";

/* Small reusable circular icon button */
function IconButton({
  title,
  onClick,
  variant = "neutral",
  children,
}: {
  title: string;
  onClick?: () => void;
  variant?: "neutral" | "primary" | "danger";
  children: React.ReactNode;
}) {
  const base =
    "inline-flex h-8 w-8 items-center justify-center rounded-lg border transition shadow-sm";
  const styles =
    variant === "primary"
      ? "border-brand/40 bg-brand/10 text-brand hover:bg-brand/20"
      : variant === "danger"
      ? "border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100"
      : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50";
  return (
    <button type="button" title={title} onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}

/* Status pill */
function StatusPill({ value }: { value: string }) {
  const v = value?.toLowerCase();
  const map =
    v === "blocked" || v === "inactive"
      ? {
          label: value,
          cls: "bg-rose-50 text-rose-700 border-rose-200",
        }
      : {
          label: value || "Active",
          cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
        };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-medium ${map.cls}`}
    >
      {map.label}
    </span>
  );
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  // File import ref
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Fetch patients from API
  useEffect(() => {
    fetch("/api/patients")
      .then((res) => res.json())
      .then((data) => {
        setPatients(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load patients:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="w-full">
        <Topbar title="Patients" />
        <div className="px-4 py-6 text-sm text-gray-500">Loading patients...</div>
      </main>
    );
  }

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    alert(`Selected file: ${file.name}`);
    e.target.value = "";
  };

  function handleDelete(name: string) {
    if (confirm(`Delete ${name}? This action cannot be undone.`)) {
      console.log("TODO: delete", name);
    }
  }

  const filtered =
    q.trim() === ""
      ? patients
      : patients.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <main className="w-full">
      <Topbar title="Patients" />

      <section className="px-3 sm:px-4 lg:px-6">
        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 overflow-hidden">
          {/* Top green bar (search + filter) */}
          <div className="bg-brand px-4 py-4 sm:px-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                <div className="relative w-full sm:w-72">
                  <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    className="h-9 w-full rounded-lg border border-white/20 bg-white/10 pl-9 pr-3 text-xs text-white placeholder:text-white/70 outline-none focus:bg-white focus:text-gray-900 focus:placeholder:text-gray-400"
                    placeholder="Search patients..."
                  />
                </div>

                <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/15 px-3 py-2 text-xs font-medium text-white hover:bg-white/25">
                  <Filter className="h-3.5 w-3.5" />
                  Filter
                </button>
              </div>
            </div>
          </div>

          {/* Tabs + actions row */}
          <div className="border-b border-gray-100 px-4 py-3 sm:px-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href="/dashboard/patients/new"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-brand/90"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add new
                </Link>

                {/* Import button */}
                <button
                  className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                  type="button"
                  onClick={handleImportClick}
                >
                  Import patients
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  onChange={handleImportChange}
                />

                <button className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
                  Export patients (Excel)
                </button>
              </div>
            </div>
          </div>

          {/* Table section */}
          <div className="overflow-x-auto px-2 pb-4 pt-2 sm:px-4">
            <table className="min-w-[860px] w-full border-separate border-spacing-y-2 text-sm">
              <thead>
                <tr className="text-xs font-medium text-gray-500">
                  <th className="px-3 py-2 text-left">Patient</th>
                  <th className="px-3 py-2 text-left">Phone</th>
                  <th className="px-3 py-2 text-left">Enroll number</th>
                  <th className="px-3 py-2 text-left">Last visit</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-center">Operations</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((p) => {
                  const status = p.status || "Active";

                  return (
                    <tr
                      key={p.id}
                      className="rounded-xl bg-white shadow-[0_4px_12px_rgba(15,23,42,0.06)]"
                    >
                      {/* Patient + avatar + email */}
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar name={p.name} />
                          <div>
                            <Link
                              href={`/dashboard/patients/${p.id}`}
                              className="text-sm font-medium text-slate-900 hover:underline"
                            >
                              {p.name}
                            </Link>
                            <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                              <Mail className="h-3.5 w-3.5 text-gray-400" />
                              {p.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="px-3 py-3 text-gray-700">
                        <div className="flex items-center gap-2">
                          <Phone className="h-3.5 w-3.5 text-gray-400" />
                          {p.phone}
                        </div>
                      </td>

                      {/* Enroll number */}
                      <td className="px-3 py-3 text-gray-700">
                        <div className="flex items-center gap-2">
                          <IdCard className="h-3.5 w-3.5 text-gray-400" />
                          {p.idnum}
                        </div>
                      </td>

                      {/* Last visit */}
                      <td className="px-3 py-3 text-gray-700">
                        {p.lastVisit
                          ? new Date(p.lastVisit).toLocaleDateString()
                          : "-"}
                      </td>

                      {/* Status pill */}
                      <td className="px-3 py-3">
                        <StatusPill value={status} />
                      </td>

                      {/* Icons only */}
                      <td className="px-3 py-3">
                        <div className="flex justify-center gap-2">
                          <Link href={`/dashboard/patients/${p.id}`} title="View">
                            <IconButton title="View">
                              <Eye className="h-3.5 w-3.5" />
                            </IconButton>
                          </Link>
                          <IconButton
                            title="Edit"
                            variant="primary"
                            onClick={() => alert(`Edit ${p.name}`)}
                          >
                            <PencilLine className="h-3.5 w-3.5" />
                          </IconButton>
                          <IconButton
                            title="Delete"
                            variant="danger"
                            onClick={() => handleDelete(p.name)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </IconButton>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-3 py-8 text-center text-sm text-gray-500"
                    >
                      No patients found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Simple pagination mock */}
          <div className="flex items-center justify-end gap-2 border-t border-gray-100 px-4 py-3 text-xs text-gray-600 sm:px-6">
            <button className="rounded-full bg-brand px-3 py-1 text-xs font-medium text-white">
              1
            </button>
            <button className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50">
              2
            </button>
            <button className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50">
              3
            </button>
            <button className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50">
              4
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

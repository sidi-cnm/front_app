"use client";

import Topbar from "@/components/Topbar";
import Avatar from "@/components/Avatar";
import { patients } from "@/lib/mock";
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
} from "lucide-react";
import { useState } from "react";

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
    "inline-flex h-9 w-9 items-center justify-center rounded-xl border transition shadow-sm";
  const styles =
    variant === "primary"
      ? "border-brand/30 bg-brand/10 text-brand hover:bg-brand/20"
      : variant === "danger"
      ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
      : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50";
  return (
    <button type="button" title={title} onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}

export default function PatientsPage() {
  const [q, setQ] = useState("");

  function handleDelete(name: string) {
    if (confirm(`Delete ${name}? This action cannot be undone.`)) {
      // TODO: call your API to delete
      console.log("delete", name);
    }
  }

  const filtered =
    q.trim() === ""
      ? patients
      : patients.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <main className="w-full">
      <Topbar title="Patient page" />

      <section className="px-3 sm:px-4 lg:px-6">
        <div className="card p-4 sm:p-6">
          {/* Search + CTA */}
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center mb-4">
            <div className="relative w-full sm:max-w-md">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="input pl-9"
                placeholder="Search patients..."
              />
              <SearchIcon
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
            <Link href="/dashboard/patients/new" className="btn self-start sm:self-auto">
              <Plus size={16} className="mr-2" />
              New Patient
            </Link>
          </div>

          <div className="text-sm text-gray-500 mb-2">Patients Table</div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-card">
            <table className="min-w-[820px] w-full">
              <thead>
                <tr className="bg-soft text-gray-600 text-xs uppercase tracking-wide">
                  <th className="text-left px-4 py-3">#</th>
                  <th className="text-left px-4 py-3">Name</th>
                  <th className="text-left px-4 py-3">Email</th>
                  <th className="text-left px-4 py-3">Phone</th>
                  <th className="text-left px-4 py-3">Enroll number</th>
                  <th className="text-left px-4 py-3">Last Visit</th>
                  <th className="text-right px-4 py-3">Actions</th>
                </tr>
              </thead>

              <tbody className="text-sm">
                {filtered.map((p, i) => (
                  <tr
                    key={p.id}
                    className="border-t hover:bg-gray-50/70 transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-500">{i + 1}</td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={p.name} />
                        <Link
                          href={`/dashboard/patients/${p.id}`}
                          className="text-blue-700 hover:underline font-medium"
                        >
                          {p.name}
                        </Link>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail size={16} className="text-gray-400" />
                        {p.email}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone size={16} className="text-gray-400" />
                        {p.phone}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-gray-700">
                        <IdCard size={16} className="text-gray-400" />
                        {p.idnum}
                      </div>
                    </td>

                    <td className="px-4 py-3">{p.lastVisit}</td>

                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Link href={`/dashboard/patients/${p.id}`} title="View">
                          <IconButton title="View">
                            <Eye size={16} />
                          </IconButton>
                        </Link>
                        <IconButton
                          title="Edit"
                          variant="primary"
                          onClick={() => alert(`Edit ${p.name}`)}
                        >
                          <PencilLine size={16} />
                        </IconButton>
                        <IconButton
                          title="Delete"
                          variant="danger"
                          onClick={() => handleDelete(p.name)}
                        >
                          <Trash2 size={16} />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center text-gray-500">
                      No patients found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination mock (kept simple) */}
          <div className="flex items-center justify-end gap-2 text-sm text-gray-600 mt-3">
            <button className="badge">1</button>
            <button className="badge bg-white">2</button>
            <button className="badge">3</button>
            <button className="badge">4</button>
          </div>
        </div>
      </section>
    </main>
  );
}

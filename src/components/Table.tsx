// src/components/Table.tsx
"use client";

import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Image from "next/image";

export type PatientStatus = "active" | "inactive" | "blocked";

export type Patient = {
  id: number | string;
  name: string;
  email: string;
  phone: string;
  enrollNumber: string;
  lastVisit: string;
  avatar: string;
  status?: PatientStatus;
};

function StatusBadge({ status = "active" }: { status?: PatientStatus }) {
  const map: Record<PatientStatus, { label: string; cls: string }> = {
    active: {
      label: "Active",
      cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    inactive: {
      label: "Inactive",
      cls: "bg-gray-50 text-gray-600 border-gray-200",
    },
    blocked: {
      label: "Blocked",
      cls: "bg-rose-50 text-rose-700 border-rose-200",
    },
  };

  const { label, cls } = map[status];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-medium ${cls}`}
    >
      {label}
    </span>
  );
}

export default function Table({ data }: { data: Patient[] }) {
  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
      {/* Top purple bar with search + filter */}
      <div className="rounded-t-2xl bg-indigo-600 px-6 py-4 text-white">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-lg font-semibold">Patients</div>
          <div className="flex w-full items-center gap-3 md:w-auto">
            <input
              type="text"
              placeholder="Search…"
              className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm placeholder:text-indigo-100/70 outline-none focus:bg-white focus:text-gray-900 focus:placeholder:text-gray-400"
            />
            <button className="rounded-lg bg-white/15 px-4 py-2 text-xs font-medium hover:bg-white/25">
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Tabs + actions */}
      <div className="border-b border-gray-100 px-6 pb-3 pt-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
         
          <div className="flex flex-wrap items-center gap-2">
            <button className="rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700">
              Add new
            </button>
            <button className="rounded-lg border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
              Import patients
            </button>
            <button className="rounded-lg border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
              Export patients (Excel)
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto px-4 pb-4 pt-2">
        <table className="min-w-full border-separate border-spacing-y-2 text-sm">
          <thead>
            <tr className="text-xs font-medium text-gray-500">
              <th className="px-3 py-2 text-left">Patient</th>
              <th className="px-3 py-2 text-left">Phone</th>
              <th className="px-3 py-2 text-left">Enroll number</th>
              <th className="px-3 py-2 text-left">Last visit</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-center">Operations</th>
              <th className="px-3 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr
                key={p.id}
                className="rounded-xl bg-white shadow-[0_4px_10px_rgba(15,23,42,0.06)]"
              >
                {/* Patient + avatar */}
                <td className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-9 w-9 overflow-hidden rounded-full border border-gray-200">
                      <Image
                        src={p.avatar}
                        alt={p.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-900">
                        {p.name}
                      </div>
                      <div className="text-xs text-gray-500">{p.email}</div>
                    </div>
                  </div>
                </td>

                <td className="px-3 py-3 text-gray-600">{p.phone}</td>
                <td className="px-3 py-3 text-gray-600">{p.enrollNumber}</td>
                <td className="px-3 py-3 text-gray-600">{p.lastVisit}</td>

                <td className="px-3 py-3">
                  <StatusBadge status={p.status ?? "active"} />
                </td>

                {/* Icons */}
                <td className="px-3 py-3">
                  <div className="flex justify-center gap-3 text-indigo-500">
                    <button
                      type="button"
                      className="rounded-md p-1 hover:bg-indigo-50"
                    >
                      <FaRegEdit className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="rounded-md p-1 hover:bg-rose-50 hover:text-rose-500"
                    >
                      <FaRegTrashAlt className="h-4 w-4" />
                    </button>
                  </div>
                </td>

                {/* Login button */}
                <td className="px-3 py-3">
                  <div className="flex justify-center">
                    <button
                      type="button"
                      className="rounded-full bg-indigo-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-indigo-700"
                    >
                      Login
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-3 py-6 text-center text-sm text-gray-500"
                >
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

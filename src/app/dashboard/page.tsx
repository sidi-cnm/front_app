"use client";

import { useEffect, useState } from "react";
import Topbar from "@/components/Topbar";
import Avatar from "@/components/Avatar";
import {
  Users,
  CalendarDays,
  Receipt,
  FileText,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

/** Fixed formatter so UI doesn’t jump between SSR/CSR */
const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

/* ---------- Small UI Helpers ---------- */

function Badge({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "green" | "amber" | "red";
}) {
  const map: Record<string, string> = {
    default: "bg-gray-100 text-gray-700",
    green: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    red: "bg-rose-50 text-rose-600",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs ${map[tone]}`}
    >
      {children}
    </span>
  );
}

/* ---------- MAIN PAGE ---------- */

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load real dashboard data
  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard error:", err);
        setLoading(false);
      });
  }, []);

  if (loading || !data) {
    return (
      <main className="w-full">
        <Topbar title="Dashboard" />
        <div className="px-4 py-6 text-sm text-gray-500">Loading dashboard...</div>
      </main>
    );
  }

  // ✅ Convert KPI boxes to real data
  const KPIS = [
    {
      label: "Total patients",
      value: data.totalPatients,
      icon: Users,
      tone: "bg-emerald-100 text-emerald-700",
    },
    {
      label: "New this week",
      value: data.newThisWeek,
      icon: CalendarDays,
      tone: "bg-sky-100 text-sky-700",
    },
    {
      label: "Appointments today",
      value: data.appointmentsToday,
      icon: FileText,
      tone: "bg-violet-100 text-violet-700",
    },
    {
      label: "Pending bills",
      value: data.pendingBills,
      icon: Receipt,
      tone: "bg-amber-100 text-amber-700",
    },
  ];

  return (
    <main className="w-full">
      <Topbar title="Dashboard" />

      <section className="px-3 sm:px-4 lg:px-6 pb-8">
        {/* Breadcrumb + search */}
        <div className="mt-1 mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-gray-500">
            <span className="font-medium text-gray-700">Clinic</span> &gt;{" "}
            <span className="text-gray-500">Patient overview</span>
          </div>
          <div className="relative w-full sm:w-72">
            <input
              className="input w-full pl-3 pr-3 text-xs"
              placeholder="Search patients, files, appointments…"
            />
          </div>
        </div>

        {/* Reminder Banner */}
        <div className="card mb-5 flex items-start gap-3 border border-amber-100 bg-amber-50/60 px-4 py-3 text-xs text-amber-900">
          <CalendarDays className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <p>
            <span className="font-semibold">Reminder:</span>{" "}
            {data.highRiskPatients.length} high-risk patients have no upcoming appointment.
          </p>
        </div>

        {/* ✅ KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
          {KPIS.map(({ label, value, icon: Icon, tone }) => (
            <div
              key={label}
              className={`card flex items-center justify-between px-4 py-4 shadow-sm border-0 ${tone}`}
            >
              <div>
                <div className="text-xs text-gray-600/80">{label}</div>
                <div className="mt-1 text-2xl font-semibold">
                  {numberFormatter.format(value)}
                </div>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/70">
                <Icon className="h-5 w-5" />
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Main Grid */}
        <div className="grid gap-5 lg:grid-cols-3">
          {/* ✅ High-risk patients */}
          <div className="card p-4 lg:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-gray-800">
                  Priority patients &gt; Today&apos;s focus
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Highest risk patients based on status.
                </p>
              </div>
              <button className="badge flex items-center gap-1">
                View all patients <ChevronRight size={14} />
              </button>
            </div>

            <div className="space-y-3">
              {data.highRiskPatients.map((p: any) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 px-3 py-3"
                >
                  <div className="flex items-center gap-3">
                    <Avatar name={p.name} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-800">
                          {p.name}
                        </span>
                        <Badge tone="red">Risk: HIGH</Badge>
                      </div>
                      <div className="mt-0.5 text-[11px] text-gray-500">
                        Last visit:{" "}
                        {p.lastVisit
                          ? new Date(p.lastVisit).toLocaleDateString()
                          : "No record"}
                      </div>
                    </div>
                  </div>

                  <button className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-gray-200 bg-white">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              ))}

              {data.highRiskPatients.length === 0 && (
                <div className="text-xs text-gray-500 py-4 text-center">
                  No high-risk patients found.
                </div>
              )}
            </div>
          </div>

          {/* ✅ Upcoming Appointments */}
          <div className="space-y-4">
            <div className="card p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-800">
                  Upcoming appointments
                </h2>
              </div>

              <div className="space-y-3 text-xs text-gray-600">
                {data.upcomingAppointments.map((a: any) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2"
                  >
                    <div>
                      <div className="text-[12px] font-medium text-gray-800">
                        {new Date(a.date).toLocaleDateString()}
                      </div>
                      <div className="mt-0.5 text-[11px] text-gray-500">
                        {a.room || "Room TBA"}
                      </div>
                    </div>
                    <Badge tone="green">{a.type}</Badge>
                  </div>
                ))}

                {data.upcomingAppointments.length === 0 && (
                  <div className="text-xs text-gray-500 py-4 text-center">
                    No upcoming appointments.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
"use client";

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

/* -------- Patient-oriented mock data (swap with real API later) -------- */

const KPIS = [
  {
    label: "Total patients",
    value: 1284,
    icon: Users,
    tone: "bg-emerald-100 text-emerald-700",
  },
  {
    label: "New this week",
    value: 32,
    icon: CalendarDays,
    tone: "bg-sky-100 text-sky-700",
  },
  {
    label: "Appointments today",
    value: 41,
    icon: FileText,
    tone: "bg-violet-100 text-violet-700",
  },
  {
    label: "Pending bills",
    value: 12,
    icon: Receipt,
    tone: "bg-amber-100 text-amber-700",
  },
];

const PATIENT_REPORTS = [
  {
    name: "Aïcha Diop",
    id: "SN-2023-0001",
    tag: "Hypertension follow-up",
    stats: { lastVisit: "08-Dec-2023", nextVisit: "22-Dec-2023", risk: "Medium" },
  },
  {
    name: "Mamadou Ba",
    id: "SN-2023-0002",
    tag: "Type 2 diabetes check-up",
    stats: { lastVisit: "07-Dec-2023", nextVisit: "21-Dec-2023", risk: "High" },
  },
];

const UPCOMING_APPTS = [
  {
    title: "Control – Aïcha Diop",
    time: "10:30",
    room: "Consultation 2",
  },
  {
    title: "New patient – Omar Kane",
    time: "11:15",
    room: "Consultation 1",
  },
];

/* ---------- Small helpers ---------- */

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

/* ---------- Page ---------- */

export default function DashboardPage() {
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

        {/* Reminder banner – patient oriented */}
        <div className="card mb-5 flex items-start gap-3 border border-amber-100 bg-amber-50/60 px-4 py-3 text-xs text-amber-900">
          <CalendarDays className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <p>
            <span className="font-semibold">Reminder:</span> 3 high-risk patients
            have no appointment scheduled in the next 30 days. Review their
            follow-up plan.
          </p>
        </div>

        {/* KPI row */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
          {KPIS.map(({ label, value, icon: Icon, tone }) => (
            <div
              key={label}
              className={`card flex items-center justify-between px-4 py-4 shadow-sm border-0 ${tone}`}
            >
              <div>
                <div className="text-xs text-gray-600/80">{label}</div>
                <div className="mt-1 text-2xl font-semibold">
                  {value.toLocaleString()}
                </div>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/70">
                <Icon className="h-5 w-5" />
              </div>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid gap-5 lg:grid-cols-3">
          {/* Left side – key patients list */}
          <div className="card p-4 lg:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-gray-800">
                  Priority patients &gt; Today&apos;s focus
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Last visits, next appointments and risk level for your
                  most critical patients.
                </p>
              </div>
              <button className="badge flex items-center gap-1">
                View all patients <ChevronRight size={14} />
              </button>
            </div>

            <div className="space-y-3">
              {PATIENT_REPORTS.map((p) => (
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
                        <Badge>File {p.id}</Badge>
                      </div>
                      <div className="mt-0.5 text-[11px] text-gray-500">
                        {p.tag}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 text-[11px] text-gray-600">
                    <div className="text-right">
                      <div className="font-semibold text-gray-800">
                        {p.stats.lastVisit}
                      </div>
                      <div className="uppercase tracking-wide text-[10px]">
                        Last visit
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-800">
                        {p.stats.nextVisit}
                      </div>
                      <div className="uppercase tracking-wide text-[10px]">
                        Next visit
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        tone={
                          p.stats.risk === "High"
                            ? "red"
                            : p.stats.risk === "Medium"
                            ? "amber"
                            : "green"
                        }
                      >
                        Risk: {p.stats.risk}
                      </Badge>
                    </div>
                    <button className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-gray-200 bg-white">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side – patient stats + upcoming appointments */}
          <div className="space-y-4">
            {/* Distribution card (acts like donut section) */}
            <div className="card p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-800">
                  Today&apos;s appointments
                </h2>
                <Badge tone="green">Overview</Badge>
              </div>

              <div className="flex items-center gap-4">
                {/* Fake donut */}
                <div className="relative h-32 w-32">
                  <div className="absolute inset-0 rounded-full bg-[conic-gradient(#34d399_0_45%,#60a5fa_45%_75%,#fcd34d_75%_100%)]" />
                  <div className="absolute inset-3 rounded-full bg-white" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Filled slots</div>
                      <div className="text-lg font-semibold text-gray-800">
                        82%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex-1 space-y-1 text-xs text-gray-600">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      Check-up
                    </span>
                    <span className="font-medium text-gray-800">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-sky-400" />
                      Follow-up
                    </span>
                    <span className="font-medium text-gray-800">13</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-amber-300" />
                      Emergency / other
                    </span>
                    <span className="font-medium text-gray-800">4</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming appointments */}
            <div className="card p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-800">
                  Upcoming appointments
                </h2>
                <button className="badge text-[11px] flex items-center gap-1">
                  Open agenda <ChevronRight size={14} />
                </button>
              </div>
              <div className="space-y-3 text-xs text-gray-600">
                {UPCOMING_APPTS.map((m) => (
                  <div
                    key={m.title}
                    className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2"
                  >
                    <div>
                      <div className="text-[12px] font-medium text-gray-800">
                        {m.title}
                      </div>
                      <div className="mt-0.5 text-[11px] text-gray-500">
                        {m.time} • {m.room}
                      </div>
                    </div>
                    <button className="badge text-[11px]">Details</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

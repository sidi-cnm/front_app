"use client";

import Topbar from "@/components/Topbar";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="w-full">
      <Topbar title="Dashboard" />

      <section className="grid gap-4 sm:gap-6">
        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat title="Total Patients" value="1,284" sub="+32 this week" />
          <Stat title="New Docs" value="86" sub="Last 7 days" />
          <Stat title="Appointments" value="41" sub="Today" />
          <Stat title="Pending Bills" value="12" sub="This month" />
        </div>

        {/* Quick actions */}
        <div className="card p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-3">Quick actions</h3>
          <div className="flex flex-wrap gap-2">
            <Link href="/dashboard/patients" className="btn">Open Patients</Link>
            <Link href="/dashboard/patients/new" className="btn">New Patient</Link>
            
          </div>
        </div>

        {/* Recent items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="card p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-3">Recent documents</h3>
            <ul className="space-y-3 text-sm">
              {[
                { t: "HTA guidelines – 2024 update", d: "Today, 10:24" },
                { t: "ECG interpretation cheat sheet", d: "Yesterday, 17:02" },
                { t: "Diabetes – patient education (FR)", d: "2d ago" },
              ].map((r, i) => (
                <li key={i} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="truncate">{r.t}</span>
                  <span className="text-gray-500 whitespace-nowrap">{r.d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-3">Recent patients</h3>
            <div className="overflow-x-auto">
              <table className="min-w-[520px] w-full text-sm">
                <thead className="text-gray-500">
                  <tr>
                    <th className="text-left py-2">Name</th>
                    <th className="text-left py-2">Email</th>
                    <th className="text-left py-2">Last visit</th>
                    <th className="text-right py-2">Action</th>
                  </tr>
                </thead>
                <tbody className="[&>tr]:border-t">
                  {[
                    { n: "khatu", e: "khatu@sanamed.com", v: "08-Dec-2023", id: "p-1" },
                    { n: "SidiElvaly", e: "sidielvaly@sanamed.com", v: "07-Dec-2023", id: "p-2" },
                    { n: "Sidi", e: "sidi@sanamed.com", v: "06-Dec-2023", id: "p-3" },
                  ].map((p) => (
                    <tr key={p.id}>
                      <td className="py-2">{p.n}</td>
                      <td className="py-2">{p.e}</td>
                      <td className="py-2">{p.v}</td>
                      <td className="py-2 text-right">
                        <Link href={`/dashboard/patients/${p.id}`} className="badge">open</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Placeholder chart card */}
        <div className="card p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-3">Weekly activity</h3>
          <div className="h-40 sm:h-56 rounded-xl bg-gray-100 grid place-items-center text-gray-500 text-sm">
            (Add a chart here later)
          </div>
        </div>
      </section>
    </main>
  );
}

/** Small stat card component (inline for simplicity) */
function Stat({ title, value, sub }: { title: string; value: string; sub?: string }) {
  return (
    <div className="card p-4">
      <div className="text-gray-500 text-sm">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
      {sub && <div className="text-xs text-gray-500 mt-1">{sub}</div>}
    </div>
  );
}

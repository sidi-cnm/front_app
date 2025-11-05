"use client";

import { Patient } from "@/types/patient";
import { FileText, HeartPulse, Pill, Star } from "lucide-react";

export default function PatientOverview({ patient }: { patient: Patient }) {
  const p = patient;

  return (
    <div className="space-y-4">
      {/* quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat icon={<FileText size={18} />} label="Documents" value={p.stats?.docs ?? 0} />
        <Stat icon={<Star size={18} />} label="Favorites" value={p.stats?.favorites ?? 0} />
        <Stat icon={<HeartPulse size={18} />} label="Last score" value={`${p.stats?.lastScore ?? 0}%`} />
        <Stat icon={<Pill size={18} />} label="Conditions" value={p.conditions?.length ?? 0} />
      </div>

      {/* demographics & contact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-4">
          <h3 className="font-semibold mb-3">Demographics</h3>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <Li k="Gender" v={cap(p.gender ?? "-")} />
            <Li k="DOB" v={fmtDate(p.dob)} />
            <Li k="Enroll #" v={p.enrollNumber || "-"} />
            <Li k="Last visit" v={fmtDate(p.lastVisit)} />
          </ul>
        </div>

        <div className="card p-4">
          <h3 className="font-semibold mb-3">Contact</h3>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <Li k="Email" v={p.email} />
            <Li k="Phone" v={p.phone || "-"} />
            <Li k="Address" v={p.address || "-"} colSpan />
          </ul>
        </div>
      </div>

      {/* medical summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TagCard title="Allergies" items={p.allergies} empty="No allergies recorded" />
        <TagCard title="Chronic conditions" items={p.conditions} empty="No conditions recorded" />
        <TagCard title="Medications" items={p.meds} empty="No medications recorded" className="lg:col-span-2" />
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="card p-4 flex items-center gap-3">
      <div className="h-10 w-10 rounded-xl bg-soft grid place-items-center text-brand">{icon}</div>
      <div>
        <div className="text-sm text-gray-500">{label}</div>
        <div className="text-lg font-semibold">{value}</div>
      </div>
    </div>
  );
}

function TagCard({
  title, items, empty, className = "",
}: { title: string; items?: string[]; empty: string; className?: string }) {
  return (
    <div className={`card p-4 ${className}`}>
      <h3 className="font-semibold mb-3">{title}</h3>
      {items?.length ? (
        <div className="flex flex-wrap gap-2">
          {items.map((t, i) => (
            <span key={i} className="badge bg-gray-100">{t}</span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">{empty}</p>
      )}
    </div>
  );
}

function Li({ k, v, colSpan }: { k: string; v: string; colSpan?: boolean }) {
  return (
    <li className={`${colSpan ? "col-span-2" : ""}`}>
      <span className="text-gray-500">{k}:</span> <span className="font-medium">{v}</span>
    </li>
  );
}
function cap(s: string) { return s[0]?.toUpperCase() + s.slice(1); }
function fmtDate(iso?: string) {
  if (!iso) return "-";
  try { return new Date(iso).toLocaleDateString(); } catch { return iso; }
}

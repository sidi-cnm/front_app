"use client";
import Topbar from "./Topbar";
import { useState } from "react";
import { Patient } from "@/types/patient";
import { CalendarDays, Mail, Phone, IdCard, MapPin, User, StickyNote, Save, Trash2 } from "lucide-react";

export default function PatientSettings({ initial }: { initial: Patient }) {
  const [p, setP] = useState<Patient>(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  function set<K extends keyof Patient>(k: K, v: Patient[K]) { setP(s => ({ ...s, [k]: v })); }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null); setErr(null);
    try {
      setSaving(true);
      const r = await fetch(`/api/patients/${p.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(p),
      });
      if (!r.ok) throw new Error((await r.json().catch(()=>({}))).error || "Save failed");
      setMsg("Saved ✔");
    } catch (e:any) { setErr(e.message); }
    finally { setSaving(false); }
  }

  async function onDelete() {
    if (!confirm(`Delete ${p.name}? This cannot be undone.`)) return;
    const r = await fetch(`/api/patients/${p.id}`, { method: "DELETE" });
    if (r.ok) window.location.href = "/dashboard/patients";
    else alert("Delete failed");
  }

  return (
    <form onSubmit={onSave} className="card p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Edit patient</h3>
        <div className="flex gap-2">
          <button type="button" onClick={onDelete} className="badge text-red-600 border-red-200">
            <Trash2 size={16} className="mr-1" /> Delete
          </button>
          <button className="btn" disabled={saving}>
            <Save size={16} className="mr-2" /> {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>

      {msg && <p className="text-sm text-green-600">{msg}</p>}
      {err && <p className="text-sm text-red-600">{err}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Full name" icon={<User size={16} />}>
          <input className="input" value={p.name} onChange={e=>set("name", e.target.value)} />
        </Field>
        <Field label="Email" icon={<Mail size={16} />}>
          <input className="input bg-gray-50" readOnly value={p.email} />
        </Field>
        <Field label="Phone" icon={<Phone size={16} />}>
          <input className="input" value={p.phone ?? ""} onChange={e=>set("phone", e.target.value)} />
        </Field>
        <Field label="Enroll number" icon={<IdCard size={16} />}>
          <input className="input" value={p.enrollNumber ?? ""} onChange={e=>set("enrollNumber", e.target.value)} />
        </Field>
        <Field label="Gender">
          <select className="input" value={p.gender ?? "male"} onChange={e=>set("gender", e.target.value as any)}>
            <option>male</option><option>female</option><option>other</option>
          </select>
        </Field>
        <Field label="Date of birth" icon={<CalendarDays size={16} />}>
          <input className="input" type="date" value={p.dob ?? ""} onChange={e=>set("dob", e.target.value)} />
        </Field>
        <Field label="Address" icon={<MapPin size={16} />} colSpan>
          <input className="input" value={p.address ?? ""} onChange={e=>set("address", e.target.value)} />
        </Field>
       
      </div>
    </form>
  );
}

function Field({
  label, icon, children, colSpan,
}: { label: string; icon?: React.ReactNode; children: React.ReactNode; colSpan?: boolean }) {
  return (
    <div className={colSpan ? "sm:col-span-2" : ""}>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>}
        <div className={icon ? "pl-8" : ""}>{children}</div>
      </div>
    </div>
  );
}

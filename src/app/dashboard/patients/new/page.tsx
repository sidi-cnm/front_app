"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import Topbar from "@/components/Topbar";
import { CalendarDays, Mail, Phone, IdCard, MapPin, User, StickyNote, ImagePlus } from "lucide-react";

type NewPatient = {
  name: string;
  email: string;
  phone: string;
  enrollNumber: string;
  lastVisit?: string;
  gender?: "male" | "female" | "other";
  dob?: string;
  address?: string;
  notes?: string;
  avatarDataUrl?: string | null;
};

export default function NewPatientPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [p, setP] = useState<NewPatient>({
    name: "",
    email: "",
    phone: "",
    enrollNumber: "",
    lastVisit: "",
    gender: "male",
    dob: "",
    address: "",
    notes: "",
    avatarDataUrl: null,
  });

  const fileRef = useRef<HTMLInputElement | null>(null);

  function set<K extends keyof NewPatient>(key: K, val: NewPatient[K]) {
    setP((s) => ({ ...s, [key]: val }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);

    // basic validation
    if (!p.name.trim()) return setErr("Name is required");
    if (!p.email.trim() || !/^\S+@\S+\.\S+$/.test(p.email)) return setErr("Valid email is required");
    if (!p.phone.trim()) return setErr("Phone is required");
    if (!p.enrollNumber.trim()) return setErr("Enroll number is required");

    try {
      setSaving(true);
      const res = await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(p),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || "Failed to create patient");
      }
      router.push("/dashboard/patients");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unexpected error";
      setErr(msg);
    } finally {
      setSaving(false);
    }
  }

  function onPickAvatar() {
    fileRef.current?.click();
  }

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => set("avatarDataUrl", String(reader.result || ""));
    reader.readAsDataURL(file);
  }

  return (
    <main className="w-full">
      <Topbar title="New patient" />

      <section className="px-3 sm:px-4 lg:px-6">
        <form onSubmit={onSubmit} className="card p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-[#163B5B]">Create new patient</h2>
            <div className="flex gap-2">
              <button type="button" onClick={() => history.back()} className="badge">Cancel</button>
              <button className="btn" disabled={saving}>{saving ? "Saving..." : "Save patient"}</button>
            </div>
          </div>

          {err && <p className="mb-3 text-sm text-red-600">{err}</p>}

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left: identity + contact */}
            <div className="lg:col-span-2 space-y-4">
              <Field label="Full name" icon={<User size={16} />}>
                <input
                  className="input"
                  placeholder="e.g. Karthi"
                  value={p.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => set("name", e.target.value)}
                />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Email" icon={<Mail size={16} />}>
                  <input
                    className="input"
                    type="email"
                    placeholder="name@example.com"
                    value={p.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => set("email", e.target.value)}
                  />
                </Field>
                <Field label="Phone" icon={<Phone size={16} />}>
                  <input
                    className="input"
                    placeholder="e.g. 7524547760"
                    value={p.phone}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => set("phone", e.target.value)}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Enroll number" icon={<IdCard size={16} />}>
                  <input
                    className="input"
                    placeholder="ID / MRN"
                    value={p.enrollNumber}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => set("enrollNumber", e.target.value)}
                  />
                </Field>
                <Field label="Last visit" icon={<CalendarDays size={16} />}>
                  <input
                    className="input"
                    type="date"
                    value={p.lastVisit}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => set("lastVisit", e.target.value)}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Gender">
                  <select
                    className="input"
                    value={p.gender}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      set("gender", e.target.value as NewPatient["gender"])
                    }
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </Field>
                <Field label="Date of birth" icon={<CalendarDays size={16} />}>
                  <input
                    className="input"
                    type="date"
                    value={p.dob}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => set("dob", e.target.value)}
                  />
                </Field>
                <Field label="Address" icon={<MapPin size={16} />}>
                  <input
                    className="input"
                    placeholder="City, Country"
                    value={p.address}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => set("address", e.target.value)}
                  />
                </Field>
              </div>

              <Field label="Notes" icon={<StickyNote size={16} />}>
                <textarea
                  className="input min-h-[96px]"
                  placeholder="Symptoms, allergies, important details…"
                  value={p.notes}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => set("notes", e.target.value)}
                />
              </Field>
            </div>

            {/* Right: avatar uploader */}
            <div>
              <label className="text-sm font-medium text-gray-700">Avatar</label>
              <div className="mt-2 card p-4 grid place-items-center gap-3 border border-dashed">
                {p.avatarDataUrl ? (
                  <Image
                    src={p.avatarDataUrl}
                    alt="avatar preview"
                    width={112}
                    height={112}
                    className="h-28 w-28 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-28 w-28 rounded-full bg-soft grid place-items-center text-gray-400">
                    <ImagePlus />
                  </div>
                )}

                <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFileChange} />
                <button type="button" className="btn" onClick={onPickAvatar}>Choose photo</button>
                <button
                  type="button"
                  className="badge"
                  onClick={() => set("avatarDataUrl", null)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}

/** Small labeled field wrapper */
function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>}
        <div className={icon ? "pl-8" : ""}>{children}</div>
      </div>
    </div>
  );
}

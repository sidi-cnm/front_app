"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Topbar from "@/components/Topbar";
import { Camera, Mail, User, Phone, MapPin, Save, LogOut, Shield } from "lucide-react";

type Profile = {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  /** data URL selected in the client; if none we fall back to session.user.image or generated SVG */
  avatarDataUrl?: string | null;
};

export default function ProfilePage() {
  const { data: session, status } = useSession(); // "loading" | "authenticated" | "unauthenticated"
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const [p, setP] = useState<Profile>({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatarDataUrl: null,
  });

  const fileRef = useRef<HTMLInputElement | null>(null);

  // Populate from session when available
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setP((s) => ({
        ...s,
        name: session.user?.name ?? "",
        email: session.user?.email ?? "",
      }));
    }
  }, [status, session]);

  function set<K extends keyof Profile>(k: K, v: Profile[K]) {
    setP((s) => ({ ...s, [k]: v }));
  }

  async function onSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setOk(false);
    try {
      setSaving(true);
      const r = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(p),
      });
      if (!r.ok) {
        const body = (await r.json().catch(() => ({}))) as { error?: string };
        throw new Error(body?.error || "Save failed");
      }
      setOk(true);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Save failed";
      setErr(message);
    } finally {
      setSaving(false);
    }
  }

  function onPick() {
    fileRef.current?.click();
  }

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const rd = new FileReader();
    rd.onload = () => set("avatarDataUrl", String(rd.result || ""));
    rd.readAsDataURL(f);
  }

  function fallbackAvatarSvg(initial: string) {
    return (
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='112' height='112'>
          <rect width='100%' height='100%' rx='56' fill='%23E6F6F4'/>
          <text x='50%' y='54%' text-anchor='middle' font-family='Arial' font-size='40' fill='%233EC6B7'>${initial}</text>
        </svg>`
      )
    );
  }

  function currentAvatarSrc(): string {
    // Priority: local uploaded data URL -> session image -> generated SVG with initial
    if (p.avatarDataUrl) return p.avatarDataUrl;
    const img = session?.user?.image;
    if (img && typeof img === "string") return img;
    const initial = (p.name || "U")[0]?.toUpperCase() || "U";
    return fallbackAvatarSvg(initial);
  }

  // Sign out via next-auth (kills session cookie) then redirect to sign-in
  function onSignOut() {
    signOut({ callbackUrl: "/sign-in" });
  }

  if (status === "loading") {
    return <div className="px-3 sm:px-4 lg:px-6 py-10 text-gray-500">Loading…</div>;
  }

  if (status === "unauthenticated") {
    return (
      <div className="px-3 sm:px-4 lg:px-6 py-10 text-gray-500">
        You must be signed in to view this page.
      </div>
    );
  }

  return (
    <main className="w-full">
      <Topbar title="Profile" />

      <section className="px-3 sm:px-4 lg:px-6">
        <form onSubmit={onSave} className="card p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-[#163B5B]">Your account</h2>
            <div className="flex gap-2">
              <button type="button" onClick={onSignOut} className="badge flex items-center gap-1">
                <LogOut size={16} /> Sign out
              </button>
              <button className="btn flex items-center gap-2" disabled={saving}>
                <Save size={16} /> {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>

          {err && <p className="text-sm text-red-600 mb-2">{err}</p>}
          {ok && <p className="text-sm text-green-600 mb-2">Saved ✔</p>}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: avatar */}
            <div>
              <label className="text-sm font-medium text-gray-700">Avatar</label>
              <div className="mt-2 card p-4 grid place-items-center gap-3">
                <div className="relative h-28 w-28">
                  <Image
                    src={currentAvatarSrc()}
                    alt="avatar"
                    width={112}
                    height={112}
                    className="h-28 w-28 rounded-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={onPick}
                    className="absolute -bottom-2 -right-2 btn px-2 py-2 rounded-full"
                    title="Change photo"
                  >
                    <Camera size={16} />
                  </button>
                </div>
                <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFileChange} />
                {p.avatarDataUrl && (
                  <button
                    type="button"
                    className="badge"
                    onClick={() => set("avatarDataUrl", null)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            {/* Right: fields */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full name" icon={<User size={16} />}>
                <input
                  className="input"
                  value={p.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => set("name", e.target.value)}
                  placeholder="Your name"
                />
              </Field>

              <Field label="Email" icon={<Mail size={16} />}>
                <input className="input bg-gray-50" value={p.email} readOnly />
              </Field>

              <Field label="Phone" icon={<Phone size={16} />}>
                <input
                  className="input"
                  value={p.phone || ""}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => set("phone", e.target.value)}
                  placeholder="e.g. +222..."
                />
              </Field>

              <Field label="Address" icon={<MapPin size={16} />}>
                <input
                  className="input"
                  value={p.address || ""}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => set("address", e.target.value)}
                  placeholder="City, Country"
                />
              </Field>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-gray-700">Security</label>
                <div className="mt-2 card p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Shield size={18} /> Reset your password
                  </div>
                  <a href="/sign-in" className="btn">Change password</a>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}

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

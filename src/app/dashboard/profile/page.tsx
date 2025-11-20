// src/app/dashboard/profile/page.tsx
"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { useSession, signOut } from "next-auth/react";
import Topbar from "@/components/Topbar";
import {
  Camera,
  LogOut,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  User2,
} from "lucide-react";

export default function ProfilePage() {
  const { data: session } = useSession();

  const initialName = session?.user?.name ?? "";
  const initialEmail = session?.user?.email ?? "";
  const [fullName, setFullName] = useState(initialName);
  const [email] = useState(initialEmail);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setFullName(initialName);
  }, [initialName]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    // TODO: call your API to persist the profile
    alert("Profile saved (demo). Implement API call here.");
  };

  const handleSignOut = () =>
    signOut({ callbackUrl: "/signin", redirect: true });

  return (
    <main className="w-full">
      <Topbar title="Profile" />

      <section className="px-3 pb-10 pt-4 sm:px-4 lg:px-6">
        {/* Shell card */}
        <div className="card overflow-hidden border border-slate-100 shadow-card">
          {/* Sub-header */}
          <div className="flex flex-col gap-3 border-b border-slate-100 bg-gradient-to-r from-emerald-50 via-cyan-50 to-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Your account
              </h2>
              <p className="text-xs text-slate-500">
                Manage your personal information and security settings.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:bg-slate-50"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </button>

              <button
                type="submit"
                form="profile-form"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-white shadow-md hover:bg-emerald-600"
              >
                Save changes
              </button>
            </div>
          </div>

          {/* Content */}
          <form
            id="profile-form"
            onSubmit={handleSave}
            className="grid gap-8 px-6 py-6 lg:grid-cols-[260px,1fr]"
          >
            {/* Left: avatar card */}
            <div className="flex flex-col items-center border-b border-slate-100 pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
              <div
                className="relative mb-4 flex h-32 w-32 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 text-4xl font-semibold text-white shadow-md"
                onClick={handleAvatarClick}
              >
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar preview"
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  (fullName || "SE")
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                )}

                <span className="absolute bottom-1 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white text-emerald-500 shadow">
                  <Camera className="h-4 w-4" />
                </span>
              </div>
              <p className="mb-1 text-sm font-medium text-slate-900">
                Profile picture
              </p>
              <p className="text-[11px] text-slate-500 text-center">
                JPG, PNG up to 2 MB. Click the avatar to upload a new photo.
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>

            {/* Right: form fields */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Full name */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">
                  Full name
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-300">
                    <User2 className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-800 shadow-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
              </div>

              {/* Email (read-only) */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">
                  Email
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-300">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    readOnly
                    className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-500 shadow-sm outline-none"
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  Your login email can be changed by the administrator.
                </p>
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">
                  Phone
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-300">
                    <Phone className="h-4 w-4" />
                  </span>
                  <input
                    type="tel"
                    className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-800 shadow-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    placeholder="e.g. +222..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">
                  Address
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-300">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-800 shadow-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    placeholder="City, Country"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              {/* Security card (spans 2 columns) */}
              <div className="col-span-full">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 sm:flex sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <ShieldCheck className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        Security
                      </h3>
                      <p className="text-xs text-slate-500">
                        Keep your account protected by using a strong,
                        unique password.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      alert("Redirect to password change flow (to implement).")
                    }
                    className="mt-3 inline-flex items-center justify-center rounded-full bg-white px-4 py-1.5 text-xs font-medium text-emerald-600 shadow-sm hover:bg-emerald-50 sm:mt-0"
                  >
                    Change password
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

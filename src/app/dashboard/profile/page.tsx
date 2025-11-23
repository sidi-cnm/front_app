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

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ✅ Password modal state (INSIDE the component)
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ Load profile data
  useEffect(() => {
    async function loadProfile() {
      const res = await fetch("/api/profile");
      if (!res.ok) return;

      const data = await res.json();

      setFullName(data.name || "");
      setEmail(data.email || "");
      setPhone(data.phone || "");
      setAddress(data.address || "");
      setAvatarPreview(data.image || null);
    }

    loadProfile();
  }, []);

  // ✅ Avatar upload
  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleAvatarChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.url) {
      setAvatarPreview(data.url);
    }
  };

  // ✅ Save profile
  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      name: fullName,
      phone,
      address,
      image: avatarPreview || "",
    };

    await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    alert("✅ Profile updated!");
  };

  // ✅ Change password
  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("❌ Passwords do not match");
      return;
    }

    const res = await fetch("/api/change-password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (res.ok) {
      alert("✅ Password updated");
      setShowPasswordModal(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      const err = await res.json();
      alert("❌ " + err.error);
    }
  };

  const handleSignOut = () =>
    signOut({ callbackUrl: "/signin", redirect: true });

  return (
    <main className="w-full">
      <Topbar title="Profile" />

      <section className="px-4 pb-10 pt-4 lg:px-8">
        <div className="card overflow-hidden border border-slate-100 shadow-md rounded-2xl">
          {/* Header */}
          <div className="flex flex-col gap-3 border-b border-slate-100 bg-gradient-to-r from-emerald-50 via-cyan-50 to-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Your account
              </h2>
              <p className="text-xs text-slate-500">
                Manage your personal information and security settings.
              </p>
            </div>

            <div className="flex gap-3 items-center">
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </button>

              <button
                type="submit"
                form="profile-form"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-600 shadow-sm"
              >
                Save changes
              </button>
            </div>
          </div>

          {/* Body */}
          <form
            id="profile-form"
            onSubmit={handleSave}
            className="grid gap-10 px-6 py-8 lg:grid-cols-[260px,1fr]"
          >
            {/* Avatar */}
            <div className="flex flex-col items-center text-center">
              <div
                onClick={handleAvatarClick}
                className="relative flex h-32 w-32 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 text-4xl font-semibold text-white shadow-md"
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

              <p className="mt-3 text-xs text-slate-500">
                Click to upload a new photo
              </p>

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>

            {/* Fields */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">
                  Full name
                </label>
                <div className="relative">
                  <User2 className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm shadow-sm outline-none focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">
                  Email
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                  <input
                    value={email}
                    readOnly
                    className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-500 shadow-sm"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+222..."
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="City, Country"
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Security */}
              <div className="col-span-full rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <ShieldCheck className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      Security
                    </h3>
                    <p className="text-xs text-slate-500">
                      Change your password to protect your account.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPasswordModal(true)}
                  className="mt-3 inline-flex items-center justify-center rounded-full bg-white px-4 py-1.5 text-xs font-medium text-emerald-600 shadow-sm hover:bg-emerald-50 sm:mt-0"
                >
                  Change password
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* ✅ Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">
              Change Password
            </h3>

            <div className="space-y-3">
              <input
                type="password"
                placeholder="Current password"
                className="input w-full"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />

              <input
                type="password"
                placeholder="New password"
                className="input w-full"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <input
                type="password"
                placeholder="Confirm password"
                className="input w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-xs px-3 py-1.5 rounded-full bg-slate-200 text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordChange}
                className="text-xs px-3 py-1.5 rounded-full bg-emerald-500 text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// src/app/dashboard/patients/new/page.tsx
"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Topbar from "@/components/Topbar";
import {
  Calendar,
  Camera,
  FileText,
  IdCard,
  Mail,
  MapPin,
  Phone,
  User2,
  UserPlus,
  X,
} from "lucide-react";

export default function NewPatientPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [enrollNumber, setEnrollNumber] = useState("");
  const [lastVisit, setLastVisit] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other" | "">("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleAvatarChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCancel = () => {
    router.push("/dashboard/patients");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: send to your backend – for now just demo:
    console.log({
      fullName,
      email,
      phone,
      enrollNumber,
      lastVisit,
      gender,
      dob,
      address,
      notes,
    });
    alert("Patient saved (demo). Plug this into your API.");
    router.push("/dashboard/patients");
  };

  return (
    <main className="w-full">
      <Topbar title="New patient" />

      <section className="px-3 pb-10 pt-4 sm:px-4 lg:px-6">
        <div className="card overflow-hidden border border-slate-100 shadow-card">
          {/* Header inside card */}
          <div className="flex flex-col gap-3 border-b border-slate-100 bg-gradient-to-r from-emerald-50 via-cyan-50 to-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md">
                <UserPlus className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Create new patient
                </h2>
                <p className="text-xs text-slate-500">
                  Register a new patient and capture their basic clinical
                  information.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:bg-slate-50"
              >
                <X className="h-3.5 w-3.5" />
                Cancel
              </button>
              <button
                type="submit"
                form="new-patient-form"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-1.5 text-xs font-semibold text-white shadow-md hover:bg-emerald-600"
              >
                Save patient
              </button>
            </div>
          </div>

          {/* Form body */}
          <form
            id="new-patient-form"
            onSubmit={handleSubmit}
            className="grid gap-8 px-6 py-6 lg:grid-cols-[minmax(0,2fr),minmax(260px,1fr)]"
          >
            {/* Left column: patient info */}
            <div className="space-y-6">
              {/* Basic info */}
              <div className="grid gap-4 sm:grid-cols-2">
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
                      placeholder="e.g. Karthi"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
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
                      className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-800 shadow-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
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
                      placeholder="e.g. 7524547760"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                {/* Enroll number */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">
                    Enroll number
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-300">
                      <IdCard className="h-4 w-4" />
                    </span>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-800 shadow-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      placeholder="ID / MRN"
                      value={enrollNumber}
                      onChange={(e) => setEnrollNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Second row: gender / dates / address */}
              <div className="grid gap-4 sm:grid-cols-3">
                {/* Gender */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">
                    Gender
                  </label>
                  <select
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    value={gender}
                    onChange={(e) =>
                      setGender(e.target.value as typeof gender)
                    }
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Date of birth */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">
                    Date of birth
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-300">
                      <Calendar className="h-4 w-4" />
                    </span>
                    <input
                      type="date"
                      className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-800 shadow-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                    />
                  </div>
                </div>

                {/* Last visit */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">
                    Last visit
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-300">
                      <Calendar className="h-4 w-4" />
                    </span>
                    <input
                      type="date"
                      className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-800 shadow-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      value={lastVisit}
                      onChange={(e) => setLastVisit(e.target.value)}
                    />
                  </div>
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

              {/* Notes */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">
                  Notes
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-2.5 text-slate-300">
                    <FileText className="h-4 w-4" />
                  </span>
                  <textarea
                    className="min-h-[120px] w-full rounded-xl border border-slate-200 bg-white px-9 py-2 text-sm text-slate-800 shadow-sm outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    placeholder="Symptoms, allergies, important details..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Right column: avatar upload */}
            <div className="flex flex-col rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-6">
              <p className="text-sm font-semibold text-slate-800 mb-3">
                Avatar
              </p>

              <div className="flex flex-1 flex-col items-center justify-center">
                <button
                  type="button"
                  onClick={handleAvatarClick}
                  className="flex h-32 w-32 items-center justify-center rounded-full bg-white text-slate-300 shadow-sm hover:bg-slate-50"
                >
                  {avatarPreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={avatarPreview}
                      alt="Preview"
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <Camera className="h-6 w-6" />
                  )}
                </button>

                <p className="mt-3 text-xs text-slate-500 text-center max-w-[220px]">
                  Upload a profile photo to quickly recognize this patient.
                  JPG or PNG, up to 2 MB.
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleAvatarClick}
                    className="rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-medium text-white shadow-md hover:bg-emerald-600"
                  >
                    Choose photo
                  </button>
                  {avatarPreview && (
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:bg-slate-50"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

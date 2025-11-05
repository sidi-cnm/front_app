"use client";

import { useState, FormEvent } from "react";

import { Apple, Facebook } from "lucide-react";
import Topbar from "@/components/Topbar";

/* ---------- Fine, lightweight helpers ---------- */

function WaveTexture() {
  // translucent wave texture that matches the reference banner
  return (
    <svg
      viewBox="0 0 1440 320"
      className="pointer-events-none absolute inset-x-0 top-0 h-full w-full opacity-[0.26]"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="w" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <path
        fill="url(#w)"
        d="M0,160L40,144C80,128,160,96,240,96C320,96,400,128,480,154.7C560,181,640,203,720,208C800,213,880,203,960,176C1040,149,1120,107,1200,112C1280,117,1360,171,1400,197.3L1440,224L1440,0L0,0Z"
      />
    </svg>
  );
}

function GoogleMark() {
  // tiny G like in many kits
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.85-.07-1.47-.22-2.11H12v3.83h6.53c-.13.95-.83 2.39-2.39 3.36l-.02.11 3.47 2.69.24.02c2.2-2.03 3.66-5.02 3.66-8.9Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.31 0 6.09-1.09 8.12-2.97l-3.87-3c-1.04.72-2.46 1.22-4.25 1.22-3.25 0-6.01-2.18-7-5.14l-.12.01-3.78 2.92-.05.11C3.05 21.53 7.18 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5 13.11A7.98 7.98 0 0 1 4.56 11c0-.73.13-1.45.35-2.11l-.01-.14-3.83-2.97-.13.06A12.001 12.001 0 0 0 0 11c0 1.96.47 3.82 1.3 5.45L5 13.11Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.74c2.3 0 3.86.98 4.75 1.8l3.47-3.39C18.07 1.03 15.31 0 12 0 7.18 0 3.05 2.47 1.16 5.75l3.75 2.99C5.9 6.78 8.76 4.74 12 4.74Z"
      />
    </svg>
  );
}

function SocialButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="grid h-10 w-10 place-items-center rounded-xl border border-gray-200 bg-gray-50 text-gray-700 shadow-sm transition hover:bg-white"
    >
      {children}
    </button>
  );
}

function TinySwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="group inline-flex items-center gap-2 text-[11px] text-gray-600 select-none"
      aria-pressed={checked}
    >
      <span
        className={`h-3.5 w-6 rounded-full transition-colors ${
          checked ? "bg-emerald-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`ml-[2px] mt-[2px] block h-2.5 w-2.5 rounded-full bg-white transition-transform ${
            checked ? "translate-x-3" : ""
          }`}
        />
      </span>
      {label}
    </button>
  );
}

/* ---------- Page ---------- */

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: hook to your auth endpoint
    setTimeout(() => setLoading(false), 800);
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Your existing top bar with title + search fits the reference */}
      <Topbar title="Sign in" />

      {/* HERO (single element) */}
      <div className="mx-auto mt-6 w-full max-w-5xl px-4 sm:px-6">
        <div className="relative z-0 h-[260px] overflow-hidden rounded-[22px]">
          {/* solid teal with subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-teal-400" />
          {/* wave texture */}
          <WaveTexture />
          {/* headline */}
          {/* headline (nudged up a bit) */}
          <div className="absolute inset-0 grid place-items-center pointer-events-none">
              <p className="text-[18px] font-medium text-white/95 -translate-y-3 sm:-translate-y-5">
                  Welcome Back!
               </p>
          </div>

        </div>

        {/* FLOATING CARD (overlapping hero) */}
        <div className="-mt-24 sm:-mt-28 lg:-mt-32 grid place-items-center relative z-10">
          <div className="w-[380px] rounded-[18px] bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
            <p className="text-center text-[11px] text-gray-500">Sign in with</p>

            <div className="mt-3 flex items-center justify-center gap-3">
              <SocialButton>
                <Facebook className="h-4 w-4" />
              </SocialButton>
              <SocialButton>
                <Apple className="h-4 w-4" />
              </SocialButton>
              <SocialButton>
                <GoogleMark />
              </SocialButton>
            </div>

            {/* divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-[10px] text-gray-500">or</span>
              </div>
            </div>

            {/* form */}
            <form onSubmit={submit} className="space-y-3">
              <div>
                <label className="mb-1 block text-[11px] text-gray-500">Email</label>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-[10px] border border-gray-200 bg-white px-3.5 py-2.5 text-[13px] text-gray-900 outline-none focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] text-gray-500">Password</label>
                <input
                  type="password"
                  placeholder="Your password"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  className="block w-full rounded-[10px] border border-gray-200 bg-white px-3.5 py-2.5 text-[13px] text-gray-900 outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <TinySwitch
                checked={remember}
                onChange={setRemember}
                label="Remember me"
              />

              <button
                type="submit"
                disabled={loading}
                className="mt-1 grid h-10 w-full place-items-center rounded-[10px] bg-teal-500 text-[12px] font-medium text-white shadow-sm transition hover:bg-teal-600 disabled:opacity-60"
              >
                {loading ? "Signing in…" : "Sign in"}
              </button>
            </form>
          </div>
        </div>

        {/* breathe below card */}
        <div className="h-20" />
      </div>
    </main>
  );
}

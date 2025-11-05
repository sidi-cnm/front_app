// src/components/Sidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Receipt, FileText, User, LogOut } from "lucide-react";
import { SITE_NAME } from "@/lib/site";
import { signOut } from "next-auth/react";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/patients", label: "Patients", icon: Users },
  { href: "/dashboard/billing", label: "Billing", icon: Receipt },
  { href: "/dashboard/rtl", label: "RTL", icon: FileText },
  { href: "/dashboard/profile", label: "Profile", icon: User },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="hidden md:flex w-60 flex-col gap-4 p-4">
      <div className="text-xl font-bold text-brand px-2">{SITE_NAME}</div>
      <nav className="flex flex-col gap-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active = path.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm ${
                active ? "bg-white shadow-card text-dark" : "text-gray-600 hover:bg-white/70"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}

        {/* Sign out button */}
        <button
          onClick={() => signOut({ callbackUrl: "/sign-in" })}
          className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-gray-600 hover:bg-white/70"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </nav>

      <div className="mt-auto card p-4">
        <div className="text-sm font-medium mb-1">Need help?</div>
        <p className="text-xs text-gray-500 mb-3">Please check our docs</p>
        <a className="btn w-full" href="#">DOCUMENTATION</a>
      </div>
    </aside>
  );
}

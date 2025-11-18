"use client";

import { useState } from "react";
import Topbar from "@/components/Topbar";
import {
  CalendarDays,
  DollarSign,
  CreditCard,
  Eye,
  Download,
} from "lucide-react";

/* ---------- Types & mock data --------- */

type Invoice = {
  id: string;
  date: string;   // ISO or human
  amount: number;
  status: "paid" | "due" | "overdue";
  period: string;
};

const invoices: Invoice[] = [
  {
    id: "INV-2025-0042",
    date: "01/03/2025",
    amount: 49,
    status: "paid",
    period: "Feb 2025",
  },
  {
    id: "INV-2025-0043",
    date: "01/04/2025",
    amount: 49,
    status: "paid",
    period: "Mar 2025",
  },
  {
    id: "INV-2025-0044",
    date: "01/05/2025",
    amount: 49,
    status: "due",
    period: "Apr 2025",
  },
];

/* Small reusable circular icon button (same idea as in Patients table) */
function IconButton({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50 transition"
    >
      {children}
    </button>
  );
}

/* ---------- Page --------- */

export default function BillingPage() {
  const [search, setSearch] = useState("");

  const filtered =
    search.trim() === ""
      ? invoices
      : invoices.filter((inv) =>
          inv.id.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <main className="w-full">
      <Topbar title="Billing" />

      <section className="px-3 sm:px-4 lg:px-6">
        {/* intro */}
        <p className="mt-1 mb-4 text-sm text-gray-500">
          Manage your subscription, invoices and payment methods.
        </p>

        {/* summary cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          {/* balance */}
          <div className="card p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Account balance</span>
              <DollarSign className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="mt-2 text-2xl font-semibold">$0</div>
            <p className="mt-1 text-xs text-gray-500">
              Credits auto-applied at the next invoice.
            </p>
          </div>

          {/* next invoice */}
          <div className="card p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Next invoice</span>
              <CalendarDays className="h-4 w-4 text-sky-500" />
            </div>
            <div className="mt-2 text-2xl font-semibold">$49</div>
            <p className="mt-1 text-xs text-gray-500">
              01/05/2025 • Apr 2025
            </p>
          </div>

          {/* payment method – Visa card */}
          <div className="card p-0 overflow-hidden">
            <div className="px-4 pt-3 pb-2 text-sm text-gray-500">
              Payment method
            </div>
            <div className="px-4 pb-4">
              <div className="relative h-32 w-full rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-md p-4 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.12em]">
                    <CreditCard className="w-4 h-4" />
                    <span>SanaMed Billing</span>
                  </div>
                  <span className="text-sm font-semibold">VISA</span>
                </div>

                <div className="text-lg font-semibold tracking-[0.18em]">
                  •••• •••• •••• 4242
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex flex-col">
                    <span className="text-white/70">Card holder</span>
                    <span className="font-medium">Sidi El Valy</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-white/70">Expires</span>
                    <span className="font-medium">08 / 27</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* header + search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-3">
          <div className="text-sm text-gray-500">Invoices</div>
          <div className="relative w-full sm:max-w-xs">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-3 pr-3 w-full text-sm"
              placeholder="Search invoice ID…"
            />
          </div>
        </div>

        {/* invoice table – same style as Patients table */}
        <div className="card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-[720px] w-full">
              <thead>
                <tr className="bg-soft text-xs uppercase tracking-wide text-gray-500">
                  <th className="px-4 py-3 text-left">Invoice</th>
                  <th className="px-4 py-3 text-left">Period</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filtered.map((inv) => (
                  <tr
                    key={inv.id}
                    className="border-t last:border-b-0 hover:bg-gray-50/70 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {inv.id}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{inv.period}</td>
                    <td className="px-4 py-3 text-gray-700">{inv.date}</td>
                    <td className="px-4 py-3 text-gray-700">${inv.amount}</td>
                    <td className="px-4 py-3">
                      {inv.status === "paid" && (
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600 ring-1 ring-emerald-100">
                          Paid
                        </span>
                      )}
                      {inv.status === "due" && (
                        <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600 ring-1 ring-amber-100">
                          Due
                        </span>
                      )}
                      {inv.status === "overdue" && (
                        <span className="inline-flex items-center rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-600 ring-1 ring-rose-100">
                          Overdue
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <IconButton title="View">
                          <Eye size={16} />
                        </IconButton>
                        <IconButton title="Download PDF">
                          <Download size={16} />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-gray-500"
                    >
                      No invoices found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

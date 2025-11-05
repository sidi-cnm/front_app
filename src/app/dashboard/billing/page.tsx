"use client";

import { useMemo, useState } from "react";
import Topbar from "@/components/Topbar";
import {
  CreditCard,
  Download,
  Eye,
  Plus,
  CalendarDays,
  DollarSign,
} from "lucide-react";

/* --------- tiny helpers --------- */

function Badge({
  tone = "gray",
  children,
}: {
  tone?: "green" | "red" | "amber" | "gray";
  children: React.ReactNode;
}) {
  const map: Record<string, string> = {
    green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    red: "bg-rose-50 text-rose-700 ring-rose-200",
    amber: "bg-amber-50 text-amber-700 ring-amber-200",
    gray: "bg-gray-50 text-gray-600 ring-gray-200",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs ring-1 ${map[tone]}`}
    >
      {children}
    </span>
  );
}

type Invoice = {
  id: string;
  date: string; // ISO
  amount: number; // in USD
  status: "paid" | "due" | "overdue";
  period: string;
};

/* --------- page --------- */

export default function BillingPage() {
  const [methodOpen, setMethodOpen] = useState(false);

  // mock invoices (replace with API call)
  const invoices: Invoice[] = [
    {
      id: "INV-2025-0042",
      date: "2025-03-01",
      amount: 49,
      status: "paid",
      period: "Feb 2025",
    },
    {
      id: "INV-2025-0043",
      date: "2025-04-01",
      amount: 49,
      status: "paid",
      period: "Mar 2025",
    },
    {
      id: "INV-2025-0044",
      date: "2025-05-01",
      amount: 49,
      status: "due",
      period: "Apr 2025",
    },
  ];

  const summary = useMemo(() => {
    const next = invoices.find((x) => x.status !== "paid");
    const totalThisYear = invoices
      .filter((i) => i.status === "paid")
      .reduce((a, b) => a + b.amount, 0);
    return {
      balance: 0,
      nextInvoice: next,
      totalThisYear,
      method: { brand: "Visa", last4: "4242", exp: "08/27" },
    };
  }, [invoices]);

  return (
    <main className="w-full">
      <Topbar title="Billing" />

      <section className="px-3 sm:px-4 lg:px-6">
        {/* header actions */}
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-gray-500">
            Manage your subscription, invoices and payment methods.
          </div>
          <div className="flex gap-2">
            <button className="btn">
              <Download size={16} className="mr-2" />
              Export CSV
            </button>
            <button
              className="btn"
              onClick={() => setMethodOpen(true)}
              aria-haspopup="dialog"
            >
              <Plus size={16} className="mr-2" />
              Add payment method
            </button>
          </div>
        </div>

        {/* summary cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">Account balance</div>
              <DollarSign className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="mt-2 text-2xl font-semibold">${summary.balance}</div>
            <div className="mt-1 text-xs text-gray-500">
              Credits auto-applied at the next invoice.
            </div>
          </div>

          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">Next invoice</div>
              <CalendarDays className="h-4 w-4 text-blue-500" />
            </div>
            {summary.nextInvoice ? (
              <>
                <div className="mt-2 text-2xl font-semibold">
                  ${summary.nextInvoice.amount}
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  {new Date(summary.nextInvoice.date).toLocaleDateString()} •{" "}
                  {summary.nextInvoice.period}
                </div>
              </>
            ) : (
              <div className="mt-2 text-sm text-gray-600">No upcoming invoice</div>
            )}
          </div>

          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">Payment method</div>
              <CreditCard className="h-4 w-4 text-indigo-500" />
            </div>
            <div className="mt-2 text-2xl font-semibold">
              {summary.method.brand} •••• {summary.method.last4}
            </div>
            <div className="mt-1 text-xs text-gray-500">Exp {summary.method.exp}</div>
          </div>
        </div>

        {/* invoices table */}
        <div className="card mt-6 p-0 overflow-hidden">
          <div className="px-4 py-3 border-b text-sm font-medium">Invoices</div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-gray-500">
                <tr className="border-b">
                  <th className="px-4 py-3">Invoice</th>
                  <th className="px-4 py-3">Period</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id} className="border-b last:border-b-0">
                    <td className="px-4 py-3 font-medium">{inv.id}</td>
                    <td className="px-4 py-3">{inv.period}</td>
                    <td className="px-4 py-3">
                      {new Date(inv.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">${inv.amount}</td>
                    <td className="px-4 py-3">
                      {inv.status === "paid" && <Badge tone="green">Paid</Badge>}
                      {inv.status === "due" && <Badge tone="amber">Due</Badge>}
                      {inv.status === "overdue" && (
                        <Badge tone="red">Overdue</Badge>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button className="badge">
                          <Eye size={14} className="mr-1" />
                          view
                        </button>
                        <button className="badge">
                          <Download size={14} className="mr-1" />
                          pdf
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {invoices.length === 0 && (
                  <tr>
                    <td className="px-4 py-6 text-center text-gray-500" colSpan={6}>
                      No invoices yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* add payment method modal */}
        {methodOpen && (
          <div
            className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
            onClick={() => setMethodOpen(false)}
          >
            <div
              className="card w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <div className="text-lg font-semibold mb-4">Add payment method</div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setMethodOpen(false);
                }}
                className="space-y-3"
              >
                <div>
                  <label className="mb-1 block text-xs text-gray-500">
                    Card holder
                  </label>
                  <input className="input w-full" placeholder="Jane Doe" required />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">
                    Card number
                  </label>
                  <input
                    className="input w-full"
                    placeholder="4242 4242 4242 4242"
                    inputMode="numeric"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs text-gray-500">
                      Expiry (MM/YY)
                    </label>
                    <input className="input w-full" placeholder="08/27" required />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-gray-500">CVC</label>
                    <input className="input w-full" placeholder="123" required />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    className="badge"
                    onClick={() => setMethodOpen(false)}
                  >
                    cancel
                  </button>
                  <button type="submit" className="btn">
                    Save method
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

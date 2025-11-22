"use client";

import { useEffect, useState, useMemo } from "react";
import Topbar from "@/components/Topbar";
import {
  CalendarDays,
  DollarSign,
  CreditCard,
  Search as SearchIcon,
} from "lucide-react";

/* ---------- Types ---------- */

type Invoice = {
  id: string;
  amount: number;
  status: "PENDING" | "PAID";
  dueDate: string | null;
  createdAt: string;
};

/* ---------- Status Badge ---------- */

function StatusBadge({ value }: { value: Invoice["status"] }) {
  const map = {
    PAID: {
      class: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: "✓",
    },
    PENDING: {
      class: "bg-amber-50 text-amber-700 border-amber-200",
      icon: "⏱",
    },
  };

  const config = map[value];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border ${config.class}`}
    >
      <span className="text-xs">{config.icon}</span>
      {value === "PAID" ? "Paid" : "Pending"}
    </span>
  );
}

/* ---------- Page ---------- */

export default function BillingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | Invoice["status"]>("ALL");

  // ✅ Fetch invoices from DB
  useEffect(() => {
    async function loadInvoices() {
      try {
        const res = await fetch("/api/invoices");
        const data = await res.json();

        if (Array.isArray(data)) {
          setInvoices(data);
        } else {
          setInvoices([]);
        }
      } catch (err) {
        console.error("Error fetching invoices:", err);
        setInvoices([]);
      } finally {
        setLoading(false);
      }
    }

    loadInvoices();
  }, []);

  // ✅ REAL DATA: Sum of PAID invoices
  const totalPaid = useMemo(() => {
    return invoices
      .filter((inv) => inv.status === "PAID")
      .reduce((sum, inv) => sum + inv.amount, 0);
  }, [invoices]);

  // ✅ Search & filter
  const filtered = invoices.filter((inv) => {
    const matchesSearch =
      search.trim() === "" ||
      inv.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <main className="w-full">
        <Topbar title="Billing" />
        <div className="px-4 py-6 text-sm text-gray-500">Loading invoices...</div>
      </main>
    );
  }

  return (
    <main className="w-full">
      <Topbar title="Billing" />

      <section className="px-3 sm:px-4 lg:px-6">
        <p className="mt-1 mb-6 text-sm text-gray-600">
          Review your billing history and account details.
        </p>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          
          {/* ✅ REAL TOTAL PAID */}
          <div className="card p-6 flex flex-col justify-between hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Total Paid</span>
              <div className="p-2 bg-emerald-100 rounded-lg">
                <DollarSign className="h-4 w-4 text-emerald-600" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold text-gray-900">
              ${totalPaid.toLocaleString()}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Total amount successfully paid.
            </p>
          </div>

          {/* Latest Invoice */}
          <div className="card p-6 flex flex-col justify-between hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Latest Invoice</span>
              <div className="p-2 bg-sky-100 rounded-lg">
                <CalendarDays className="h-4 w-4 text-sky-600" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold text-gray-900">
              {invoices[0] ? `$${invoices[0].amount.toLocaleString()}` : "-"}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              {invoices[0]
                ? new Date(invoices[0].createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "--"}
            </p>
          </div>

          {/* Payment Method */}
          <div className="card p-0 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="px-6 pt-4 pb-2 text-sm font-medium text-gray-600">
              Payment Method
            </div>
            <div className="px-6 pb-4">
              <div className="h-32 w-full rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-lg p-4 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs uppercase tracking-wide">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    SanaMed Billing
                  </div>
                  <span className="text-sm font-bold">VISA</span>
                </div>
                <div className="text-lg font-bold tracking-widest">
                  •••• •••• •••• 4242
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="text-white/80">Card holder</span>
                    <div className="font-semibold">Sidi El Valy</div>
                  </div>
                  <div className="text-right">
                    <span className="text-white/80">Expires</span>
                    <div className="font-semibold">08 / 27</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Header + Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Invoice History</h2>
            <p className="text-sm text-gray-500 mt-1">
              {filtered.length} invoice{filtered.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "ALL" | Invoice["status"])
              }
              className="input text-sm cursor-pointer"
            >
              <option value="ALL">All Status</option>
              <option value="PAID">Paid</option>
              <option value="PENDING">Pending</option>
            </select>

            {/* Search */}
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input w-full sm:w-64 text-sm"
              placeholder="Search invoice ID…"
            />
          </div>
        </div>

        {/* Invoice Table */}
        <div className="card p-0 overflow-hidden hover:shadow-md transition-shadow duration-200">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500 border-b border-gray-200">
                  <th className="px-6 py-4 text-left font-semibold">Invoice</th>
                  <th className="px-6 py-4 text-left font-semibold">Date</th>
                  <th className="px-6 py-4 text-left font-semibold">Due Date</th>
                  <th className="px-6 py-4 text-left font-semibold">Amount</th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.map((inv) => (
                  <tr
                    key={inv.id}
                    className="hover:bg-gray-50 transition-colors duration-150 group"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900 group-hover:text-gray-700">
                      {inv.id}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(inv.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {inv.dueDate
                        ? new Date(inv.dueDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "-"}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      ${inv.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge value={inv.status} />
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
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

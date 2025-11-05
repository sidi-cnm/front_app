"use client";

import { useState } from "react";
import Topbar from "@/components/Topbar";
import { Globe2, AlignRight, AlignLeft } from "lucide-react";

/**
 * RTL Preview Page
 * Route: /dashboard/rtl
 * - Shows your UI running inside a <section dir="rtl"> sandbox
 * - Keeps the rest of the app LTR so the rest of the layout isn’t flipped
 */

export default function RTLPage() {
  const [rtl, setRtl] = useState(true);

  return (
    <main className="w-full">
      <Topbar title="RTL Preview" />

      <section className="px-3 sm:px-4 lg:px-6">
        {/* Controls */}
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-gray-500">
            Preview the dashboard components in a Right-to-Left layout (Arabic/Hebrew).
          </div>
          <div className="flex gap-2">
            <button
              className={`btn ${!rtl ? "opacity-70" : ""}`}
              onClick={() => setRtl(true)}
              title="Right to Left"
            >
              <AlignRight size={16} className="mr-2" />
              RTL
            </button>
            <button
              className={`btn ${rtl ? "opacity-70" : ""}`}
              onClick={() => setRtl(false)}
              title="Left to Right"
            >
              <AlignLeft size={16} className="mr-2" />
              LTR
            </button>
          </div>
        </div>

        {/* RTL sandbox */}
        <div className="card p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe2 className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-gray-600">
                Sandbox (only the box below changes direction)
              </span>
            </div>
            <span className="badge">{rtl ? "dir=rtl" : "dir=ltr"}</span>
          </div>

          <section dir={rtl ? "rtl" : "ltr"}>
            {/* header cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="card p-4">
                <div className="text-sm text-gray-500">الحساب</div>
                <div className="mt-2 text-2xl font-semibold">سيدي ٫ أهلا وسهلا</div>
                <div className="mt-1 text-xs text-gray-500">
                  معاينة تخطيط من اليمين إلى اليسار.
                </div>
              </div>
              <div className="card p-4">
                <div className="text-sm text-gray-500">إجمالي المستندات</div>
                <div className="mt-2 text-2xl font-semibold">12</div>
                <div className="mt-1 text-xs text-gray-500">هذا الشهر</div>
              </div>
              <div className="card p-4">
                <div className="text-sm text-gray-500">آخر زيارة</div>
                <div className="mt-2 text-2xl font-semibold">08/12/2023</div>
                <div className="mt-1 text-xs text-gray-500">Nouakchott</div>
              </div>
            </div>

            {/* form + table examples */}
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="card p-4">
                <div className="mb-3 font-medium">نموذج</div>
                <form className="space-y-3">
                  <div>
                    <label className="mb-1 block text-xs text-gray-500">الاسم</label>
                    <input className="input w-full" placeholder="أدخل الاسم" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-gray-500">البريد</label>
                    <input className="input w-full" placeholder="name@example.com" />
                  </div>
                  <div className="flex gap-2">
                    <button type="button" className="btn flex-1">
                      حفظ
                    </button>
                    <button type="button" className="badge flex-1">
                      إلغاء
                    </button>
                  </div>
                </form>
              </div>

              <div className="card p-0 overflow-hidden">
                <div className="px-4 py-3 border-b font-medium">جدول</div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="text-gray-500 text-left">
                      <tr className="border-b">
                        <th className="px-4 py-3">#</th>
                        <th className="px-4 py-3">الاسم</th>
                        <th className="px-4 py-3">الهاتف</th>
                        <th className="px-4 py-3">الحالة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { i: 1, n: "كريدي", p: "7524547760", s: "نشط" },
                        { i: 2, n: "عبدالله", p: "7524547711", s: "مؤقت" },
                      ].map((r) => (
                        <tr key={r.i} className="border-b last:border-b-0">
                          <td className="px-4 py-3">{r.i}</td>
                          <td className="px-4 py-3">{r.n}</td>
                          <td className="px-4 py-3">{r.p}</td>
                          <td className="px-4 py-3">
                            <span className="badge">{r.s}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

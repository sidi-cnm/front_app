// src/app/dashboard/rtl/page.tsx
"use client";

import Topbar from "@/components/Topbar";
import { useSession } from "next-auth/react";
import { patients } from "@/lib/mock";
import { CalendarDays, Users, FileText, AlertCircle } from "lucide-react";

export default function RTLPreviewPage() {
  const { data: session } = useSession();
  const userName = session?.user?.name ?? "الضيف";

  const highRisk = patients.slice(0, 2); // just reuse some mock data

  return (
    <main className="w-full">
      {/* Topbar stays LTR but title is RTL preview */}
      <Topbar title="RTL Preview" />

      {/* Everything inside this section is RTL */}
      <section
        dir="rtl"
        className="px-3 sm:px-4 lg:px-6 pb-8 text-right"
      >
        {/* Welcome banner */}
        <div className="mb-4 rounded-2xl bg-white p-4 shadow-card border border-slate-100">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-slate-400">
                لوحة القيادة &gt; عرض من اليمين إلى اليسار
              </p>
              <h2 className="mt-1 text-xl font-semibold text-slate-900">
                مرحباً، {userName}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                هذا هو نفس تصميم لوحة التحكم، لكن باتجاه من اليمين إلى اليسار.
              </p>
            </div>
            <div className="mt-2 sm:mt-0 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-600">
                <AlertCircle size={14} />
                وضع العرض من اليمين إلى اليسار
              </span>
            </div>
          </div>
        </div>

        {/* KPI cards – same structure as dashboard but text RTL */}
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="card flex flex-col justify-between p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">إجمالي المرضى</span>
              <Users className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">
              ١٬٢٨٤
            </div>
            <p className="mt-1 text-xs text-slate-400">+٣٢ خلال هذا الأسبوع</p>
          </div>

          <div className="card flex flex-col justify-between p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">زيارات اليوم</span>
              <CalendarDays className="h-4 w-4 text-sky-500" />
            </div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">
              ٤١
            </div>
            <p className="mt-1 text-xs text-slate-400">متابعة المواعيد القادمة</p>
          </div>

          <div className="card flex flex-col justify-between p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">مرضى جدد هذا الأسبوع</span>
              <FileText className="h-4 w-4 text-violet-500" />
            </div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">
              ٣٢
            </div>
            <p className="mt-1 text-xs text-slate-400">ملفات تمت إضافتها حديثاً</p>
          </div>

          <div className="card flex flex-col justify-between p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">فواتير معلّقة</span>
              <FileText className="h-4 w-4 text-amber-500" />
            </div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">
              ١٢
            </div>
            <p className="mt-1 text-xs text-slate-400">تتطلب مراجعة أو دفعاً</p>
          </div>
        </div>

        {/* Main grid: priority patients + simple “today overview” */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1.2fr)]">
          {/* Priority patients (mirrors dashboard list but RTL) */}
          <div className="card p-4 sm:p-6">
            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  المرضى ذوو الأولوية – تركيز اليوم
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  آخر الزيارات والمواعيد القادمة ومستوى الخطورة.
                </p>
              </div>
              <button className="self-start rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600 hover:bg-slate-50">
                عرض جميع المرضى
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {highRisk.map((p: { id: string; name: string; email?: string; lastVisit?: string; nextVisit?: string; }) => (
                <div
                  key={p.id}
                  className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-700">
                      {p.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-slate-900">
                        {p.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {p.email ?? "no-email@example.com"}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-xs text-slate-500 sm:text-right">
                    <div>
                      <div className="text-[11px] text-slate-400">آخر زيارة</div>
                      <div className="font-medium text-slate-800">
                        {p.lastVisit ?? "غير متوفر"}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400">الموعد القادم</div>
                      <div className="font-medium text-slate-800">
                        {p.nextVisit ?? "غير محدد"}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400">مستوى الخطورة</div>
                      <span className="inline-flex items-center rounded-full bg-rose-50 px-3 py-1 text-[11px] font-medium text-rose-600">
                        مرتفع
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today’s appointments overview (simplified) */}
          <div className="card p-4 sm:p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-2">
              مواعيد اليوم
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              نظرة سريعة على حالة المواعيد في العيادة.
            </p>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">تم تأكيدها</span>
                <span className="font-semibold text-slate-900">٢٤</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">متابعة</span>
                <span className="font-semibold text-slate-900">١٣</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">حالات طارئة</span>
                <span className="font-semibold text-slate-900">٤</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

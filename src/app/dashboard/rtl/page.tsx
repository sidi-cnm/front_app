"use client";

import { useEffect, useState } from "react";
import Topbar from "@/components/Topbar";
import {
  CalendarDays,
  Users,
  FileText,
  AlertCircle,
} from "lucide-react";

export default function RTLPreviewPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load real dashboard data
  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard RTL error:", err);
        setLoading(false);
      });
  }, []);

  if (loading || !data) {
    return (
      <main className="w-full">
        <Topbar title="RTL Preview" />
        <div dir="rtl" className="px-4 py-6 text-sm text-slate-500 text-right">
          جارٍ تحميل البيانات...
        </div>
      </main>
    );
  }

  const highRisk = data.highRiskPatients || [];
  const appointmentsToday = data.appointmentsToday || 0;

  return (
    <main className="w-full">
      <Topbar title="RTL Preview" />

      <section dir="rtl" className="px-3 sm:px-4 lg:px-6 pb-8 text-right">
        {/* Welcome Banner */}
        <div className="mb-4 rounded-2xl bg-white p-4 shadow-card border border-slate-100">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-slate-400">
                لوحة القيادة &gt; عرض من اليمين إلى اليسار
              </p>
              <h2 className="mt-1 text-xl font-semibold text-slate-900">
                مرحباً بك
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                هذا هو نفس تصميم لوحة التحكم، لكن باتجاه من اليمين إلى اليسار وببيانات حقيقية.
              </p>
            </div>

            <div className="mt-2 sm:mt-0 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-600">
                <AlertCircle size={14} />
                وضع العرض RTL
              </span>
            </div>
          </div>
        </div>

        {/* ✅ KPI CARDS (Real Data) */}
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="card flex flex-col justify-between p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">إجمالي المرضى</span>
              <Users className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">
              {data.totalPatients}
            </div>
            <p className="mt-1 text-xs text-slate-400">
              +{data.newThisWeek} خلال هذا الأسبوع
            </p>
          </div>

          <div className="card flex flex-col justify-between p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">زيارات اليوم</span>
              <CalendarDays className="h-4 w-4 text-sky-500" />
            </div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">
              {appointmentsToday}
            </div>
            <p className="mt-1 text-xs text-slate-400">
              متابعة المواعيد القادمة
            </p>
          </div>

          <div className="card flex flex-col justify-between p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">مرضى جدد هذا الأسبوع</span>
              <FileText className="h-4 w-4 text-violet-500" />
            </div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">
              {data.newThisWeek}
            </div>
            <p className="mt-1 text-xs text-slate-400">
              ملفات تمّت إضافتها حديثاً
            </p>
          </div>

          <div className="card flex flex-col justify-between p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">فواتير معلّقة</span>
              <FileText className="h-4 w-4 text-amber-500" />
            </div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">
              {data.pendingBills}
            </div>
            <p className="mt-1 text-xs text-slate-400">تتطلب مراجعة أو دفعاً</p>
          </div>
        </div>

        {/* ✅ High-risk Patients (Real Data) */}
        <div className="card p-4 sm:p-6 mb-6">
          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                المرضى ذوو الأولوية – تركيز اليوم
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                أعلى المرضى من حيث مستوى الخطورة.
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {highRisk.map((p: any) => (
              <div key={p.id} className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-50 text-xs font-semibold text-rose-600">
                    {p.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-900">
                      {p.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {p.email ?? "لا يوجد بريد"}
                    </div>
                  </div>
                </div>

                <span className="inline-flex items-center rounded-full bg-rose-50 px-3 py-1 text-[11px] font-medium text-rose-600">
                  خطر مرتفع
                </span>
              </div>
            ))}

            {highRisk.length === 0 && (
              <div className="text-xs text-slate-500 py-4 text-center">
                لا يوجد مرضى عالي الخطورة.
              </div>
            )}
          </div>
        </div>

        {/* ✅ Today Overview (Real Data) */}
        <div className="card p-4 sm:p-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-2">
            مواعيد اليوم
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            نظرة سريعة على حالة المواعيد في العيادة.
          </p>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">إجمالي المواعيد</span>
              <span className="font-semibold text-slate-900">
                {appointmentsToday}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">المواعيد القادمة</span>
              <span className="font-semibold text-slate-900">
                {data.upcomingAppointments.length}
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

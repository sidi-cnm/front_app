import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const totalPatients = await db.patient.count();

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const newThisWeek = await db.patient.count({
      where: {
        createdAt: { gte: oneWeekAgo },
      },
    });

    const appointmentsToday = await db.appointment.count({
      where: {
        date: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },
    });

    const pendingBills = await db.invoice.count({
      where: {
        status: "PENDING",
      },
    });

    const highRiskPatients = await db.patient.findMany({
      where: { status: "HIGH" },
      orderBy: { lastVisit: "desc" },
      take: 5,
    });

    const upcomingAppointments = await db.appointment.findMany({
      where: {
        date: { gte: new Date() },
      },
      orderBy: { date: "asc" },
      take: 5,
    });

    return NextResponse.json({
      totalPatients,
      newThisWeek,
      appointmentsToday,
      pendingBills,
      highRiskPatients,
      upcomingAppointments,
    });
  } catch (err) {
    console.error("Dashboard fetch failed:", err);
    return NextResponse.json({ error: "Failed to load dashboard" }, { status: 500 });
  }
}

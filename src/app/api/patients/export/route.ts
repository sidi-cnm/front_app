import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const patients = await db.patient.findMany({
      orderBy: { createdAt: "desc" },
    });

    // ✅ Define CSV headers
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Enroll Number",
      "Last Visit",
      "Gender",
      "Date of Birth",
      "Address",
      "Notes",
      "Created At",
    ];

    // ✅ Convert to CSV rows
    const rows = patients.map((p) => [
      p.name,
      p.email,
      p.phone,
      p.idnum,
      p.lastVisit ? new Date(p.lastVisit).toISOString().split("T")[0] : "",
      p.gender || "",
      p.dob ? new Date(p.dob).toISOString().split("T")[0] : "",
      p.address || "",
      p.notes || "",
      p.createdAt ? new Date(p.createdAt).toISOString() : "",
    ]);

    // ✅ Build CSV content
    const csv =
      headers.join(",") +
      "\n" +
      rows.map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");

    return new Response(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition":
          'attachment; filename="patients_export.csv"',
      },
    });
  } catch (error) {
    console.error("Export failed:", error);
    return NextResponse.json(
      { error: "Failed to export patients" },
      { status: 500 }
    );
  }
}

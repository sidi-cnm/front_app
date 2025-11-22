import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // ✅ Fetch patient
    const patient = await db.patient.findUnique({
      where: { id: params.id },
    });

    if (!patient) {
      return NextResponse.json(
        { error: "Patient not found" },
        { status: 404 }
      );
    }

    // ✅ Fetch documents for this patient
    const documents = await db.patientDocument.findMany({
      where: { patientId: params.id },
      orderBy: { date: "desc" },
    });

    return NextResponse.json({
      patient,
      documents,
    });
  } catch (error) {
    console.error("Error fetching patient:", error);

    return NextResponse.json(
      { error: "Failed to fetch patient" },
      { status: 500 }
    );
  }
}

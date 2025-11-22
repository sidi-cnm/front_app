import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const patients = await db.patient.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    return NextResponse.json(
      { error: "Failed to fetch patients" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      idnum,
      lastVisit,
      gender,
      dob,
      address,
      status,
      notes,
    } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    const newPatient = await db.patient.create({
      data: {
        name,
        email: email || "",
        phone: phone || "",
        idnum: idnum || "",
        lastVisit: lastVisit ? new Date(lastVisit) : null,
        gender: gender || "",
        dob: dob ? new Date(dob) : null,
        address: address || "",
        status: status || "",
        notes: notes || "",
      },
    });

    return NextResponse.json(newPatient, { status: 201 });
  } catch (error) {
    console.error("Error creating patient:", error);

    return NextResponse.json(
      { error: "Failed to create patient" },
      { status: 500 }
    );
  }
}



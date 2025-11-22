import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { parse } from "csv-parse/sync";

export async function POST(req: Request) {
  try {
    // ✅ Read raw CSV text
    const csvText = await req.text();

    // ✅ Parse CSV
    const records = parse(csvText, {
      columns: true,
      skip_empty_lines: true,
    });

    let importedCount = 0;

    for (const row of records) {
      await db.patient.create({
        data: {
          name: row["Name"] || "",
          email: row["Email"] || "",
          phone: row["Phone"] || "",
          idnum: row["Enroll Number"] || "",
          lastVisit: row["Last Visit"] ? new Date(row["Last Visit"]) : null,
          gender: row["Gender"] || "",
          dob: row["Date of Birth"] ? new Date(row["Date of Birth"]) : null,
          address: row["Address"] || "",
          notes: row["Notes"] || "",
        },
      });

      importedCount++;
    }

    return NextResponse.json({
      message: `✅ Imported ${importedCount} patients`,
      count: importedCount,
    });
  } catch (error) {
    console.error("Import failed:", error);
    return NextResponse.json({ error: "Import failed" }, { status: 500 });
  }
}

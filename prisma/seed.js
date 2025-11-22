import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  console.log("🧹 Clearing existing data...");
  await db.user.deleteMany();
  await db.patientDocument.deleteMany();
  await db.appointment.deleteMany();
  await db.invoice.deleteMany();
  await db.patient.deleteMany();

  console.log("✅ Collections cleared!");

  // -------- USERS --------
  console.log("👤 Seeding users...");
  await db.user.createMany({
    data: [
      {
        name: "Sidi Elvaly",
        email: "sidielvaly@gmail.com",
        passwordHash: await bcrypt.hash("pass123", 10),
      },
      {
        name: "Khatu Ahmed",
        email: "khatu@gmail.com",
        passwordHash: await bcrypt.hash("pass123", 10),
      },
    ],
  });

  // -------- PATIENTS --------
  console.log("🧑‍⚕️ Seeding patients...");
  const patients = await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      db.patient.create({
        data: {
          name: `Patient ${i + 1}`,
          email: `patient${i + 1}@mail.com`,
          phone: `+222 44 44 44 ${i + 1}`,
          idnum: `MRN-${1000 + i}`,
          lastVisit: new Date(Date.now() - i * 86400000 * 5),
          dob: new Date(1990, 1, i + 1),
          status: i % 3 === 0 ? "HIGH" : i % 3 === 1 ? "MEDIUM" : "LOW",
        },
      })
    )
  );

  // -------- APPOINTMENTS --------
  console.log("📅 Seeding appointments...");
  await Promise.all(
    patients.slice(0, 6).map((p, i) =>
      db.appointment.create({
        data: {
          patientId: p.id,
          date: new Date(Date.now() + i * 86400000),
          room: `Consultation ${i + 1}`,
          type: i % 3 === 0 ? "CHECKUP" : i % 3 === 1 ? "FOLLOWUP" : "EMERGENCY",
        },
      })
    )
  );

  // -------- INVOICES --------
  console.log("💰 Seeding invoices...");
  await Promise.all(
    patients.slice(0, 2).map((p, i) =>
      db.invoice.create({
        data: {
          patientId: p.id,
          amount: 50 + i * 25,
          dueDate: new Date(Date.now() + i * 86400000 * 3),
          status: "PENDING",
        },
      })
    )
  );

    await Promise.all(
    patients.slice(0, 3).map((p, i) =>
      db.invoice.create({
        data: {
          patientId: p.id,
          amount: 50 + i * 25,
          dueDate: new Date(Date.now() + i * 86400000 * 3),
          status: "PAID",
        },
      })
    )
  );
  

  console.log("✅✅ Seeding complete!");
}

main()
  .catch((e) => console.error("❌ Seeding failed:", e))
  .finally(() => db.$disconnect());

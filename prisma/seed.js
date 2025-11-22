const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const url = process.env.DATABASE_URL;
const client = new MongoClient(url);

async function main() {
  await client.connect();
  const db = client.db(); // uses DB name from URL

  console.log("🧹 Clearing existing data...");
  await db.collection("User").deleteMany({});
  await db.collection("Patient").deleteMany({});
  await db.collection("PatientDocument").deleteMany({});

  console.log("✅ Collections cleared!");

  // -------- USERS --------
  console.log("👤 Seeding users...");
  const users = [
    {
      name: "Sidi Elvaly",
      email: "sidielvaly@gmail.com",
      passwordHash: await bcrypt.hash("pass123", 10),
      image: "/images/patients/sidielvaly.jpg",
      createdAt: new Date(),
    },
    {
      name: "Khatu Ahmed",
      email: "khatu@gmail.com",
      passwordHash: await bcrypt.hash("pass123", 10),
      image: "/images/patients/khatu.jpg",
      createdAt: new Date(),
    },
  ];

  await db.collection("User").insertMany(users);

  // -------- PATIENTS --------
  console.log("🧑‍⚕️ Seeding patients...");
  const patients = [
    {
      name: "Aïcha Diop 2",
      email: "aicha.diop2@example.com",
      phone: "222 45 67 89",
      idnum: "SN-2023-0001",
      lastVisit: new Date("2023-12-08"),
      photo: "/images/patients/aicha.jpg",
      status: "ACTIVE",
      createdAt: new Date(),
    },
    {
      name: "Mamadou Ba 2",
      email: "m.ba2@example.com",
      phone: "222 55 11 22",
      idnum: "SN-2023-0002",
      lastVisit: new Date("2023-12-07"),
      photo: "/images/patients/mamadou.jpg",
      status: "ACTIVE",
      createdAt: new Date(),
    },
  ];

  const result = await db.collection("Patient").insertMany(patients);

  // Map idnum → _id
  const patientIndex = {};
  Object.values(result.insertedIds).forEach((id, i) => {
    patientIndex[patients[i].idnum] = id;
  });

  // -------- DOCUMENTS --------
  console.log("📄 Seeding documents...");
  const documents = [
    {
      patientId: patientIndex["SN-2023-0001"],
      title: "Les symptômes de l’hypertension artérielle...",
      date: new Date("2023-01-19"),
      isFavorite: true,
      createdAt: new Date(),
    },
    {
      patientId: patientIndex["SN-2023-0001"],
      title: "Bilan sanguin – suivi diabète de type 2...",
      date: new Date("2023-02-22"),
      isFavorite: false,
      createdAt: new Date(),
    },
    {
      patientId: patientIndex["SN-2023-0002"],
      title: "Compte-rendu d’IRM cérébrale...",
      date: new Date("2023-03-05"),
      isFavorite: false,
      createdAt: new Date(),
    },
  ];

  await db.collection("PatientDocument").insertMany(documents);

  console.log("✅✅ Seeding complete!");
  await client.close();
}

main().catch((e) => {
  console.error("❌ Seeding failed:", e);
});

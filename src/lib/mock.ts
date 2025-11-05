// src/lib/mock.ts
import type { Patient } from "@/types/patient";

// --- Patients (your updated list with distinct names) ---
export const patients: Patient[] = [
  {
    id: "p-1",
    name: "Aïcha Diop",
    email: "aicha.diop@example.com",
    phone: "222 45 67 89",
    idnum: "SN-2023-0001",
    lastVisit: "08-Dec, 2023",
    photo: "/images/patients/aicha.jpg",
  },
  {
    id: "p-2",
    name: "Mamadou Ba",
    email: "m.ba@example.com",
    phone: "222 55 11 22",
    idnum: "SN-2023-0002",
    lastVisit: "07-Dec, 2023",
    photo: "/images/patients/mamadou.jpg",
  },
  {
    id: "p-3",
    name: "Khadija Ahmed",
    email: "khadija.ahmed@example.com",
    phone: "222 66 77 88",
    idnum: "SN-2023-0003",
    lastVisit: "03-Dec, 2023",
    photo: "/images/patients/khadija.jpg",
  },
  {
    id: "p-4",
    name: "Ismael Ould Salem",
    email: "ismael.salem@example.com",
    phone: "222 33 44 55",
    idnum: "SN-2023-0004",
    lastVisit: "01-Dec, 2023",
    photo: "/images/patients/ismael.jpg",
  },
  {
    id: "p-5",
    name: "Fatou Sy",
    email: "fatou.sy@example.com",
    phone: "222 77 00 11",
    idnum: "SN-2023-0005",
    lastVisit: "29-Nov, 2023",
    photo: "/images/patients/fatou.jpg",
  },
  {
    id: "p-6",
    name: "Cheikh Ndiaye",
    email: "cheikh.ndiaye@example.com",
    phone: "222 88 99 00",
    idnum: "SN-2023-0006",
    lastVisit: "26-Nov, 2023",
    photo: "/images/patients/cheikh.jpg",
  },
  {
    id: "p-7",
    name: "Salma El-Mansouri",
    email: "salma.mansouri@example.com",
    phone: "222 12 34 56",
    idnum: "SN-2023-0007",
    lastVisit: "20-Nov, 2023",
    photo: "/images/patients/salma.jpg",
  },
  {
    id: "p-8",
    name: "Oumar Kane",
    email: "oumar.kane@example.com",
    phone: "222 98 76 54",
    idnum: "SN-2023-0008",
    lastVisit: "18-Nov, 2023",
    photo: "/images/patients/oumar.jpg",
  },
  {
    id: "p-9",
    name: "Mouna Ben Ali",
    email: "mouna.benali@example.com",
    phone: "222 23 45 67",
    idnum: "SN-2023-0009",
    lastVisit: "12-Nov, 2023",
    photo: "/images/patients/mouna.jpg",
  },
  {
    id: "p-10",
    name: "Yacoub Sow",
    email: "yacoub.sow@example.com",
    phone: "222 34 56 78",
    idnum: "SN-2023-0010",
    lastVisit: "10-Nov, 2023",
    photo: "/images/patients/yacoub.jpg",
  },
];

// --- Docs & suggestions used by profile/search UIs ---
export type Doc = {
  id: string;
  title: string;
  snippet: string;
  date: string;
  score: number;
  fav: boolean;
  recent: boolean;
};

export const docs: Doc[] = [
  {
    id: "d1",
    title: "Les symptômes de l’hypertension artérielle",
    snippet: "Maux de tête, vertiges, bourdonnements d’oreilles...",
    date: "19/07/2023",
    score: 86,
    fav: false,
    recent: true,
  },
  {
    id: "d2",
    title: "Endometrial ablation: procedure overview",
    snippet: "Procedure used to destroy or remove the endometrium...",
    date: "19/07/2023",
    score: 73,
    fav: true,
    recent: false,
  },
];

export const suggestions = ["HTA", "Diabète", "Cholestérol", "Asthme"];

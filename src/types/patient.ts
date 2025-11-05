// src/types/patient.ts
export type Patient = {
  id: string;
  name: string;
  email: string;
  phone: string;

  // Table fields
  idnum?: string;          // <-- add
  lastVisit?: string;      // <-- add
  photo?: string | null;   // <-- add

  // Keep anything else you already had here as optional to avoid breakage:
  enrollNumber?: string;
  gender?: string;
  dob?: string;
  address?: string;
  allergies?: string[];
  conditions?: string[];
  meds?: string[];
  stats?: { docs: number; favorites: number; lastScore: number };
  vitals?: { height: number; weight: number; bmi: number; bp: string; hr: number };
};

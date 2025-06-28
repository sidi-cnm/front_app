"use client";

import React from "react";
import Link from "next/link";

export interface Patient {
  id: string; // ← Ajouter cette ligne
  name: string;
  email: string;
  phone: string;
  enroll: string;
  lastVisit: string;
}


export default function PatientItem({ patient }: { patient: Patient }) {
  return (
    <tr className="bg-white w-full hover:bg-gray-50 transition border-2 border-gray-300 rounded-md">
      <td className="p-3 flex items-center">
        <Link href={`/patients/${patient.id}`} className="text-blue-600 hover:underline">
          {patient.name}
        </Link>
      </td>
      <td className="p-3">{patient.email}</td>
      <td className="p-3">{patient.phone}</td>
      <td className="p-3">{patient.enroll}</td>
      <td className="p-3">{patient.lastVisit}</td>
      <td className="p-3 flex space-x-2">
        <span className="text-yellow-500 cursor-pointer">✎</span>
        <span className="text-yellow-500 cursor-pointer">⋮</span>
      </td>
    </tr>
  );
}
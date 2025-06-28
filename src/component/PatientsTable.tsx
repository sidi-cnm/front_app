"use client";

import React from "react";
import Link from "next/link";

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  enroll: string;
  lastVisit: string;
}

export default function PatientItem({ patient }: { patient: Patient }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 border-b border-gray-200">
        <Link 
          href={`/patients/${patient.id}`}
          className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
        >
          {patient.name}
        </Link>
      </td>
      <td className="px-4 py-3 border-b border-gray-200 text-gray-600">
        {patient.email}
      </td>
      <td className="px-4 py-3 border-b border-gray-200 text-gray-600">
        {patient.phone}
      </td>
      <td className="px-4 py-3 border-b border-gray-200 text-gray-600">
        {patient.enroll}
      </td>
      <td className="px-4 py-3 border-b border-gray-200 text-gray-600">
        {patient.lastVisit}
      </td>
      <td className="px-4 py-3 border-b border-gray-200">
        <div className="flex space-x-3">
          <button className="text-blue-500 hover:text-blue-700">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <button className="text-yellow-500 hover:text-yellow-700">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}
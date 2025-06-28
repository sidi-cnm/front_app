// app/patients/page.tsx
import HeaderComponent from "../../component/HeaderSearch";
import SearchBar from "../../component/Searchbar";
import PatientItem, { Patient } from "../../component/PatientsTable";
import React from "react"; // Nécessaire pour <React.Fragment>

const patients: Patient[] = [
  {
    name: "Karthi",
    email: "karthi@gmail.com",
    phone: "750547760",
    enroll: "123450547760",
    lastVisit: "08-Dec-2021",
  },
  {
    name: "John",
    email: "john@example.com",
    phone: "123456789",
    enroll: "987654321",
    lastVisit: "10-Dec-2021",
  },
];

export default function PatientsPage() {
  return (
    <div className="min-h-screen">
      <div className="p-2 flex justify-between items-center">
        <h2 className="text-md font-semibold">Tableau de bord</h2>
        <button className="text-blue-600">Profil</button>
      </div>

      <HeaderComponent pageName="Pages / Patients" />

      <div className="p-4">
        <h1 className="text-2xl font-bold text-blue-900 mb-4">Patient page</h1>
        <SearchBar initialPatients={patients} />

        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Patients Table</h2>
          <table className="w-full text-left border-collapse bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Enroll Number</th>
                <th className="p-3">Last Visit</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p, i) => (
                <React.Fragment key={i}>
                  <PatientItem patient={p} />
                  {/* ligne de séparation */}
                  <tr>
                    <td colSpan={6}>
                      <div className="h-4 bg-gray-100"></div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

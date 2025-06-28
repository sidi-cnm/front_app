// app/patients/page.tsx
import HeaderComponent from "../../component/HeaderSearch";
import SearchBar from "../../component/Searchbar";
import PatientItem, { Patient } from "../../component/PatientsTable";
import React from "react";

const patients: Patient[] = [
  {
    id: "1",
    name: "Karthi",
    email: "karthi@gmail.com",
    phone: "750547760",
    enroll: "123450547760",
    lastVisit: "08-Dec-2021",
  },
  {
    id: "2",
    name: "John",
    email: "john@example.com",
    phone: "123456789",
    enroll: "987654321",
    lastVisit: "10-Dec-2021",
  },
];

export default function PatientsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="p-4 flex justify-between items-center bg-white border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Tableau de bord</h2>
        <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
          Profil
        </button>
      </div>

      <HeaderComponent pageName="Pages / Patients" />

      {/* Main Content */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm">
            + Add New Patient
          </button>
        </div>

        {/* Search and Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <SearchBar initialPatients={patients} />
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm font-medium">
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Enroll Number</th>
                  <th className="p-4">Last Visit</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {patients.map((p, i) => (
                  <React.Fragment key={i}>
                    <PatientItem patient={p} />
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center text-sm text-gray-600">
            <div>Showing 1 to {patients.length} of {patients.length} entries</div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">Previous</button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
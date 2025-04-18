import DashboardLayout from "@/component/layout/DashboardLayout";
import Table from "@/component/Table";


const mockPatients = Array.from({ length: 8 }).map((_, index) => ({
  id: index,
  name: "Karthi",
  email: "karthi@gmmail.com",
  phone: "7305477760",
  enrollNumber: "1234567305477760",
  lastVisit: "08-Dec, 2021",
  avatar: "https://i.pravatar.cc/150?img="+index
}));

export default function PatientsPage() {
  return (
    <DashboardLayout>
      <h1 className="text-xl font-semibold mb-4">Patients Table</h1>
      <Table data={mockPatients} />
    </DashboardLayout>
  );
}

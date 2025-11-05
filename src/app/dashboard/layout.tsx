// Make sure Sidebar exists at the correct path, or update the import path accordingly
// If Sidebar is located in src/components/Sidebar.tsx, use the alias import:
// Update the import path if Sidebar exists elsewhere, e.g.:
import Sidebar from "@/components/Sidebar";


// Or create Sidebar at src/components/Sidebar.tsx if it does not exist.

export default function DashLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex">
      <div className="bg-transparent md:bg-transparent md:border-r md:border-gray-100">
        <Sidebar />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

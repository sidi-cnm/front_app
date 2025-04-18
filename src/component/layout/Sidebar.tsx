import { FaUser, FaSignOutAlt, FaHome, FaFileInvoice } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-white shadow-md flex flex-col justify-between">
      <div className="p-6">
        <h1 className="text-xl font-bold text-teal-600 mb-6">SanaMed</h1>
        <nav className="space-y-3 text-gray-700">
          <div className="flex items-center gap-3 text-teal-600 font-medium">
            <FaHome />
            Dashboard
          </div>
          <div className="flex items-center gap-3 bg-teal-50 p-2 rounded-lg">
            <FaUser />
            Patients
          </div>
          <div className="flex items-center gap-3">
            <FaFileInvoice />
            Billing
          </div>
        </nav>
        <hr className="my-6" />
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <FaUser />
            Profile
          </div>
          <div className="flex items-center gap-3 text-red-500">
            <FaSignOutAlt />
            Sign out
          </div>
        </div>
      </div>
      <div className="bg-teal-100 m-4 p-4 rounded-lg text-sm text-center">
        <p className="mb-2">Need help?</p>
        <button className="bg-white text-teal-600 px-3 py-1 rounded-md font-semibold text-xs">
          DOCUMENTATION
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

import Image from "next/image";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

type Patient = {
  id: number;
  name: string;
  email: string;
  phone: string;
  enrollNumber: string;
  lastVisit: string;
  avatar: string;
};

const Table = ({ data }: { data: Patient[] }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      {/* Top Controls */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search patient..."
          className="border border-gray-300 px-4 py-2 rounded-md w-1/3 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <button className="bg-blue-900 text-white px-5 py-2 rounded-md text-sm hover:bg-blue-800 transition">
          + New Patient
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-separate border-spacing-y-2">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Enroll Number</th>
              <th>Last Visit</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr
                key={p.id}
                className="bg-white shadow rounded-lg transition hover:shadow-md"
              >
                <td className="px-4 py-3 flex items-center gap-3 font-medium text-gray-800">
                  <Image
                    src={p.avatar}
                    alt={`${p.name}'s avatar`}
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-full border object-cover"
                  />
                  {p.name}
                </td>
                <td className="px-4 py-3 text-gray-600">{p.email}</td>
                <td className="px-4 py-3 text-gray-600">{p.phone}</td>
                <td className="px-4 py-3 text-gray-600">{p.enrollNumber}</td>
                <td className="px-4 py-3 text-gray-600">{p.lastVisit}</td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-4 text-lg">
                    <FaRegEdit
                      className="cursor-pointer text-orange-500 hover:scale-110 transition"
                      title="Edit"
                    />
                    <FaRegTrashAlt
                      className="cursor-pointer text-red-500 hover:scale-110 transition"
                      title="Delete"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

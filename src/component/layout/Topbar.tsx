const Topbar = () => {
    return (
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div className="text-gray-600 font-medium text-sm">
          <span className="text-teal-600 font-semibold">Pages</span> / Patients
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Type here..."
            className="px-4 py-1 border rounded-lg text-sm"
          />
          <span className="text-sm text-gray-600">Sign In</span>
        </div>
      </div>
    );
  };
  
  export default Topbar;
  
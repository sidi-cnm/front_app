
function ProfileHeader() {
  return (
    <div className="flex items-center p-4 border-b">
      <img src="https://via.placeholder.com/40" alt="Profile" className="rounded-full mr-4" />
      <div>
        <h2 className="font-semibold">Karthi</h2>
        <p className="text-gray-500 text-sm">karthi@gmail.com</p>
      </div>
    </div>
  );
}
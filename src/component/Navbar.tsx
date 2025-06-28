"use client";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-6">
      <div className="flex items-center">
        {/* Mobile menu button (hidden on desktop) */}
        <button className="md:hidden p-2 mr-2 text-gray-500 hover:text-gray-600 focus:outline-none">
          {/* Hamburger menu SVG */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 5H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M2.5 10H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M2.5 15H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        
        <h1 className="font-semibold text-gray-800">Tableau de bord</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none">
          <span className="sr-only">Notifications</span>
          {/* Bell icon SVG */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 17H20L18.595 15.595C18.214 15.214 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.214 5.40493 15.595L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-medium">
            JP
          </div>
          <span className="ml-2 text-sm font-medium text-gray-700 hidden md:inline">Jean Dupont</span>
        </div>
      </div>
    </header>
  );
}











// const Topbar = () => {
//     return (
//       <div className="flex items-center justify-between px-6 py-4 border-b">
//         <div className="text-gray-600 font-medium text-sm">
//           <span className="text-teal-600 font-semibold">Pages</span> / Patients
//         </div>
//         <div className="flex items-center gap-4">
//           <input
//             type="text"
//             placeholder="Type here..."
//             className="px-4 py-1 border rounded-lg text-sm"
//           />
//           <span className="text-sm text-gray-600">Sign In</span>
//         </div>
//       </div>
//     );
//   };
  
//   export default Topbar;
  
import "./globals.css";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-50">
        <div className="flex min-h-screen">
          {/* Sidebar - Fixed width */}
          <div className="hidden md:flex md:w-64 lg:w-72 xl:w-80">
            <Sidebar />
          </div>
          
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Navbar - Sticky positioned */}
            <header className="sticky top-0 z-10">
              <Navbar />
            </header>
            
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 transition-all duration-300">
              <div className="mx-auto max-w-7xl">
                {/* Container with white background and subtle shadow */}
                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
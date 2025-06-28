import "./globals.css";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="p-6 bg-gray-100 flex-grow">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}

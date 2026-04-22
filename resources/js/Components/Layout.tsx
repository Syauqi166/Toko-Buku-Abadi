import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Home, BookOpen, BookMarked, History, Menu, X, User } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { url } = usePage(); // ← ganti useLocation dari react-router
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { path: "/",                 label: "Beranda",      icon: Home },
    { path: "/pencarian-buku",   label: "Katalog",      icon: BookOpen },
    { path: "/peminjaman-buku",  label: "Pinjaman Saya", icon: BookMarked },
    { path: "/riwayat",          label: "Riwayat",      icon: History },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1e3a8a] text-white shadow-lg sticky top-0 z-50">
        <div className="px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div className="flex items-center gap-3">
                <BookOpen className="w-8 h-8" />
                <div>
                  <h1 className="text-xl font-semibold">Sistem Informasi Perpustakaan</h1>
                  <p className="text-xs text-blue-200">Perpustakaan Digital Akademik</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-lg">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium">Peminjam</p>
                <p className="text-xs text-blue-200">Anggota</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-[73px] left-0 h-[calc(100vh-73px)] bg-white shadow-lg z-40 transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          } w-64`}
        >
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const isActive = url === item.path; // ← ganti location.pathname
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}  // ← ganti "to" menjadi "href"
                      onClick={() => setIsSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? "bg-[#1e3a8a] text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          {children}
        </main>
      </div>
    </div>
  );
}
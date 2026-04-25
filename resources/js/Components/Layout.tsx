import { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { Home, BookMarked, History, Menu, X, User, LogOut, LogIn } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { url, props } = usePage();
  const user = (props.auth as any)?.user as { name: string; email: string } | undefined;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { path: "/",                label: "Beranda",       icon: Home },
    { path: "/peminjaman-buku", label: "Pinjaman Saya", icon: BookMarked },
    { path: "/riwayat",         label: "Riwayat",       icon: History },
  ];

  const handleLogout = () => {
    router.post("/logout");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#092148] text-white shadow-lg sticky top-0 z-50">
        <div className="px-4 lg:px-8 py-3">
          <div className="flex items-center justify-between">

            {/* Kiri: Hamburger + Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <Link href="/">
                <img
                  src="/images/Logo Toko-Buku-Abadi.svg"
                  alt="Toko Buku Abadi"
                  className="h-10 w-auto ml-4"
                />
              </Link>
            </div>

            {/* Kanan: User info atau tombol Login */}
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  {/* Info user saat sudah login */}
                  <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-lg">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-blue-200">Anggota</p>
                    </div>
                  </div>
                  {/* Tombol Logout */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2  hover:bg-white/20 rounded-lg text-sm transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </>
              ) : (
                /* Tombol Login saat belum login */
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 bg-white text-[#092148] rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Masuk
                </Link>
              )}
            </div>

          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-[72px] left-0 h-[calc(100vh-72px)] bg-white shadow-lg z-40 transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          } w-64`}
        >
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const isActive = url === item.path;
                const Icon = item.icon;
                const requiresAuth =
                  item.path === "/peminjaman-buku" || item.path === "/riwayat";

                return (
                  <li key={item.path}>
                    {requiresAuth && !user ? (
                      // Menu yang butuh login tapi belum login
                      <Link
                        href="/login"
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-gray-400 hover:bg-gray-100"
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                        <span className="ml-auto text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">
                          Login
                        </span>
                      </Link>
                    ) : (
                      <Link
                        href={item.path}
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          isActive
                            ? "bg-[#092148] text-white shadow-md"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Info login di sidebar kalau belum login */}
            {!user && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-xs text-[#092148] text-center mb-3">
                  Login untuk mengakses fitur peminjaman dan riwayat
                </p>
                <Link
                  href="/login"
                  className="block w-full text-center py-2 bg-[#092148] text-white rounded-lg text-sm font-medium hover:bg-[#2858A6] transition-colors"
                >
                  Masuk Sekarang
                </Link>
              </div>
            )}
          </nav>
        </aside>

        {/* Overlay untuk mobile */}
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
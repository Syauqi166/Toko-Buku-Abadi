import { Search, BookOpen, TrendingUp, Users } from "lucide-react";
import { Link } from "@inertiajs/react";
import Layout from "@/Components/Layout";

// ================================
// Interface / Type Definitions
// ================================

interface Stat {
  label: string;
  value: string;
  color: string;
}

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  status: "Tersedia" | "Dipinjam";
}

interface DashboardProps {
  stats: Stat[];
  recentBooks: Book[];
}

// ================================
// Icon mapping berdasarkan index
// ================================

const STAT_ICONS = [BookOpen, TrendingUp, Users];

// ================================
// Komponen Utama
// ================================

export default function Dashboard({ stats, recentBooks }: DashboardProps) {
  return (
    <Layout>
      <div className="p-6 lg:p-8">

        {/* Hero Section with Welcome & Search */}
        <div className="relative bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] rounded-2xl shadow-lg p-8 lg:p-12 mb-8 overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1566314748815-2ff5db8edf2b?auto=format&fit=crop&w=1080&q=80')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="relative z-10">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              Selamat Datang di Perpustakaan Digital
            </h1>
            <p className="text-blue-100 mb-8">
              Temukan koleksi buku akademik dan literatur terbaik untuk mendukung pembelajaran Anda
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl">
              <div className="bg-white rounded-lg shadow-xl p-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Cari judul buku di sini..."
                  className="flex-1 px-4 py-3 text-gray-900 focus:outline-none"
                />
                <Link
                  href="/pencarian-buku"
                  className="px-6 py-3 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e40af] transition-colors flex items-center gap-2 font-medium"
                >
                  <Search className="w-5 h-5" />
                  Cari
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards — data dari Laravel Controller */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = STAT_ICONS[index] ?? BookOpen;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Books — data dari Laravel Controller */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Buku Terbaru</h2>
            <Link
              href="/pencarian-buku"
              className="text-[#1e3a8a] hover:text-[#1e40af] font-medium text-sm"
            >
              Lihat Semua →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentBooks.map((book) => (
              <div key={book.id} className="group cursor-pointer">
                <div className="relative aspect-[3/4] mb-3 rounded-lg overflow-hidden bg-gray-100 shadow-md group-hover:shadow-xl transition-shadow">
                  <img
                    src={book.cover ?? `https://placehold.co/300x400?text=${encodeURIComponent(book.title)}`}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        book.status === "Tersedia"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {book.status}
                    </span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{book.title}</h3>
                <p className="text-sm text-gray-600">{book.author}</p>
              </div>
            ))}
          </div>

          {/* Tampil jika tidak ada buku */}
          {recentBooks.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Belum ada buku tersedia</p>
            </div>
          )}
        </div>

      </div>
    </Layout>
  );
}
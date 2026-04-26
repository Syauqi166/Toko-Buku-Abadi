import { useState } from "react";
import { Search, BookOpen, TrendingUp } from "lucide-react";
import { Link, router } from "@inertiajs/react";
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
  year: number;
  cover: string | null;
  status: "Tersedia" | "Dipinjam";
}

interface DropdownBook {
  id: number;
  title: string;
  author: string;
  cover: string | null;
  status: "Tersedia" | "Dipinjam";
}

interface DashboardProps {
  stats: Stat[];
  recentBooks: Book[];
}

// ================================
// Icon mapping berdasarkan index
// ================================

const STAT_ICONS = [BookOpen, TrendingUp];

// ================================
// Komponen Utama
// ================================

export default function Dashboard({ stats, recentBooks }: DashboardProps) {
  const [query, setQuery]                   = useState("");
  const [dropdownResults, setDropdownResults] = useState<DropdownBook[]>([]);
  const [showDropdown, setShowDropdown]     = useState(false);
  const [isSearching, setIsSearching]       = useState(false);

  // ================================
  // Search dropdown realtime
  // ================================
  const handleInputChange = async (value: string) => {
    setQuery(value);
    if (value.trim().length < 2) {
      setDropdownResults([]);
      setShowDropdown(false);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    try {
      const res  = await fetch(`/api/books/dropdown?q=${encodeURIComponent(value)}`);
      const data = await res.json();
      setDropdownResults(data);
      setShowDropdown(true);
    } catch {
      // silent fail
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = () => {
    setShowDropdown(false);
    router.visit(`/pencarian-buku?q=${encodeURIComponent(query)}`);
  };

  return (
    <Layout>
      <div className="p-6 lg:p-8">

        {/* Hero Section with Welcome & Search */}
        <div className="relative bg-gradient-to-r from-[#092148] to-[#1a4a8a] rounded-2xl shadow-lg p-8 lg:p-12 mb-8">
          <div
            className="absolute inset-0 opacity-10 overflow-hidden"
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

            {/* Search Bar dengan Dropdown */}
            <div className="max-w-3xl relative">
              <div className="bg-white rounded-lg shadow-xl p-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Cari judul buku di sini..."
                  value={query}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  onFocus={() => dropdownResults.length > 0 && setShowDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                  className="flex-1 px-4 py-3 text-gray-900 focus:outline-none border-0 outline-none ring-0 focus:ring-0"
                />
                <button
                  onClick={handleSearch}
                  className="px-6 py-3 bg-[#092148] text-white rounded-lg hover:bg-[#0d2d5e] transition-colors flex items-center gap-2 font-medium"
                >
                  <Search className={`w-5 h-5`} />
                  Cari
                </button>
              </div>

              {/* Dropdown hasil pencarian */}
              {showDropdown && dropdownResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-xl mt-1 z-50 overflow-hidden">
                  {dropdownResults.map((book) => (
                    <Link
                      key={book.id}
                      href={`/buku/${book.id}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                    >
                      <img
                        src={book.cover ?? `https://placehold.co/40x56?text=Buku`}
                        alt={book.title}
                        className="w-10 h-14 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">{book.title}</p>
                        <p className="text-xs text-gray-500">{book.author}</p>
                      </div>
                      <span className={`flex-shrink-0 text-xs px-2 py-1 rounded-full ${
                        book.status === "Tersedia"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {book.status}
                      </span>
                    </Link>
                  ))}
                  {/* Lihat semua hasil */}
                  <button
                    onClick={handleSearch}
                    className="w-full px-4 py-3 text-center text-sm text-[#092148] font-medium hover:bg-blue-50 transition-colors"
                  >
                    Lihat semua hasil pencarian →
                  </button>
                </div>
              )}

              {/* Tidak ditemukan */}
              {showDropdown && dropdownResults.length === 0 && !isSearching && query.length >= 2 && (
                <div className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-xl mt-1 z-50 p-4 text-center text-gray-500 text-sm">
                  Buku tidak ditemukan
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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

        {/* Recent Books */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Buku Terbaru</h2>
            <Link
              href="/pencarian-buku"
              className="text-[#092148] hover:text-[#0d2d5e] font-medium text-sm"
            >
              Lihat Semua →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentBooks.map((book) => (
              <Link
                key={book.id}
                href={`/buku/${book.id}`}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] mb-3 rounded-lg overflow-hidden bg-gray-100 shadow-md group-hover:shadow-xl transition-shadow">
                  <img
                    src={book.cover ?? `https://placehold.co/300x400?text=${encodeURIComponent(book.title)}`}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      book.status === "Tersedia"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}>
                      {book.status}
                    </span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{book.title}</h3>
                <p className="text-sm text-gray-600">{book.author}</p>
              </Link>
            ))}
          </div>

          {/* Empty state */}
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
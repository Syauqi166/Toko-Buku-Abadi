import { useState } from "react";
import { Search, BookOpen } from "lucide-react";
import { router, usePage } from "@inertiajs/react";
import Layout from "@/Components/Layout";

// ================================
// Interface / Type Definitions
// ================================

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  cover: string | null;
  status: "Tersedia" | "Dipinjam";
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginatedBooks {
  data: Book[];
  total: number;
  current_page: number;
  last_page: number;
  links: PaginationLink[];
}

interface BookSearchProps {
  books: PaginatedBooks;
  searchQuery: string;
}

// ================================
// Komponen Utama
// ================================

export default function BookSearch({ books, searchQuery }: BookSearchProps) {
  const [query, setQuery] = useState(searchQuery ?? "");
  const [isLoading, setIsLoading] = useState(false);

  // ================================
  // Handle Search — kirim ke Laravel
  // ================================
  const handleSearch = () => {
    setIsLoading(true);
    router.get(
      "/pencarian-buku",
      { q: query },
      {
        preserveState: true,   // jaga scroll position
        preserveScroll: true,
        only: ["books", "searchQuery"], // hanya refresh data buku
        onFinish: () => setIsLoading(false),
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  // ================================
  // Handle Pagination
  // ================================
  const handlePageChange = (url: string | null) => {
    if (!url) return;
    setIsLoading(true);
    router.get(
      url,
      { q: query },
      {
        preserveState: true,
        preserveScroll: false,
        only: ["books"],
        onFinish: () => setIsLoading(false),
      }
    );
  };

  const hasSearched = searchQuery !== "" && searchQuery !== undefined;

  return (
    <Layout>
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">

          {/* Hero Section with Search */}
          <div className="relative bg-gradient-to-r from-[#092148] to-[#2858A6] rounded-2xl shadow-lg p-8 lg:p-12 mb-8 overflow-hidden">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1566314748815-2ff5db8edf2b?auto=format&fit=crop&w=1080&q=80')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="relative z-10 text-center">
              <BookOpen className="w-16 h-16 text-white mx-auto mb-4" />
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Katalog Buku</h1>
              <p className="text-blue-100 mb-8">
                Cari dan jelajahi koleksi buku perpustakaan kami
              </p>

              {/* Search Bar */}
              <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow-xl p-2 flex gap-2">
                  <input
                    type="text"
                    placeholder="Cari judul buku di sini..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 px-4 py-3 text-gray-900 focus:outline-none"
                  />
                  <button
                    onClick={handleSearch}
                    disabled={isLoading}
                    className="px-6 py-3 bg-[#092148] text-white rounded-lg hover:bg-[#2858A6] transition-colors flex items-center gap-2 font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <Search className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`} />
                    {isLoading ? "Mencari..." : "Cari"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Error: tidak ditemukan */}
          {hasSearched && books.data.length === 0 && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-center font-medium">
                Buku "<span className="font-bold">{searchQuery}</span>" tidak ditemukan
              </p>
            </div>
          )}

          {/* Daftar Buku */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                {hasSearched
                  ? `Hasil Pencarian (${books.total} buku ditemukan)`
                  : "Semua Buku"}
              </h2>
              {hasSearched && (
                <button
                  onClick={() => {
                    setQuery("");
                    router.get("/pencarian-buku", {}, { preserveState: false });
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Tampilkan semua
                </button>
              )}
            </div>

            {/* Loading overlay */}
            {isLoading && (
              <div className="flex justify-center py-12">
                <div className="w-10 h-10 border-4 border-[#092148] border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {/* Grid Buku */}
            {!isLoading && books.data.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {books.data.map((book) => (
                  <div
                    key={book.id}
                    className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative aspect-[3/4] bg-gray-100">
                      <img
                        src={
                          book.cover ??
                          `https://placehold.co/300x400?text=${encodeURIComponent(book.title)}`
                        }
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
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                        {book.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">{book.author}</p>
                      <p className="text-xs text-gray-500">Tahun: {book.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty state awal */}
            {!isLoading && books.data.length === 0 && !hasSearched && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Belum ada buku tersedia</p>
              </div>
            )}

            {/* Pagination */}
            {!isLoading && books.last_page > 1 && (
              <div className="mt-8 flex justify-center gap-2 flex-wrap">
                {books.links.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(link.url)}
                    disabled={!link.url || link.active}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      link.active
                        ? "bg-[#092148] text-white cursor-default"
                        : link.url
                        ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                        : "bg-white border border-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </Layout>
  );
}
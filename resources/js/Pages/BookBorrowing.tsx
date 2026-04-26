import { useState } from "react";
import { Search, X, AlertCircle, BookMarked } from "lucide-react";
import { toast } from "sonner";
import { router } from "@inertiajs/react";
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

interface BorrowedBook extends Book {
  duration: number;
}

interface BookBorrowingProps {
  books: Book[];
}

// ================================
// Komponen Utama
// ================================

export default function BookBorrowing({ books }: BookBorrowingProps) {
  const [searchQuery, setSearchQuery]     = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook]   = useState<Book | null>(null);
  const [duration, setDuration]           = useState("");
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const [isSearching, setIsSearching]     = useState(false);
  const [showDropdown, setShowDropdown]   = useState(false);
  const [isSubmitting, setIsSubmitting]   = useState(false);

  // ================================
  // Search buku via API Laravel
  // ================================
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(false);
    setShowDropdown(false);
    try {
      const res  = await fetch(`/api/books/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setSearchResults(data);
      setShowDropdown(true);
    } catch (err) {
      toast.error("Gagal mencari buku, coba lagi");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    setSearchQuery(book.title);
    setShowDropdown(false);
    setSearchResults([]);
  };

  // ================================
  // Tambah buku ke daftar pinjam
  // ================================
  const handleBorrow = () => {
    if (!selectedBook || !duration) return;

    const durationNum = parseInt(duration);
    if (durationNum < 1 || durationNum > 3) {
      toast.error("Lama peminjaman harus antara 1-3 hari");
      return;
    }

    const alreadyAdded = borrowedBooks.find((b) => b.id === selectedBook.id);
    if (alreadyAdded) {
      toast.error("Buku sudah ada dalam daftar peminjaman");
      return;
    }

    setBorrowedBooks([...borrowedBooks, { ...selectedBook, duration: durationNum }]);
    setSelectedBook(null);
    setSearchQuery("");
    setDuration("");
    toast.success("Buku ditambahkan ke daftar peminjaman");
  };

  const handleRemoveBook = (bookId: number) => {
    setBorrowedBooks(borrowedBooks.filter((b) => b.id !== bookId));
  };

  // ================================
  // Konfirmasi peminjaman ke Laravel
  // ================================
  const handleConfirm = () => {
    if (borrowedBooks.length === 0) {
      toast.error("Belum ada buku yang akan dipinjam");
      return;
    }

    setIsSubmitting(true);

    const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? "";

    const requests = borrowedBooks.map((book) =>
      fetch("/peminjaman-buku", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify({
          book_id:  book.id,
          duration: book.duration,
        }),
      })
    );

    Promise.all(requests)
      .then(() => {
        toast.success("Peminjaman berhasil dikonfirmasi!");
        setBorrowedBooks([]);
        router.reload();
      })
      .catch(() => {
        toast.error("Gagal mengkonfirmasi peminjaman, coba lagi");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Layout>
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <BookMarked className="w-8 h-8 text-[#092148]" />
              <h1 className="text-3xl font-semibold text-gray-900">Pinjaman Saya</h1>
            </div>
            <p className="text-gray-600">Kelola peminjaman buku Anda</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Form Peminjaman */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Form Peminjaman</h2>

              <div className="space-y-4">

                {/* Search Buku */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cari Buku
                  </label>
                  <div className="relative">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Masukkan Judul Buku"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#092148] focus:border-transparent"
                      />
                      <button
                        onClick={handleSearch}
                        disabled={isSearching}
                        className="px-4 py-2 bg-[#092148] text-white rounded-lg hover:bg-[#0d2d5e] transition-colors disabled:opacity-70"
                      >
                        <Search className={`w-5 h-5 ${isSearching ? "animate-spin" : ""}`} />
                      </button>
                    </div>

                    {/* Dropdown hasil pencarian */}
                    {showDropdown && searchResults.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {searchResults.map((book) => (
                          <button
                            key={book.id}
                            onClick={() => handleSelectBook(book)}
                            className="w-full text-left p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 flex gap-3"
                          >
                            <img
                              src={book.cover ?? `https://placehold.co/48x64?text=${encodeURIComponent(book.title)}`}
                              alt={book.title}
                              className="w-12 h-16 object-cover rounded"
                            />
                            <div>
                              <p className="font-medium text-gray-900">{book.title}</p>
                              <p className="text-sm text-gray-600">{book.author} • {book.year}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Tidak ditemukan */}
                    {showDropdown && searchResults.length === 0 && !isSearching && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center text-gray-500 text-sm">
                        Buku tidak ditemukan atau sedang dipinjam
                      </div>
                    )}
                  </div>
                </div>

                {/* Lama Peminjaman */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lama Peminjaman (hari)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="3"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#092148] focus:border-transparent"
                  />
                  <div className="flex items-center gap-2 mt-2 text-amber-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">Maksimal 3 hari</span>
                  </div>
                </div>

                {/* Tombol Pinjam */}
                <button
                  onClick={handleBorrow}
                  disabled={!selectedBook || !duration}
                  className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
                >
                  Pinjam
                </button>
              </div>
            </div>

            {/* Daftar Buku yang Akan Dipinjam */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Daftar Buku yang Akan Dipinjam
              </h2>

              {borrowedBooks.length === 0 ? (
                <div className="text-center py-12">
                  <BookMarked className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Belum ada buku yang dipilih</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {borrowedBooks.map((book) => (
                    <div
                      key={book.id}
                      className="p-4 border border-gray-200 rounded-lg flex gap-4 hover:bg-gray-50 transition-colors"
                    >
                      <img
                        src={book.cover ?? `https://placehold.co/64x80?text=${encodeURIComponent(book.title)}`}
                        alt={book.title}
                        className="w-16 h-20 object-cover rounded shadow-sm"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{book.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{book.author} • {book.year}</p>
                        <p className="text-sm text-[#092148] font-medium">
                          Lama peminjaman: {book.duration} hari
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveBook(book.id)}
                        className="px-3 py-1 h-fit text-red-600 hover:bg-red-50 rounded transition-colors flex items-center gap-1"
                      >
                        <X className="w-4 h-4" />
                        Batal
                      </button>
                    </div>
                  ))}

                  {/* Tombol Konfirmasi */}
                  <button
                    onClick={handleConfirm}
                    disabled={isSubmitting}
                    className="w-full mt-6 px-6 py-3 bg-[#092148] text-white rounded-lg hover:bg-[#0d2d5e] transition-colors font-medium disabled:opacity-70"
                  >
                    {isSubmitting ? "Memproses..." : "Konfirmasi Peminjaman"}
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}
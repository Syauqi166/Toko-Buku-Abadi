import { useState } from "react";
import { Search, X, AlertCircle, BookMarked } from "lucide-react";
import { toast } from "sonner";
import { router } from "@inertiajs/react";
import Layout from "@/Components/Layout";

interface Book {
  id_buku: string;
  judul: string;
  penulis: string;
  cover_img_url: string | null;
  stok_avail: number;
}

interface BookBorrowingProps {
  books: Book[];
}

export default function BookBorrowing({ books }: BookBorrowingProps) {
  const [searchQuery, setSearchQuery]     = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook]   = useState<Book | null>(null);
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
  const [lamaPeminjaman, setLamaPeminjaman] = useState("");
  const [isSearching, setIsSearching]     = useState(false);
  const [showDropdown, setShowDropdown]   = useState(false);
  const [isSubmitting, setIsSubmitting]   = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setShowDropdown(false);
    try {
      const res  = await fetch(`/api/books/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setSearchResults(data);
      setShowDropdown(true);
    } catch {
      toast.error("Gagal mencari buku, coba lagi");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    setSearchQuery(book.judul);
    setShowDropdown(false);
    setSearchResults([]);
  };

  const handleAddBook = () => {
    if (!selectedBook) return;

    const alreadyAdded = selectedBooks.find((b) => b.id_buku === selectedBook.id_buku);
    if (alreadyAdded) {
      toast.error("Buku sudah ada dalam daftar peminjaman");
      return;
    }

    setSelectedBooks([...selectedBooks, selectedBook]);
    setSelectedBook(null);
    setSearchQuery("");
    toast.success("Buku ditambahkan ke daftar peminjaman");
  };

  const handleRemoveBook = (idBuku: string) => {
    setSelectedBooks(selectedBooks.filter((b) => b.id_buku !== idBuku));
  };

  const handleConfirm = () => {
    if (selectedBooks.length === 0) {
      toast.error("Belum ada buku yang akan dipinjam");
      return;
    }
    if (!lamaPeminjaman) {
      toast.error("Tentukan lama peminjaman terlebih dahulu");
      return;
    }

    const durasiNum = parseInt(lamaPeminjaman);
    if (durasiNum < 1 || durasiNum > 3) {
      toast.error("Lama peminjaman harus antara 1-3 hari");
      return;
    }

    setIsSubmitting(true);

    const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? "";

    fetch("/peminjaman-buku", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken,
      },
      body: JSON.stringify({
        id_buku:         selectedBooks.map((b) => b.id_buku),
        lama_peminjaman: durasiNum,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => {
        toast.success("Peminjaman berhasil dikonfirmasi!");
        setSelectedBooks([]);
        setLamaPeminjaman("");
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
                            key={book.id_buku}
                            onClick={() => handleSelectBook(book)}
                            className="w-full text-left p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 flex gap-3"
                          >
                            <img
                              src={book.cover_img_url ?? `https://placehold.co/48x64?text=${encodeURIComponent(book.judul)}`}
                              alt={book.judul}
                              className="w-12 h-16 object-cover rounded"
                            />
                            <div>
                              <p className="font-medium text-gray-900">{book.judul}</p>
                              <p className="text-sm text-gray-600">{book.penulis}</p>
                              <p className="text-xs text-green-600">Stok: {book.stok_avail}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Tidak ditemukan */}
                    {showDropdown && searchResults.length === 0 && !isSearching && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center text-gray-500 text-sm">
                        Buku tidak ditemukan atau stok habis
                      </div>
                    )}
                  </div>
                </div>

                {/* Tombol Tambah */}
                <button
                  onClick={handleAddBook}
                  disabled={!selectedBook}
                  className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
                >
                  Tambah ke Daftar
                </button>

                {/* Lama Peminjaman (satu untuk semua buku) */}
                <div className="border-t pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lama Peminjaman (hari)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="3"
                    value={lamaPeminjaman}
                    onChange={(e) => setLamaPeminjaman(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#092148] focus:border-transparent"
                  />
                  <div className="flex items-center gap-2 mt-2 text-amber-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">Berlaku untuk semua buku (maks. 3 hari)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Daftar Buku yang Akan Dipinjam */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Daftar Buku yang Akan Dipinjam
              </h2>

              {selectedBooks.length === 0 ? (
                <div className="text-center py-12">
                  <BookMarked className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Belum ada buku yang dipilih</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedBooks.map((book) => (
                    <div
                      key={book.id_buku}
                      className="p-4 border border-gray-200 rounded-lg flex gap-4 hover:bg-gray-50 transition-colors"
                    >
                      <img
                        src={book.cover_img_url ?? `https://placehold.co/64x80?text=${encodeURIComponent(book.judul)}`}
                        alt={book.judul}
                        className="w-16 h-20 object-cover rounded shadow-sm"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{book.judul}</h3>
                        <p className="text-sm text-gray-600">{book.penulis}</p>
                        <p className="text-xs text-green-600 mt-1">Stok: {book.stok_avail}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveBook(book.id_buku)}
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
                    disabled={isSubmitting || !lamaPeminjaman}
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

import { useState } from "react";
import { Search, X, AlertCircle, BookMarked } from "lucide-react";
import { toast } from "sonner";
import Layout from "@/Components/Layout";

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  cover: string;
}

interface BorrowedBook extends Book {
  duration: number;
}

const SAMPLE_BOOKS: Book[] = [
  {
    id: 1,
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    year: 2005,
    cover: "https://images.unsplash.com/photo-1661936901394-a993c79303c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBmaWN0aW9ufGVufDF8fHx8MTc3NjY1NDQxOHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    title: "Bumi Manusia",
    author: "Pramoedya Ananta Toer",
    year: 1980,
    cover: "https://images.unsplash.com/photo-1775276406338-3dc8e6949372?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBub3ZlbCUyMGxpdGVyYXR1cmV8ZW58MXx8fHwxNzc2NjU0NDE4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    title: "Negeri 5 Menara",
    author: "Ahmad Fuadi",
    year: 2009,
    cover: "https://images.unsplash.com/photo-1758875630351-b65d256e4dfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0Ym9vayUyMGVkdWNhdGlvbiUyMGhhcmRjb3ZlcnxlbnwxfHx8fDE3NzY2NTQ0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 4,
    title: "Sang Pemimpi",
    author: "Andrea Hirata",
    year: 2006,
    cover: "https://images.unsplash.com/photo-1765282946949-03ec841313ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwYm9vayUyMGhhcmRiYWNrfGVufDF8fHx8MTc3NjY1NDQxOXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 5,
    title: "Perahu Kertas",
    author: "Dee Lestari",
    year: 2009,
    cover: "https://images.unsplash.com/photo-1661936901394-a993c79303c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBmaWN0aW9ufGVufDF8fHx8MTc3NjY1NDQxOHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export default function BookBorrowing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [duration, setDuration] = useState("");
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);

  const handleSearch = () => {
    const results = SAMPLE_BOOKS.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    setSearchQuery(book.title);
    setSearchResults([]);
  };

  const handleBorrow = () => {
    if (!selectedBook || !duration) return;

    const durationNum = parseInt(duration);
    if (durationNum < 1 || durationNum > 3) {
      toast.error("Lama peminjaman harus antara 1-3 hari");
      return;
    }

    const alreadyBorrowed = borrowedBooks.find((b) => b.id === selectedBook.id);
    if (alreadyBorrowed) {
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
    setBorrowedBooks(borrowedBooks.filter((book) => book.id !== bookId));
  };

  const handleConfirm = () => {
    if (borrowedBooks.length === 0) {
      toast.error("Belum ada buku yang akan dipinjam");
      return;
    }
    toast.success("Peminjaman Buku Anda telah dikonfirmasi");
    setBorrowedBooks([]);
  };

  return (
    <Layout>
      <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <BookMarked className="w-8 h-8 text-[#1e3a8a]" />
            <h1 className="text-3xl font-semibold text-gray-900">Pinjaman Saya</h1>
          </div>
          <p className="text-gray-600">Kelola peminjaman buku Anda</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Peminjaman */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Form Peminjaman</h2>

            <div className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cari Buku
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Masukkan Judul Buku"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                  />
                  <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e40af] transition-colors"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>

                {searchResults.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {searchResults.map((book) => (
                      <button
                        key={book.id}
                        onClick={() => handleSelectBook(book)}
                        className="w-full text-left p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 flex gap-3"
                      >
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-12 h-16 object-cover rounded"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{book.title}</div>
                          <div className="text-sm text-gray-600">
                            {book.author} • {book.year}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                />
                <div className="flex items-center gap-2 mt-2 text-amber-600">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">Maksimal 3 hari</span>
                </div>
              </div>

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
                      src={book.cover}
                      alt={book.title}
                      className="w-16 h-20 object-cover rounded shadow-sm"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{book.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {book.author} • {book.year}
                      </p>
                      <p className="text-sm text-[#1e3a8a] font-medium">
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

                <button
                  onClick={handleConfirm}
                  className="w-full mt-6 px-6 py-3 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e40af] transition-colors font-medium"
                >
                  Konfirmasi Peminjaman
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
import { useRef } from "react";
import { Link, router } from "@inertiajs/react";
import { ChevronLeft, ChevronRight, BookOpen, ArrowLeft } from "lucide-react";
import Layout from "@/Components/Layout";

// ================================
// Interface
// ================================

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  cover: string | null;
  description: string | null;
  status: "Tersedia" | "Dipinjam";
}

interface BookDetailProps {
  book: Book;
  sameAuthor: Book[];
  otherBooks: Book[];
}

// ================================
// Komponen Carousel
// ================================

function BookCarousel({ books, title }: { books: Book[]; title: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  if (books.length === 0) return null;

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        {books.map((b) => (
          <Link
            key={b.id}
            href={`/buku/${b.id}`}
            className="flex-shrink-0 w-40 group"
          >
            <div className="relative aspect-[3/4] mb-2 rounded-lg overflow-hidden bg-gray-100 shadow-md group-hover:shadow-xl transition-shadow">
              <img
                src={b.cover ?? `https://placehold.co/160x213?text=${encodeURIComponent(b.title)}`}
                alt={b.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  b.status === "Tersedia"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}>
                  {b.status}
                </span>
              </div>
            </div>
            <h3 className="font-medium text-gray-900 text-sm line-clamp-2 leading-snug">{b.title}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{b.author}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ================================
// Komponen Utama
// ================================

export default function BookDetail({ book, sameAuthor, otherBooks }: BookDetailProps) {
  const handlePinjam = () => {
    router.visit("/peminjaman-buku");
  };

  return (
    <Layout>
      <div className="p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">

          {/* Tombol kembali */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </button>

          {/* Detail Buku */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-8">

              {/* Cover Buku */}
              <div className="flex-shrink-0">
                <div className="w-48 mx-auto md:mx-0">
                  <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-xl bg-gray-100">
                    <img
                      src={book.cover ?? `https://placehold.co/192x256?text=${encodeURIComponent(book.title)}`}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Status badge */}
                  <div className="mt-3 text-center">
                    <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${
                      book.status === "Tersedia"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {book.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Info Buku */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>

                <div className="flex items-center gap-2 mb-1">
                  <span className="text-gray-500 text-sm">Penulis:</span>
                  <span className="font-semibold text-[#092148]">{book.author}</span>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <span className="text-gray-500 text-sm">Tahun Terbit:</span>
                  <span className="font-medium text-gray-700">{book.year}</span>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 mb-6" />

                {/* Sinopsis */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#092148]" />
                    Sinopsis
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {book.description ?? "Sinopsis belum tersedia untuk buku ini."}
                  </p>
                </div>

                {/* Tombol Pinjam */}
                {book.status === "Tersedia" ? (
                  <button
                    onClick={handlePinjam}
                    className="px-8 py-3 bg-[#092148] text-white rounded-xl hover:bg-[#0d2d5e] transition-colors font-semibold text-lg shadow-md hover:shadow-lg"
                  >
                    Pinjam Buku Ini
                  </button>
                ) : (
                  <button
                    disabled
                    className="px-8 py-3 bg-gray-300 text-gray-500 rounded-xl font-semibold text-lg cursor-not-allowed"
                  >
                    Sedang Dipinjam
                  </button>
                )}
              </div>

            </div>
          </div>

          {/* Carousel: Buku dari Penulis yang Sama */}
          {sameAuthor.length > 0 && (
            <BookCarousel
              books={sameAuthor}
              title={`Buku Lain dari ${book.author}`}
            />
          )}

          {/* Carousel: Buku Lainnya */}
          {otherBooks.length > 0 && (
            <BookCarousel
              books={otherBooks}
              title="Buku Lainnya yang Mungkin Kamu Suka"
            />
          )}

        </div>
      </div>
    </Layout>
  );
}
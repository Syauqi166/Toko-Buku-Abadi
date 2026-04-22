import Layout from "@/Components/Layout";
import { Clock, CheckCircle2 } from "lucide-react";

interface HistoryItem {
  id: number;
  title: string;
  author: string;
  borrowDate: string;
  returnDate: string;
  duration: number;
  status: "returned" | "overdue";
}

const SAMPLE_HISTORY: HistoryItem[] = [
  {
    id: 1,
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    borrowDate: "10 April 2026",
    returnDate: "13 April 2026",
    duration: 3,
    status: "returned",
  },
  {
    id: 2,
    title: "Bumi Manusia",
    author: "Pramoedya Ananta Toer",
    borrowDate: "5 April 2026",
    returnDate: "7 April 2026",
    duration: 2,
    status: "returned",
  },
  {
    id: 3,
    title: "Negeri 5 Menara",
    author: "Ahmad Fuadi",
    borrowDate: "1 April 2026",
    returnDate: "3 April 2026",
    duration: 2,
    status: "returned",
  },
];

export default function History() {
  return (
    <Layout>
      <div className="p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Riwayat Peminjaman</h1>
          <p className="text-gray-600">Catatan peminjaman buku Anda</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {SAMPLE_HISTORY.length === 0 ? (
            <div className="p-12 text-center">
              <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Belum ada riwayat peminjaman</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Judul Buku
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Pengarang
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Tanggal Pinjam
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Tanggal Kembali
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Durasi
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {SAMPLE_HISTORY.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{item.title}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-600">{item.author}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-600">{item.borrowDate}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-600">{item.returnDate}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-600">{item.duration} hari</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700">
                          <CheckCircle2 className="w-4 h-4" />
                          Dikembalikan
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
    </Layout>
    
  );
}

import Layout from "@/Components/Layout";
import { Clock, CheckCircle2, BookOpen, XCircle } from "lucide-react";

interface HistoryItem {
  id_peminjaman: string;
  judul: string;
  penulis: string;
  tanggal_pinjam: string;
  lama_peminjaman: number;
  tanggal_kembali: string | null;
  status_detail: "dipinjam" | "dikembalikan";
  status_pinjam: "aktif" | "selesai" | "batal";
}

interface HistoryProps {
  history: HistoryItem[];
}

export default function History({ history }: HistoryProps) {
  return (
    <Layout>
      <div className="p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">Riwayat Peminjaman</h1>
            <p className="text-gray-600">Catatan peminjaman buku Anda</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {history.length === 0 ? (
              <div className="p-12 text-center">
                <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Belum ada riwayat peminjaman</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">ID Pinjam</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Judul Buku</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Penulis</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Tgl Pinjam</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Durasi</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Tgl Kembali</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {history.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-xs font-mono text-gray-500">{item.id_peminjaman}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900">{item.judul}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-600">{item.penulis}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-600">{item.tanggal_pinjam}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-600">{item.lama_peminjaman} hari</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-600">
                            {item.tanggal_kembali ?? (
                              <span className="text-amber-600 text-sm">Belum dikembalikan</span>
                            )}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          {item.status_detail === "dikembalikan" ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700">
                              <CheckCircle2 className="w-4 h-4" />
                              Dikembalikan
                            </span>
                          ) : item.status_pinjam === "batal" ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-red-50 text-red-700">
                              <XCircle className="w-4 h-4" />
                              Batal
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                              <BookOpen className="w-4 h-4" />
                              Dipinjam
                            </span>
                          )}
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

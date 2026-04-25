import { useState } from "react";
import { router } from "@inertiajs/react";
import { BookOpen, Mail, Lock, UserPlus, ArrowRight } from "lucide-react";

interface LoginProps {
  message?: string;
  errors?: { email?: string };
}

export default function Login({ message, errors }: LoginProps) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);

  const handleLogin = () => {
    setLoading(true);
    router.post("/login", { email, password }, {
      onFinish: () => setLoading(false),
    });
  };

  const handleGuest = () => {
    router.visit("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#092148] to-[#2858A6] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">

        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/images/Logo Toko-Buku-Abadi-Biru.svg"
            alt="Toko Buku Abadi"
            className="h-16 w-auto mx-auto mb-2"
          />
        </div>

        {/* Pesan redirect */}
        {message && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-700 text-sm text-center">{message}</p>
          </div>
        )}

        {/* Form Login */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="contoh@email.com"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#092148]"
              />
            </div>
            {errors?.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#092148]"
              />
            </div>
          </div>

          {/* Tombol Login */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 bg-[#092148] text-white rounded-lg hover:bg-[#2858A6] transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-70"
          >
            <ArrowRight className="w-4 h-4" />
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-sm">atau</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Tombol Register */}
        <button
          onClick={() => router.visit("/register")}
          className="w-full py-3 border-2 border-[#092148] text-[#092148] rounded-lg hover:bg-blue-50 transition-colors font-medium flex items-center justify-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Daftar Akun Baru
        </button>

        {/* Lanjut tanpa akun */}
        <button
          onClick={handleGuest}
          className="w-full mt-3 py-2.5 text-gray-500 hover:text-gray-700 transition-colors text-sm underline"
        >
          Lanjut tanpa akun (hanya lihat buku)
        </button>
      </div>
    </div>
  );
}
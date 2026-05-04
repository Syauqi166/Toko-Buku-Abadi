import { useState } from "react";
import { router } from "@inertiajs/react";
import { Mail, Lock, User, AtSign, ArrowLeft } from "lucide-react";

interface RegisterProps {
  errors?: {
    username?: string;
    nama?: string;
    email?: string;
    password?: string;
  };
}

export default function Register({ errors }: RegisterProps) {
  const [username, setUsername]               = useState("");
  const [nama, setNama]                       = useState("");
  const [email, setEmail]                     = useState("");
  const [password, setPassword]               = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading]                 = useState(false);

  const handleRegister = () => {
    setLoading(true);
    router.post("/register", {
      username,
      nama,
      email,
      password,
      password_confirmation: passwordConfirm,
    }, {
      onFinish: () => setLoading(false),
    });
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

        {/* Form Register */}
        <div className="space-y-4">

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <div className="relative">
              <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username unik kamu"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#092148]"
              />
            </div>
            {errors?.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          </div>

          {/* Nama Lengkap */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama lengkap kamu"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#092148]"
              />
            </div>
            {errors?.nama && <p className="text-red-500 text-xs mt-1">{errors.nama}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contoh@email.com"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#092148]"
              />
            </div>
            {errors?.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 8 karakter"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#092148]"
              />
            </div>
            {errors?.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Konfirmasi Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                placeholder="Ulangi password"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#092148]"
              />
            </div>
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full py-3 bg-[#092148] text-white rounded-lg hover:bg-[#2858A6] transition-colors font-medium disabled:opacity-70"
          >
            {loading ? "Memproses..." : "Buat Akun"}
          </button>
        </div>

        <button
          onClick={() => router.visit("/login")}
          className="w-full mt-4 py-2.5 text-gray-500 hover:text-gray-700 transition-colors text-sm flex items-center justify-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Sudah punya akun? Masuk
        </button>
      </div>
    </div>
  );
}

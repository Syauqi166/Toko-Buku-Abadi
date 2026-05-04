<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Borrowing;
use App\Models\DetailPeminjaman;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BorrowingController extends Controller
{
    public function index()
    {
        return Inertia::render('BookBorrowing', [
            'books' => Book::where('stok_avail', '>', 0)->get(),
        ]);
    }

    public function search(Request $request)
    {
        $books = Book::where('stok_avail', '>', 0)
            ->where('judul', 'like', '%' . $request->q . '%')
            ->get();

        return response()->json($books);
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_buku'         => 'required|array|min:1',
            'id_buku.*'       => 'exists:buku,id_buku',
            'lama_peminjaman' => 'required|integer|between:1,3',
        ]);

        $peminjaman = Borrowing::create([
            'id_pengguna'     => auth()->user()->id_pengguna,
            'tanggal_pinjam'  => now()->toDateString(),
            'lama_peminjaman' => $request->lama_peminjaman,
            'status'          => 'aktif',
        ]);

        foreach ($request->id_buku as $idBuku) {
            DetailPeminjaman::create([
                'id_peminjaman' => $peminjaman->id_peminjaman,
                'id_buku'       => $idBuku,
                'status'        => 'dipinjam',
            ]);
            Book::where('id_buku', $idBuku)->decrement('stok_avail');
        }

        return response()->json([
            'message'       => 'Peminjaman berhasil',
            'id_peminjaman' => $peminjaman->id_peminjaman,
        ]);
    }
}

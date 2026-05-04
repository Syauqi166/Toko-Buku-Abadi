<?php

namespace App\Http\Controllers;

use App\Models\Borrowing;
use Inertia\Inertia;

class HistoryController extends Controller
{
    public function index()
    {
        $history = Borrowing::with(['details.buku'])
            ->where('id_pengguna', auth()->user()->id_pengguna)
            ->orderByDesc('tanggal_pinjam')
            ->get()
            ->flatMap(function ($peminjaman) {
                return $peminjaman->details->map(function ($detail) use ($peminjaman) {
                    return [
                        'id_peminjaman'   => $peminjaman->id_peminjaman,
                        'judul'           => $detail->buku?->judul ?? '-',
                        'penulis'         => $detail->buku?->penulis ?? '-',
                        'tanggal_pinjam'  => $peminjaman->tanggal_pinjam,
                        'lama_peminjaman' => $peminjaman->lama_peminjaman,
                        'tanggal_kembali' => $detail->tanggal_kembali,
                        'status_detail'   => $detail->status,
                        'status_pinjam'   => $peminjaman->status,
                    ];
                });
            })
            ->values();

        return Inertia::render('History', [
            'history' => $history,
        ]);
    }
}

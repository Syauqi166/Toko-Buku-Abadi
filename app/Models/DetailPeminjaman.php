<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetailPeminjaman extends Model
{
    protected $table      = 'detail_peminjaman';
    protected $primaryKey = 'id_detail';
    public    $timestamps = false;

    protected $fillable = [
        'id_peminjaman',
        'id_buku',
        'tanggal_kembali',
        'status',
    ];

    public function peminjaman()
    {
        return $this->belongsTo(Borrowing::class, 'id_peminjaman', 'id_peminjaman');
    }

    public function buku()
    {
        return $this->belongsTo(Book::class, 'id_buku', 'id_buku');
    }
}

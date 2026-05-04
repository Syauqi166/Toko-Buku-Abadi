<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Borrowing extends Model
{
    protected $table      = 'peminjaman';
    protected $primaryKey = 'id_peminjaman';
    public    $incrementing = false;
    protected $keyType    = 'string';
    public    $timestamps = false;

    protected $fillable = [
        'id_pengguna',
        'tanggal_pinjam',
        'lama_peminjaman',
        'status',
    ];

    public function pengguna()
    {
        return $this->belongsTo(User::class, 'id_pengguna', 'id_pengguna');
    }

    public function details()
    {
        return $this->hasMany(DetailPeminjaman::class, 'id_peminjaman', 'id_peminjaman');
    }

    protected static function boot(): void
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->id_peminjaman)) {
                $latest  = static::max('id_peminjaman');
                $nextNum = $latest ? (intval(substr($latest, 2)) + 1) : 1;
                $model->id_peminjaman = 'PM' . str_pad($nextNum, 8, '0', STR_PAD_LEFT);
            }
        });
    }
}

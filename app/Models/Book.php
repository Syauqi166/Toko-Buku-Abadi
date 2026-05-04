<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $table      = 'buku';
    protected $primaryKey = 'id_buku';
    public    $incrementing = false;
    protected $keyType    = 'string';
    public    $timestamps = false;

    protected $fillable = [
        'cover_img_url',
        'deskripsi',
        'judul',
        'penulis',
        'stok',
        'stok_avail',
    ];

    protected static function boot(): void
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->id_buku)) {
                $latest  = static::max('id_buku');
                $nextNum = $latest ? (intval(substr($latest, 2)) + 1) : 1;
                $model->id_buku = 'BK' . str_pad($nextNum, 8, '0', STR_PAD_LEFT);
            }
        });
    }
}

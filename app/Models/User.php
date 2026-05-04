<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    protected $table      = 'pengguna';
    protected $primaryKey = 'id_pengguna';
    public    $incrementing = false;
    protected $keyType    = 'string';
    const     UPDATED_AT  = null;

    protected $fillable = ['username', 'email', 'password', 'nama'];
    protected $hidden   = ['password'];

    protected function casts(): array
    {
        return ['password' => 'hashed'];
    }

    // pengguna table has no remember_token column
    public function getRememberToken()           { return null; }
    public function setRememberToken($value)     {}
    public function getRememberTokenName(): string { return ''; }

    protected static function boot(): void
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->id_pengguna)) {
                $latest  = static::max('id_pengguna');
                $nextNum = $latest ? (intval(substr($latest, 3)) + 1) : 1;
                $model->id_pengguna = 'PGN' . str_pad($nextNum, 7, '0', STR_PAD_LEFT);
            }
        });
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('peminjaman', function (Blueprint $table) {
            $table->string('id_peminjaman', 10)->primary();
            $table->string('id_pengguna', 10);
            $table->date('tanggal_pinjam');
            $table->integer('lama_peminjaman');
            $table->enum('status', ['aktif', 'selesai', 'batal'])->default('aktif');
            $table->foreign('id_pengguna')
                  ->references('id_pengguna')
                  ->on('pengguna');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('peminjaman');
    }
};

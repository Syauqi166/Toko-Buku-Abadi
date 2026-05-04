<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('buku', function (Blueprint $table) {
            $table->string('id_buku', 10)->primary();
            $table->string('cover_img_url', 200);
            $table->string('deskripsi', 400);
            $table->string('judul', 200);
            $table->string('penulis', 100);
            $table->integer('stok')->default(0);
            $table->integer('stok_avail')->default(0);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('buku');
    }
};

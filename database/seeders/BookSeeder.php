<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BookSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('books')->insert([
            [
                'title'      => 'Laskar Pelangi',
                'author'     => 'Andrea Hirata',
                'year'       => 2005,
                'cover'      => 'https://images.unsplash.com/photo-1661936901394-a993c79303c7?w=300&q=80',
                'status'     => 'Tersedia',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title'      => 'Bumi Manusia',
                'author'     => 'Pramoedya Ananta Toer',
                'year'       => 1980,
                'cover'      => 'https://images.unsplash.com/photo-1775276406338-3dc8e6949372?w=300&q=80',
                'status'     => 'Tersedia',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title'      => 'Negeri 5 Menara',
                'author'     => 'Ahmad Fuadi',
                'year'       => 2009,
                'cover'      => 'https://images.unsplash.com/photo-1758875630351-b65d256e4dfe?w=300&q=80',
                'status'     => 'Dipinjam',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title'      => 'Sang Pemimpi',
                'author'     => 'Andrea Hirata',
                'year'       => 2006,
                'cover'      => 'https://images.unsplash.com/photo-1765282946949-03ec841313ca?w=300&q=80',
                'status'     => 'Tersedia',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title'      => 'Perahu Kertas',
                'author'     => 'Dee Lestari',
                'year'       => 2009,
                'cover'      => 'https://images.unsplash.com/photo-1661936901394-a993c79303c7?w=300&q=80',
                'status'     => 'Tersedia',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BookSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('books')->insert([
            // Andrea Hirata
            ['title' => 'Laskar Pelangi',       'author' => 'Andrea Hirata',          'year' => 2005, 'cover' => 'https://images.unsplash.com/photo-1661936901394-a993c79303c7?w=300&q=80', 'status' => 'Tersedia',  'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Sang Pemimpi',          'author' => 'Andrea Hirata',          'year' => 2006, 'cover' => 'https://images.unsplash.com/photo-1765282946949-03ec841313ca?w=300&q=80', 'status' => 'Tersedia',  'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Edensor',               'author' => 'Andrea Hirata',          'year' => 2007, 'cover' => 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&q=80', 'status' => 'Tersedia',  'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Maryamah Karpov',       'author' => 'Andrea Hirata',          'year' => 2008, 'cover' => 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=300&q=80', 'status' => 'Dipinjam', 'created_at' => now(), 'updated_at' => now()],

            // Pramoedya Ananta Toer
            ['title' => 'Bumi Manusia',          'author' => 'Pramoedya Ananta Toer',  'year' => 1980, 'cover' => 'https://images.unsplash.com/photo-1775276406338-3dc8e6949372?w=300&q=80', 'status' => 'Tersedia',  'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Anak Semua Bangsa',     'author' => 'Pramoedya Ananta Toer',  'year' => 1980, 'cover' => 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=300&q=80', 'status' => 'Tersedia',  'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Jejak Langkah',         'author' => 'Pramoedya Ananta Toer',  'year' => 1985, 'cover' => 'https://images.unsplash.com/photo-1495640452828-3df6795cf69b?w=300&q=80', 'status' => 'Dipinjam', 'created_at' => now(), 'updated_at' => now()],

            // Ahmad Fuadi
            ['title' => 'Negeri 5 Menara',       'author' => 'Ahmad Fuadi',            'year' => 2009, 'cover' => 'https://images.unsplash.com/photo-1758875630351-b65d256e4dfe?w=300&q=80', 'status' => 'Tersedia',  'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Ranah 3 Warna',         'author' => 'Ahmad Fuadi',            'year' => 2011, 'cover' => 'https://images.unsplash.com/photo-1476275466078-4cdc8b93cd43?w=300&q=80', 'status' => 'Tersedia',  'created_at' => now(), 'updated_at' => now()],

            // Dee Lestari
            ['title' => 'Perahu Kertas',         'author' => 'Dee Lestari',            'year' => 2009, 'cover' => 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&q=80', 'status' => 'Tersedia',  'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Supernova: Ksatria, Putri & Bintang Jatuh', 'author' => 'Dee Lestari', 'year' => 2001, 'cover' => 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&q=80', 'status' => 'Tersedia', 'created_at' => now(), 'updated_at' => now()],

            // Leila S. Chudori
            ['title' => 'Pulang',                'author' => 'Leila S. Chudori',       'year' => 2012, 'cover' => 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&q=80', 'status' => 'Tersedia',  'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Laut Bercerita',        'author' => 'Leila S. Chudori',       'year' => 2017, 'cover' => 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=300&q=80', 'status' => 'Dipinjam', 'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Namaku Alam',           'author' => 'Leila S. Chudori',       'year' => 2022, 'cover' => 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=300&q=80', 'status' => 'Tersedia',  'created_at' => now(), 'updated_at' => now()],

            // Tere Liye
            ['title' => 'Hujan',                 'author' => 'Tere Liye',              'year' => 2016, 'cover' => 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&q=80', 'status' => 'Tersedia',  'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Bumi',                  'author' => 'Tere Liye',              'year' => 2014, 'cover' => 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&q=80', 'status' => 'Tersedia',  'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Rindu',                 'author' => 'Tere Liye',              'year' => 2014, 'cover' => 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=300&q=80', 'status' => 'Dipinjam', 'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Rembulan Tenggelam di Wajahmu', 'author' => 'Tere Liye',     'year' => 2009, 'cover' => 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=300&q=80', 'status' => 'Tersedia',  'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Hafalan Shalat Delisa', 'author' => 'Tere Liye',             'year' => 2005, 'cover' => 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=300&q=80', 'status' => 'Tersedia',  'created_at' => now(), 'updated_at' => now()],

            // Keigo Higashino
            ['title' => 'Devotion of Suspect X', 'author' => 'Keigo Higashino',       'year' => 2005, 'cover' => 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=300&q=80', 'status' => 'Tersedia',  'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Salvation of a Saint',  'author' => 'Keigo Higashino',       'year' => 2008, 'cover' => 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&q=80', 'status' => 'Dipinjam', 'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Malice',                'author' => 'Keigo Higashino',       'year' => 1996, 'cover' => 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=300&q=80', 'status' => 'Tersedia',  'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Journey Under the Midnight Sun', 'author' => 'Keigo Higashino', 'year' => 1999, 'cover' => 'https://images.unsplash.com/photo-1476275466078-4cdc8b93cd43?w=300&q=80', 'status' => 'Tersedia', 'created_at' => now(), 'updated_at' => now()],

            // Bonus
            ['title' => 'Bingkai',               'author' => 'Alberthiene Endah',      'year' => 2015, 'cover' => 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&q=80', 'status' => 'Tersedia',  'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Cantik Itu Luka',       'author' => 'Eka Kurniawan',          'year' => 2002, 'cover' => 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=300&q=80', 'status' => 'Tersedia',  'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Lelaki Harimau',        'author' => 'Eka Kurniawan',          'year' => 2004, 'cover' => 'https://images.unsplash.com/photo-1495640452828-3df6795cf69b?w=300&q=80', 'status' => 'Dipinjam', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
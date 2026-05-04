<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BookSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('buku')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $books = [
            // ── Sastra Indonesia ──────────────────────────────────────────────
            [
                'judul'        => 'Laskar Pelangi',
                'penulis'      => 'Andrea Hirata',
                'deskripsi'    => 'Sepuluh anak kampung di Belitung berjuang mendapatkan pendidikan di sekolah Muhammadiyah yang hampir roboh. Kisah persahabatan, perjuangan, dan semangat yang membuktikan mimpi tidak mengenal batas kemiskinan.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&q=80',
                'stok'         => 10, 'stok_avail' => 7,
            ],
            [
                'judul'        => 'Sang Pemimpi',
                'penulis'      => 'Andrea Hirata',
                'deskripsi'    => 'Ikal dan Arai bermimpi bersekolah di Prancis. Mereka bekerja sebagai kuli di pelabuhan Belitung demi mewujudkan mimpi besar mengelilingi Eropa. Sekuel Laskar Pelangi yang penuh semangat dan haru.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1476275466078-4cdc8b93cd43?w=300&q=80',
                'stok'         => 8, 'stok_avail' => 8,
            ],
            [
                'judul'        => 'Edensor',
                'penulis'      => 'Andrea Hirata',
                'deskripsi'    => 'Ikal dan Arai berkuliah di Sorbonne, Paris. Petualangan mereka menjelajahi Eropa dengan motor butut menjadi kisah penuh warna hingga menemukan makna hidup di desa kecil bernama Edensor.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=300&q=80',
                'stok'         => 8, 'stok_avail' => 5,
            ],
            [
                'judul'        => 'Maryamah Karpov',
                'penulis'      => 'Andrea Hirata',
                'deskripsi'    => 'Ikal kembali ke Belitung dan membangun kapal sendiri untuk menemukan cinta sejatinya, A Ling, di antara pulau-pulau terpencil. Penutup tetralogi Laskar Pelangi yang epik.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=300&q=80',
                'stok'         => 6, 'stok_avail' => 2,
            ],
            [
                'judul'        => 'Bumi Manusia',
                'penulis'      => 'Pramoedya Ananta Toer',
                'deskripsi'    => 'Minke, pemuda pribumi terpelajar, jatuh cinta pada Annelies di era kolonial Belanda. Kisah cinta, kemanusiaan, dan perlawanan terhadap penindasan yang menjadi karya agung sastra Indonesia.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1495640452828-3df6795cf69b?w=300&q=80',
                'stok'         => 10, 'stok_avail' => 9,
            ],
            [
                'judul'        => 'Anak Semua Bangsa',
                'penulis'      => 'Pramoedya Ananta Toer',
                'deskripsi'    => 'Minke menyadari kondisi bangsanya yang tertindas dan belajar dari kisah perjuangan seluruh dunia. Ia mulai menggunakan pena sebagai senjata melawan ketidakadilan kolonial.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&q=80',
                'stok'         => 7, 'stok_avail' => 7,
            ],
            [
                'judul'        => 'Jejak Langkah',
                'penulis'      => 'Pramoedya Ananta Toer',
                'deskripsi'    => 'Minke aktif dalam gerakan pergerakan nasional, mendirikan organisasi dan surat kabar untuk hak-hak pribumi. Novel yang menggambarkan kebangkitan kesadaran nasional Indonesia.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=300&q=80',
                'stok'         => 7, 'stok_avail' => 4,
            ],
            [
                'judul'        => 'Rumah Kaca',
                'penulis'      => 'Pramoedya Ananta Toer',
                'deskripsi'    => 'Penutup Tetralogi Buru. Kisah pengawasan dan penindasan sistem kolonial terhadap gerakan pribumi, diceritakan dari sudut pandang seorang pejabat polisi Belanda yang mengamati Minke.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=300&q=80',
                'stok'         => 6, 'stok_avail' => 6,
            ],
            [
                'judul'        => 'Negeri 5 Menara',
                'penulis'      => 'Ahmad Fuadi',
                'deskripsi'    => 'Alif meninggalkan Maninjau untuk bersekolah di Pondok Madani. Bersama lima sahabat, mereka bermimpi setinggi langit dengan mantra "Man Jadda Wajada" yang mengubah nasib mereka.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&q=80',
                'stok'         => 9, 'stok_avail' => 6,
            ],
            [
                'judul'        => 'Ranah 3 Warna',
                'penulis'      => 'Ahmad Fuadi',
                'deskripsi'    => 'Alif melanjutkan perjuangan di Bandung lalu meraih beasiswa ke Amerika. Dengan kerja keras, ia membuktikan anak pesantren pun bisa bersaing di panggung internasional.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=300&q=80',
                'stok'         => 7, 'stok_avail' => 7,
            ],
            [
                'judul'        => 'Rantau 1 Muara',
                'penulis'      => 'Ahmad Fuadi',
                'deskripsi'    => 'Penutup Trilogi Negeri 5 Menara. Alif menapaki karir jurnalistik di Washington DC dan belajar bahwa pulang adalah perjalanan paling bermakna setelah mengelilingi dunia.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=300&q=80',
                'stok'         => 6, 'stok_avail' => 5,
            ],
            [
                'judul'        => 'Perahu Kertas',
                'penulis'      => 'Dee Lestari',
                'deskripsi'    => 'Kugy si pencerita dan Keenan si pelukis — dua jiwa yang saling melengkapi namun terpisahkan keadaan. Kisah cinta yang puitis dan mengalir seperti perahu kertas di sungai kenangan.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&q=80',
                'stok'         => 9, 'stok_avail' => 3,
            ],
            [
                'judul'        => 'Supernova: Ksatria, Putri & Bintang Jatuh',
                'penulis'      => 'Dee Lestari',
                'deskripsi'    => 'Dua mahasiswa menulis novel tentang Ksatria dan Putri yang terjalin dengan kehidupan nyata Ferre dan Rana. Novel perdana Supernova yang memadukan sains, spiritualitas, dan cinta.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=300&q=80',
                'stok'         => 8, 'stok_avail' => 8,
            ],
            [
                'judul'        => 'Madre',
                'penulis'      => 'Dee Lestari',
                'deskripsi'    => 'Kumpulan cerita pendek yang kaya imajinasi dan puitis. "Madre" adalah kisah ragi adonan roti yang mewarisi kenangan dan cinta lintas generasi — salah satu karya terbaik Dee Lestari.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&q=80',
                'stok'         => 5, 'stok_avail' => 5,
            ],
            [
                'judul'        => 'Pulang',
                'penulis'      => 'Leila S. Chudori',
                'deskripsi'    => 'Dimas Suryo, eksil politik Indonesia di Paris, tidak bisa pulang setelah 1965. Novel tentang kerinduan, pengkhianatan, dan identitas yang melintasi tiga generasi dan dua benua.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&q=80',
                'stok'         => 7, 'stok_avail' => 4,
            ],
            [
                'judul'        => 'Laut Bercerita',
                'penulis'      => 'Leila S. Chudori',
                'deskripsi'    => 'Biru Laut, aktivis mahasiswa, diculik di era Orde Baru. Kisahnya dari dua sudut pandang: Laut sebelum penghilangan, dan adiknya Asmara yang mencari kebenaran. Novel mengharukan tentang keberanian.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&q=80',
                'stok'         => 8, 'stok_avail' => 0,
            ],
            [
                'judul'        => 'Hujan',
                'penulis'      => 'Tere Liye',
                'deskripsi'    => 'Di tahun 2042, Lail dan Esok bertemu saat bencana dahsyat. Kisah cinta yang tumbuh di tengah kehancuran, melewati waktu dan perpisahan, hingga pada sebuah keputusan yang mengubah segalanya.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1765282946949-03ec841313ca?w=300&q=80',
                'stok'         => 10, 'stok_avail' => 7,
            ],
            [
                'judul'        => 'Bumi',
                'penulis'      => 'Tere Liye',
                'deskripsi'    => 'Raib, gadis 15 tahun yang bisa menghilang, bersama Seli dan Ali menemukan klan-klan tersembunyi di dunia paralel. Petualangan fantasi yang seru dan penuh imajinasi untuk semua usia.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=300&q=80',
                'stok'         => 9, 'stok_avail' => 5,
            ],
            [
                'judul'        => 'Rindu',
                'penulis'      => 'Tere Liye',
                'deskripsi'    => 'Kapal uap 1938 membawa jemaah haji dari Makassar ke Mekkah. Lima kisah tentang kerinduan, penyesalan, kebencian, dan cinta terjalin dalam satu perjalanan spiritual yang tak terlupakan.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&q=80',
                'stok'         => 8, 'stok_avail' => 2,
            ],
            [
                'judul'        => 'Rembulan Tenggelam di Wajahmu',
                'penulis'      => 'Tere Liye',
                'deskripsi'    => 'Ray, pengusaha sukses yang keras, menjelang ajal diberi kesempatan menjawab lima pertanyaan hidupnya. Perjalanan waktu yang memaksanya merenungkan pilihan-pilihan yang ia buat.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1661936901394-a993c79303c7?w=300&q=80',
                'stok'         => 7, 'stok_avail' => 7,
            ],
            [
                'judul'        => 'Hafalan Shalat Delisa',
                'penulis'      => 'Tere Liye',
                'deskripsi'    => 'Delisa, bocah 6 tahun dari Aceh, sedang menghafal bacaan shalat ketika tsunami 2004 menghantam. Kisah mengharukan tentang keikhlasan, kehilangan, dan keajaiban iman seorang anak kecil.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1775276406338-3dc8e6949372?w=300&q=80',
                'stok'         => 8, 'stok_avail' => 6,
            ],
            [
                'judul'        => 'Cantik Itu Luka',
                'penulis'      => 'Eka Kurniawan',
                'deskripsi'    => 'Dewi Ayu, perempuan cantik yang jadi pelacur di masa Jepang, bangkit dari kubur setelah 21 tahun. Novel magis-realis tentang empat generasi perempuan dalam latar sejarah Indonesia yang penuh gejolak.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1758875630351-b65d256e4dfe?w=300&q=80',
                'stok'         => 7, 'stok_avail' => 4,
            ],
            [
                'judul'        => 'Lelaki Harimau',
                'penulis'      => 'Eka Kurniawan',
                'deskripsi'    => 'Margio membunuh Anwar Sadat dengan cara mengerikan. Kisah ini mengungkap lapisan rahasia keluarga dan dendam terpendam dalam balutan realisme magis khas Eka Kurniawan yang memukau dunia.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=300&q=80',
                'stok'         => 6, 'stok_avail' => 6,
            ],
            [
                'judul'        => 'Tenggelamnya Kapal Van der Wijck',
                'penulis'      => 'Hamka',
                'deskripsi'    => 'Zainuddin dari Makassar mencintai Hayati dari Minangkabau, namun perbedaan adat memisahkan mereka. Kisah cinta tragis yang mengkritik adat yang kaku sekaligus mengagungkan kesetiaan hati.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=300&q=80',
                'stok'         => 8, 'stok_avail' => 8,
            ],
            [
                'judul'        => 'Di Bawah Lindungan Ka\'bah',
                'penulis'      => 'Hamka',
                'deskripsi'    => 'Hamid dan Zainab saling mencintai, namun perbedaan status sosial menghalangi mereka. Hamid mengembara hingga akhirnya menemukan kedamaian di bawah naungan Ka\'bah di Mekkah.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1495640452828-3df6795cf69b?w=300&q=80',
                'stok'         => 6, 'stok_avail' => 3,
            ],
            [
                'judul'        => 'Ronggeng Dukuh Paruk',
                'penulis'      => 'Ahmad Tohari',
                'deskripsi'    => 'Srintil terpilih menjadi ronggeng di Dukuh Paruk dan jatuh cinta pada Rasus. Kisah tentang perempuan, tradisi, dan politik di latar pedesaan Jawa yang bergolak sekitar 1965.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=300&q=80',
                'stok'         => 7, 'stok_avail' => 7,
            ],
            [
                'judul'        => 'Dilan 1990',
                'penulis'      => 'Pidi Baiq',
                'deskripsi'    => 'Milea menceritakan kisah cintanya dengan Dilan, anak geng motor yang puitis dan nyentrik di Bandung tahun 1990. Novel populer yang menghidupkan kembali nostalgia remaja dan roman.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&q=80',
                'stok'         => 10, 'stok_avail' => 4,
            ],
            [
                'judul'        => 'Dilan 1991',
                'penulis'      => 'Pidi Baiq',
                'deskripsi'    => 'Kelanjutan kisah Milea dan Dilan yang semakin dewasa menghadapi cobaan hubungan mereka. Roman remaja Bandung yang mengajak pembaca kembali ke kehangatan cinta pertama.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=300&q=80',
                'stok'         => 9, 'stok_avail' => 9,
            ],
            [
                'judul'        => '5 cm',
                'penulis'      => 'Donny Dhirgantoro',
                'deskripsi'    => 'Lima sahabat berpisah selama tiga bulan lalu bertemu kembali untuk mendaki Mahameru. Novel petualangan dan persahabatan yang menginspirasi generasi muda Indonesia untuk bermimpi besar.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&q=80',
                'stok'         => 8, 'stok_avail' => 5,
            ],
            // ── Thriller / Misteri ────────────────────────────────────────────
            [
                'judul'        => 'The Devotion of Suspect X',
                'penulis'      => 'Keigo Higashino',
                'deskripsi'    => 'Ishigami, jenius matematika, merancang alibi sempurna untuk melindungi tetangga yang dicintainya setelah pembunuhan. Thriller psikologis yang mempertanyakan batas kejahatan dan pengorbanan.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=300&q=80',
                'stok'         => 8, 'stok_avail' => 5,
            ],
            [
                'judul'        => 'Salvation of a Saint',
                'penulis'      => 'Keigo Higashino',
                'deskripsi'    => 'Yoshitaka tewas keracunan kopi namun istrinya memiliki alibi sempurna. Detektif Kusanagi harus memecahkan misteri pembunuhan yang tampaknya mustahil ini.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1476275466078-4cdc8b93cd43?w=300&q=80',
                'stok'         => 7, 'stok_avail' => 7,
            ],
            [
                'judul'        => 'Malice',
                'penulis'      => 'Keigo Higashino',
                'deskripsi'    => 'Penulis terkenal tewas malam sebelum pindah ke Kanada. Sahabatnya sendiri menjadi tersangka. Motif pembunuhan ini jauh lebih gelap dan kompleks dari yang terlihat di permukaan.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1758875630351-b65d256e4dfe?w=300&q=80',
                'stok'         => 7, 'stok_avail' => 2,
            ],
            [
                'judul'        => 'Journey Under the Midnight Sun',
                'penulis'      => 'Keigo Higashino',
                'deskripsi'    => 'Selama 19 tahun, dua anak yang terlibat pembunuhan misterius tumbuh dewasa dengan identitas tersembunyi. Novel gelap tentang obsesi dan rahasia yang tidak pernah bisa dikubur selamanya.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&q=80',
                'stok'         => 6, 'stok_avail' => 4,
            ],
            // ── Fiksi Internasional ───────────────────────────────────────────
            [
                'judul'        => 'Harry Potter dan Batu Bertuah',
                'penulis'      => 'J.K. Rowling',
                'deskripsi'    => 'Harry Potter menemukan bahwa ia adalah penyihir dan diterima di Hogwarts, sekolah sihir legendaris. Petualangan pertama yang mengawali saga fantasi paling dicintai sepanjang masa.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=300&q=80',
                'stok'         => 10, 'stok_avail' => 6,
            ],
            [
                'judul'        => 'Harry Potter dan Kamar Rahasia',
                'penulis'      => 'J.K. Rowling',
                'deskripsi'    => 'Tahun kedua di Hogwarts penuh ancaman ketika monster misterius menyerang siswa. Harry harus mengungkap rahasia Kamar Rahasia sebelum korban berikutnya berjatuhan.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=300&q=80',
                'stok'         => 9, 'stok_avail' => 9,
            ],
            [
                'judul'        => 'Sang Alkemis',
                'penulis'      => 'Paulo Coelho',
                'deskripsi'    => 'Santiago, gembala muda dari Spanyol, mengikuti mimpinya ke Piramida Mesir. Dalam perjalanan ia menemukan bahwa alam semesta bersekongkol membantu mereka yang berani mengejar takdir pribadinya.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=300&q=80',
                'stok'         => 10, 'stok_avail' => 8,
            ],
            [
                'judul'        => 'Pangeran Kecil',
                'penulis'      => 'Antoine de Saint-Exupéry',
                'deskripsi'    => 'Seorang pilot yang terdampar di gurun Sahara bertemu Pangeran Kecil dari asteroid B-612. Perjalanan sang Pangeran mengunjungi planet-planet mengajarkan tentang cinta, persahabatan, dan makna hidup.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&q=80',
                'stok'         => 8, 'stok_avail' => 5,
            ],
            [
                'judul'        => '1984',
                'penulis'      => 'George Orwell',
                'deskripsi'    => 'Di negara totaliter Oceania, Winston Smith berani memberontak melawan Partai dan Big Brother yang mengawasi setiap gerak-gerik warganya. Distopia klasik tentang kekuasaan, pengawasan, dan kebebasan.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&q=80',
                'stok'         => 8, 'stok_avail' => 3,
            ],
            [
                'judul'        => 'Animal Farm',
                'penulis'      => 'George Orwell',
                'deskripsi'    => 'Para hewan di Manor Farm memberontak melawan tuan mereka dan mendirikan republik hewan. Alegori satir tentang revolusi yang berakhir dengan penindasan baru oleh pemimpin yang korup.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&q=80',
                'stok'         => 7, 'stok_avail' => 7,
            ],
            // ── Pengembangan Diri ─────────────────────────────────────────────
            [
                'judul'        => 'Atomic Habits',
                'penulis'      => 'James Clear',
                'deskripsi'    => 'Kerangka praktis untuk membangun kebiasaan baik dan menghilangkan kebiasaan buruk. Clear menjelaskan bahwa perubahan kecil dan konsisten, bukan motivasi sesaat, yang menghasilkan hasil luar biasa.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1661936901394-a993c79303c7?w=300&q=80',
                'stok'         => 10, 'stok_avail' => 4,
            ],
            [
                'judul'        => 'The 7 Habits of Highly Effective People',
                'penulis'      => 'Stephen R. Covey',
                'deskripsi'    => 'Tujuh kebiasaan yang membentuk karakter dan efektivitas sejati. Covey mengajarkan prinsip-prinsip abadi yang relevan bagi siapa pun yang ingin mencapai kesuksesan sejati dalam kehidupan dan karir.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1765282946949-03ec841313ca?w=300&q=80',
                'stok'         => 8, 'stok_avail' => 6,
            ],
            [
                'judul'        => 'Rich Dad Poor Dad',
                'penulis'      => 'Robert T. Kiyosaki',
                'deskripsi'    => 'Kiyosaki membandingkan pelajaran finansial dari ayah kandungnya (miskin) dan ayah temannya (kaya). Buku yang mengubah cara berpikir jutaan orang tentang uang, investasi, dan kebebasan finansial.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1476275466078-4cdc8b93cd43?w=300&q=80',
                'stok'         => 9, 'stok_avail' => 1,
            ],
            [
                'judul'        => 'How to Win Friends and Influence People',
                'penulis'      => 'Dale Carnegie',
                'deskripsi'    => 'Prinsip-prinsip abadi untuk membangun hubungan yang baik dan memengaruhi orang lain secara positif. Buku terlaris yang telah membantu jutaan orang menjadi lebih sukses dalam kehidupan sosial dan karir.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=300&q=80',
                'stok'         => 8, 'stok_avail' => 8,
            ],
            [
                'judul'        => 'Thinking, Fast and Slow',
                'penulis'      => 'Daniel Kahneman',
                'deskripsi'    => 'Kahneman, peraih Nobel, menjelaskan dua sistem berpikir manusia: System 1 yang cepat dan intuitif, serta System 2 yang lambat dan logis. Buku yang mengungkap cara kerja pikiran dan pengambilan keputusan.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=300&q=80',
                'stok'         => 7, 'stok_avail' => 5,
            ],
            // ── Buku Akademik ─────────────────────────────────────────────────
            [
                'judul'        => 'Algoritma dan Pemrograman',
                'penulis'      => 'Rinaldi Munir',
                'deskripsi'    => 'Buku teks pemrograman komputer yang komprehensif dengan pendekatan algoritmik. Membahas struktur data, logika pemrograman, dan implementasi dalam berbagai bahasa pemrograman untuk mahasiswa informatika.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=300&q=80',
                'stok'         => 5, 'stok_avail' => 2,
            ],
            [
                'judul'        => 'Basis Data',
                'penulis'      => 'Fathansyah',
                'deskripsi'    => 'Referensi standar basis data di perguruan tinggi Indonesia. Membahas model relasional, SQL, normalisasi, dan desain basis data dengan contoh kasus yang relevan dan mudah dipahami.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&q=80',
                'stok'         => 5, 'stok_avail' => 0,
            ],
            [
                'judul'        => 'Sistem Informasi Manajemen',
                'penulis'      => 'Raymond McLeod',
                'deskripsi'    => 'Konsep dasar sistem informasi manajemen yang mencakup pengembangan sistem, keamanan informasi, dan pemanfaatan teknologi untuk mendukung pengambilan keputusan bisnis modern.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&q=80',
                'stok'         => 5, 'stok_avail' => 3,
            ],
            [
                'judul'        => 'Kecerdasan Buatan',
                'penulis'      => 'Suyanto',
                'deskripsi'    => 'Pengantar komprehensif kecerdasan buatan meliputi machine learning, neural network, logika fuzzy, dan algoritma genetika. Dilengkapi implementasi praktis untuk mahasiswa dan praktisi teknologi.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&q=80',
                'stok'         => 5, 'stok_avail' => 4,
            ],
            [
                'judul'        => 'Jaringan Komputer',
                'penulis'      => 'Andrew S. Tanenbaum',
                'deskripsi'    => 'Buku jaringan komputer paling komprehensif yang membahas lapisan-lapisan OSI, protokol TCP/IP, keamanan jaringan, dan teknologi terkini dari LAN hingga internet modern.',
                'cover_img_url'=> 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&q=80',
                'stok'         => 5, 'stok_avail' => 1,
            ],
        ];

        $data = [];
        foreach ($books as $i => $book) {
            $num        = $i + 1;
            $data[]     = array_merge($book, [
                'id_buku' => 'BK' . str_pad($num, 8, '0', STR_PAD_LEFT),
            ]);
        }

        DB::table('buku')->insert($data);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'stats' => [
                [
                    'label' => 'Total Buku',
                    'value' => (string) Book::count(),
                    'color' => 'bg-blue-500',
                ],
                [
                    'label' => 'Buku Dipinjam',
                    'value' => (string) Book::whereColumn('stok_avail', '<', 'stok')->count(),
                    'color' => 'bg-green-500',
                ],
            ],
            'recentBooks' => Book::orderByDesc('id_buku')->take(4)->get(),
        ]);
    }
}

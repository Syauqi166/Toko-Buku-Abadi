<?php
namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Borrowing;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'stats' => [
                ['label' => 'Total Buku',    'value' => number_format(Book::count()),          'color' => 'bg-blue-500'],
                ['label' => 'Buku Dipinjam', 'value' => (string) Book::where('status','Dipinjam')->count(), 'color' => 'bg-green-500'],
                ['label' => 'Anggota Aktif', 'value' => '856',                                   'color' => 'bg-purple-500'],
            ],
            'recentBooks' => Book::latest()->take(4)->get(),
        ]);
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BorrowingController extends Controller
{
    public function index()
    {
        return Inertia::render('BookBorrowing', [
            'books' => Book::where('status', 'Tersedia')->get(),
        ]);
    }

    // Tambahkan method ini untuk search via API
    public function search(Request $request)
    {
        $books = Book::where('status', 'Tersedia')
            ->where('title', 'like', '%' . $request->q . '%')
            ->get();

        return response()->json($books);
    }
}
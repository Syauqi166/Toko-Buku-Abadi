<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use Inertia\Inertia;

class BorrowingController extends Controller
{
    public function index()
    {
        return Inertia::render('BookBorrowing', [
            'books' => Book::where('status', 'Tersedia')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'book_id'  => 'required|exists:books,id',
            'duration' => 'required|integer|min:1|max:3',
        ]);

        $book = Book::findOrFail($request->book_id);
        $book->update(['status' => 'Dipinjam']);

        Borrowing::create([
            'book_id'     => $book->id,
            'user_id'     => auth()->id(),
            'borrow_date' => now(),
            'return_date' => now()->addDays($request->duration),
            'duration'    => $request->duration,
            'status'      => 'active',
        ]);

        return back()->with('success', 'Peminjaman berhasil dikonfirmasi!');
    }
}

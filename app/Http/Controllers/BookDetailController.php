<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Inertia\Inertia;

class BookDetailController extends Controller
{
    public function show(Book $book)
    {
        $sameAuthor = Book::where('penulis', $book->penulis)
            ->where('id_buku', '!=', $book->id_buku)
            ->take(6)
            ->get();

        $otherBooks = Book::where('penulis', '!=', $book->penulis)
            ->inRandomOrder()
            ->take(6)
            ->get();

        return Inertia::render('BookDetail', [
            'book'       => $book,
            'sameAuthor' => $sameAuthor,
            'otherBooks' => $otherBooks,
        ]);
    }
}

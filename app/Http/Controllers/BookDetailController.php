<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Inertia\Inertia;

class BookDetailController extends Controller
{
    public function show(Book $book)
    {
        $sameAuthor = Book::where('author', $book->author)
            ->where('id', '!=', $book->id)
            ->take(6)
            ->get();

        $otherBooks = Book::where('author', '!=', $book->author)
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
<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index(Request $request)
    {
        $books = Book::when($request->q, function ($query, $search) {
            $query->where('title', 'like', "%{$search}%");
        })->paginate(12);

        return Inertia::render('BookSearch', [
            'books'       => $books,
            'searchQuery' => $request->q ?? '',
        ]);
    }

        public function searchDropdown(Request $request)
    {
        $books = Book::where('title', 'like', '%' . $request->q . '%')
            ->orWhere('author', 'like', '%' . $request->q . '%')
            ->take(6)
            ->get(['id', 'title', 'author', 'cover', 'status']);

        return response()->json($books);
    }
}
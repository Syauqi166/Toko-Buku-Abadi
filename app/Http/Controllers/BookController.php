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
            $query->where('judul', 'like', "%{$search}%")
                  ->orWhere('penulis', 'like', "%{$search}%");
        })->paginate(12);

        return Inertia::render('BookSearch', [
            'books'       => $books,
            'searchQuery' => $request->q ?? '',
        ]);
    }

    public function searchDropdown(Request $request)
    {
        $books = Book::where('judul', 'like', '%' . $request->q . '%')
            ->orWhere('penulis', 'like', '%' . $request->q . '%')
            ->take(6)
            ->get(['id_buku', 'judul', 'penulis', 'cover_img_url', 'stok_avail']);

        return response()->json($books);
    }
}

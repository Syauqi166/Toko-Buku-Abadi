<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\BorrowingController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\BookDetailController;
use App\Http\Controllers\BookController;

// Halaman publik
Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

// Auth
Route::get('/login',    [LoginController::class,    'index'])->name('login');
Route::post('/login',   [LoginController::class,    'store'])->name('login.store');
Route::get('/register', [RegisterController::class, 'index'])->name('register');
Route::post('/register',[RegisterController::class, 'store'])->name('register.store');
Route::post('/logout', function () {
    Auth::logout();
    return redirect('/');
})->name('logout');

// Search dropdown (publik)
Route::get('/api/books/dropdown', [BookController::class, 'searchDropdown']);

// Detail & katalog buku (publik)
Route::get('/buku/{book}',    [BookDetailController::class, 'show'])->name('book.detail');
Route::get('/pencarian-buku', [BookController::class,       'index'])->name('books.index');

// Halaman yang butuh login
Route::middleware('auth')->group(function () {
    Route::get('/peminjaman-buku',  [BorrowingController::class, 'index'])->name('borrowing.index');
    Route::post('/peminjaman-buku', [BorrowingController::class, 'store'])->name('borrowing.store');
    Route::get('/riwayat',          [HistoryController::class,   'index'])->name('history.index');
    Route::get('/api/books/search', [BorrowingController::class, 'search']);
});

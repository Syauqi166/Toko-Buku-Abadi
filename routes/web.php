<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\BorrowingController;
use App\Http\Controllers\HistoryController;

Route::get('/',                  [DashboardController::class, 'index']);
Route::get('/pencarian-buku',    [BookController::class,      'index']);
Route::get('/peminjaman-buku',   [BorrowingController::class, 'index']);
Route::get('/riwayat',           [HistoryController::class,   'index']);
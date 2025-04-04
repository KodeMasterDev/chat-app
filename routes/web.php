<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\MessageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


Route::middleware(['auth'])->group(function () {
    Route::get('/messages/{friend}', [MessageController::class, 'show'])->name('messages.show');
    Route::post('/messages/{friend}', [MessageController::class, 'store'])->name('messages.store');
});

Route::middleware('auth')->group(function () {
    Route::get('/chat', [ChatController::class, 'index'])->name('friends.index');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

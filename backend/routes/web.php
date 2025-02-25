<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // product dashboard route
    Route::get('/product', [ProductController::class, 'list'])->name('product.list');
    Route::get('/product/create', [ProductController::class, 'create'])->name('product.create');
    Route::post('/product/store', [ProductController::class, 'store'])->name('product.store');
    Route::get('/product/{uuid}/edit', [ProductController::class, 'edit'])->name('product.edit');
    Route::put('/product/{uuid}/update', [ProductController::class, 'update'])->name('product.update');
    Route::delete('/product/{uuid}/delete', [ProductController::class, 'destroy'])->name('product.destroy');
});

require __DIR__ . '/auth.php';

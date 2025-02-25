<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'store']);
Route::post('/register', [App\Http\Controllers\Auth\RegisteredUserController::class, 'store']);

Route::apiResource('products', ProductController::class)->only(['index', 'show']);
Route::apiResource('orders', OrderController::class)->only(['index', 'store', 'show']);

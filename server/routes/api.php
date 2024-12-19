<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\LibraryController;
use App\Http\Controllers\WishlistController;
use App\Http\Middleware\CheckRole;

// Authentication Routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('/user', [AuthController::class, 'user']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});

Route::apiResource('/games', GameController::class)->except(['store', 'update', 'destroy']);

// Protected Routes
Route::middleware(['auth:sanctum'])->group(function () {
    // Game Routes
    Route::middleware([CheckRole::class])->group(function () {
        Route::post('/games', [GameController::class, 'store']);
        Route::put('/games/{game}', [GameController::class, 'update']);
        Route::delete('/games/{game}', [GameController::class, 'destroy']);
    });

    // Library Routes
    Route::apiResource('/libraries', LibraryController::class);

    // Wishlist Routes
    Route::apiResource('/wishlists', WishlistController::class);

    // Cart Routes
    Route::apiResource('/carts', CartController::class);
});

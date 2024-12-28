<?php

use Illuminate\Http\Request;
use App\Http\Middleware\CheckRole;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SteamController;
use App\Http\Controllers\LibraryController;
use App\Http\Controllers\WishlistController;

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
    // Game Routes (admin)
    Route::middleware([CheckRole::class])->group(function () {
        Route::post('/games', [GameController::class, 'store']);
        Route::put('/games/{game}', [GameController::class, 'update']);
        Route::delete('/games/{game}', [GameController::class, 'destroy']);
      
        //user
        Route::get('/users', [UserController::class, 'index']); // List all users
        Route::get('/users/{user}', [UserController::class, 'show']); 
        Route::put('/users/{user}', [UserController::class, 'update']); 
        Route::delete('/users/{user}', [UserController::class, 'destroy']); 
    });

    // Library Routes
    Route::apiResource('/libraries', LibraryController::class);

    // Wishlist Routes
    Route::apiResource('/wishlists', WishlistController::class);

    // Cart Routes
    Route::apiResource('/carts', CartController::class);

    // Steam Routes
    Route::get('/steam-games', [SteamController::class, 'index']);
    Route::get('/steam-games/{id}', [SteamController::class, 'show']);

    // Order Routes
    Route::apiResource('/orders', OrderController::class);
    Route::put('/orders/{orderId}', [OrderController::class, 'update']);

});

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\LibraryController;
use App\Http\Controllers\WishlistController;

Route::post('/auth/register', [AuthController::class,'register']);
Route::post('/auth/login', [AuthController::class,'login']);

Route::middleware(['auth:sanctum'])->group(function(){
    Route::get('/auth/user', [AuthController::class, 'user']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    Route::apiResource('/games', GameController::class);
    
    Route::apiResource('/libraries', LibraryController::class);

    Route::apiResource('/wishlists', WishlistController::class);

    Route::apiResource('/carts', CartController::class);
});


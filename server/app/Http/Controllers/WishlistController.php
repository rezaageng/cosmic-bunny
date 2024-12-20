<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use App\Models\wishlist as ModelsWishlist;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'user') {
            $wishlist = Wishlist::where('user_id', $user->id)->get();
        } else {
            $wishlist = Wishlist::all();
        }

        $data = $wishlist->map(function ($wishlist) {
            return $wishlist->game;
        });

        return response()->json([
            'data' => $data,
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'game_id' => 'required|exists:games,id',
        ]);

        // Check if the user already has the game in their Wishlist
        $existingWishlist = Wishlist::where('user_id', $request->user_id)
            ->where('game_id', $request->game_id)
            ->first();

        if ($existingWishlist) {
            return response()->json([
                'message' => 'User already has this game in their Wishlist',
            ], 400);
        }

        $wishlist = Wishlist::create($request->all());

        return response()->json([
            'message' => 'Wishlist successfully created',
            'data' => $wishlist,
        ]);
    }

   
    public function destroy(Wishlist $wishlist){
        $wishlist->delete();

        return response()->json([
            'message'=>'wishlist Deleted'
        ]);
    }

    
}
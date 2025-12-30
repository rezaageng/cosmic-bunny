<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use App\Models\wishlist as ModelsWishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class WishlistController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        if ($user->role === 'user') {
            $version = Cache::get('wishlist:user:' . $user->id . ':version', 1);
            $key = 'wishlist:user:' . $user->id . ':v' . $version;

            $wishlist = Cache::remember($key, 300, function () use ($user) {
                return Wishlist::with('game')->where('user_id', $user->id)->get();
            });
        } else {
            $version = Cache::get('wishlist:all:version', 1);
            $key = 'wishlist:all:v' . $version;

            $wishlist = Cache::remember($key, 300, function () {
                return Wishlist::with('game')->get();
            });
        }

        $data = $wishlist->map(function ($wishlist) {
            return [
                'id' => $wishlist->id,
                'game' => [
                    'id' => $wishlist->game->id,
                    'name' => $wishlist->game->name,
                    'image' => $wishlist->game->header_img,
                    'price' => $wishlist->game->price,
                ],
            ];
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

        // Invalidate user's wishlist cache
        Cache::increment('wishlist:user:' . $request->user_id . ':version');

        return response()->json([
            'message' => 'Wishlist successfully created',
            'data' => $wishlist,
        ]);
    }


    public function destroy(Wishlist $wishlist)
    {
        $wishlist->delete();

        // Invalidate user's wishlist cache
        Cache::increment('wishlist:user:' . $wishlist->user_id . ':version');

        return response()->json([
            'message' => 'wishlist Deleted'
        ]);
    }
}

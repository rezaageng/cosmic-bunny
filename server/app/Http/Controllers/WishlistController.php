<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function index(Request $request)
    {
        $wishlist = Wishlist::with(['user', 'game']);
        
        if($request->has('user_id')){
            $wishlist->where('user_id', $request->user_id);
        }

        if($request->has('game_id')){
            $wishlist->where('game_id', $request->game_id);
        }

        $wishlist = $wishlist->get();

        return response()->json([
            'message' => 'List of wishlists',
            'data' => $wishlist,
        ]);

    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'game_id' => 'required|exists:games,id',
        ]);

        $wishlist = Wishlist::create($request->all());

        return response()->json([
            'message' => 'Wishlist added successfully',
            'data' => $wishlist,
        ]);
    }

    public function show(Wishlist $wishlist){
        $wishlist->load(['user', 'games']);

        return response()->json([
            'message'=>'Wishlist details',
            'data'=>$wishlist
        ]);
    }


    public function update(Request $request, Wishlist $wishlist){
        $request->validate([
            'game_id'=>'required|exists:games,id',
        ]);

        $wishlist->update([
            'game_id' => $request->game_id,  
        ]);

        return response()->json([
            'message'=>'Wishlist update success',
            'data'=>$wishlist
        ]);
    }

    public function destroy(Wishlist $wishlist){
        $wishlist->delete();

        return response()->json([
            'message'=>'wishlist Deleted'
        ]);
    }

    
}
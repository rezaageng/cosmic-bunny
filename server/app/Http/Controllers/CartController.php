<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index(Request $request){
        $user = $request->user();

        if ($user->role === 'user') {
            $cart = Cart::where('user_id', $user->id)->get();
        } else {
            $cart = Cart::all();
        }

        $data = $cart->map(function ($cart) {
            return $cart->game;
        });

        $amount = $cart->sum(function ($cart) {
            return $cart->game->price;
        } );

        return response()->json([
            'data' => [
                'games' => $data,
                'amount' => $amount,
            ]
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'user_id'=>'required|exists:users,id',
            'game_id'=>'required|exists:games,id',
        ]);

        $cart=Cart::create($request->all());

        return response()->json([
            'message'=>'library successfully created',
            'data'=>$cart,
        ]);
    }


    public function destroy(Cart $cart){
        $cart->delete();

        return response()->json([
            'message'=>'Cart Deleted'
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index(Request $request){
        $cart = Cart::with(['user', 'game']);

        if($request->has('user_id')){
            $cart->where('user_id', $request->user_id);
        }
    
        if($request->has('game_id')){
            $cart->where('game_id', $request->game_id);
        }

        $cart=$cart->get();

        return response()->json([
            'message' => 'List Carts',
            'data' => $cart,
        ]);
    }
}

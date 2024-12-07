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

    public function show(Cart $cart){
        $cart->load(['user', 'games']);

        return response()->json([
            'message'=>'Cart details',
            'data'=>$cart
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        if($user->role === 'user'){
            $order = Order::where('user_id', $user->id)->get();
        }else{
                $order = Order::all();
        }

        $data = $order->map(function($order){
            return [
                'id' => $order->id,
                'game' => [
                    'id' => $order->game->id,
                    'name' => $order->game->name,
                    'image' => $order->game->image,
                    'price' => $order->game->price,
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

        //cek ad game yg sama g di order
        $existingOrder = Order::where('user_id', $request->user_id)
            ->where('game_id', $request->game_id)
            ->first();

        if($existingOrder){
            return response()->json([
                'message' => 'Game already added in Order',
            ]);
        }

        $order = Order::create($request->all());

        return response()->json([
            'message' => 'Order created successfully',
            'data' => $order,
        ]);
    }

}

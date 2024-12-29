<?php

namespace App\Http\Controllers;

use App\Models\Games;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'user') {
            // Hanya mengambil data orders dari user_id
            $orders = Order::where('user_id', $user->id)->with('games')->get();
        } else {
            // admin get kabeh
            $orders = Order::with('games')->get();
        }

        $data = $orders->map(function ($order) {

            $totalAmount = $order->games->sum('price');
            return [
                'id' => $order->id,
                'status' => $order->status,
                'amount' => $totalAmount,
                'user' => [
                    'id' => $order->user->id,
                    'name' => $order->user->name,
                    'email' => $order->user->email,
                ],
                'games' => $order->games->map(function ($game) {
                    return [
                        'id' => $game->id,
                        'name' => $game->name,
                        'image' => $game->image,
                        'price' => $game->price,
                    ];
                }),
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
            'status' => 'required|in:pending,succeed,failed',
            'game_ids' => 'required|array',
            'game_ids.*' => 'exists:games,id',
        ]);
    
        // Membuat order baru
        $order = Order::create([
            'user_id' => $request->user_id,
            'status' => $request->status,
        ]);
    
        // Menambahkan game ke order
        $order->games()->attach($request->game_ids);
    
        $order->load('games', 'user');
    
        $data = [
            'id' => $order->id,
            'status' => $order->status,
            'user' => [
                'id' => $order->user->id,
                'name' => $order->user->name,
                'email' => $order->user->email,
            ],
            'games' => $order->games->map(function ($game) {
                return [
                    'id' => $game->id,
                    'name' => $game->name,
                    'image' => $game->image,
                    'price' => $game->price,
                ];
            }),
        ];
    
        return response()->json([
            'message' => 'Order created successfully',
            'data' => $data,
        ]);
    }

    public function update(Request $request, $orderId)
    {
        $user = $request->user();

        $request->validate([
            'game_ids' => 'required|array',
            'game_ids.*' => 'exists:games,id',
        ]);

        $order = Order::findOrFail($orderId);

        // User hanya bisa mengupdate order miliknya
        if ($user->role === 'user' && $order->user_id !== $user->id) {
            return response()->json(['message' => 'You are not authorized to update this order.']);
        }

        // Sinkronisasi game_ids
        $order->games()->sync($request->game_ids);

        $order->load('games', 'user');

        $data = [
            'id' => $order->id,
            'status' => $order->status,
            'user' => [
                'id' => $order->user->id,
                'name' => $order->user->name,
                'email' => $order->user->email,
            ],
            'games' => $order->games->map(function ($game) {
                return [
                    'id' => $game->id,
                    'name' => $game->name,
                    'image' => $game->image,
                    'price' => $game->price,
                ];
            }),
        ];

        return response()->json([
            'message' => 'Order updated successfully',
            'data' => $data,
        ]);
    }

    public function show(Request $request, $orderId)
    {
        $user = $request->user();

        $order = Order::where('user_id', $user->id)->findOrFail($orderId);
    
        $totalAmount = $order->games->sum('price');
    
        $data = [
            'id' => $order->id,
            'status' => $order->status,
            'amount' => $totalAmount, // Total harga dari games di order
            'user' => [
                'id' => $order->user->id,
                'name' => $order->user->name,
                'email' => $order->user->email,
            ],
            'games' => $order->games->map(function ($game) {
                return [
                    'id' => $game->id,
                    'name' => $game->name,
                    'image' => $game->image,
                    'price' => $game->price,
                ];
            }),
        ];
    
        return response()->json([
            'data' => $data,
        ]);
    }

    public function destroy(Order $order)
    {
        $order->delete();
        return response()->json([
            'message' => 'order Deleted'
        ]);
    }
}

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
        
        if ($user->role === 'admin') {
            // Ambil user_id dari parameter request
            $userId = $request->query('user_id');
    
            // Jika user_id diberikan, ambil order berdasarkan user_id
            if ($userId) {
                $orders = Order::where('user_id', $userId)->with('games')->get();
            } else {
                // Jika tidak ada user_id, ambil semua order
                $orders = Order::with('games')->get();
            }
        } else {
            // Jika pengguna adalah user biasa, ambil order berdasarkan user_id
            $orders = Order::where('user_id', $user->id)->with('games')->get();
        }
    
        // Memformat data untuk respons
        $data = $orders->map(function ($order) {
            return [
                'id' => $order->id,
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
            'game_ids' => 'required|array', // Mengubah dari game_id menjadi game_ids
            'game_ids.*' => 'exists:games,id', // Validasi setiap game_id
        ]);
    
        // Membuat order baru
        $order = Order::create(['user_id' => $request->user_id]);
    
        // Menambahkan game ke order
        foreach ($request->game_ids as $gameId) {
            $game = Games::find($gameId);
            $game->order_id = $order->id; // Mengaitkan game dengan order
            $game->save();
        }
    
        return response()->json([
            'message' => 'Order created successfully',
            'data' => $order->load('games'), // Memuat relasi games
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

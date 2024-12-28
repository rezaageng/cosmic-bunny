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
            // Hanya mengambil data orders berdasarkan user_id pengguna aktif
            $orders = Order::where('user_id', $user->id)->with('games')->get();
        } else {
            // Mengambil semua data orders tanpa filter user_id
            $orders = Order::with('games')->get();
        }

        $data = $orders->map(function ($order) {
            // Hitung total amount dari game terkait di sini
            $totalAmount = $order->games->sum('price');
            return [
                'id' => $order->id,
                'status' => $order->status,
                'amount' => $totalAmount, // Gunakan total harga dari game
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
        foreach ($request->game_ids as $gameId) {
            $game = Games::find($gameId);
            $game->order_id = $order->id;
            $game->save();
        }
        
        $orderData = $order->load('games');

        $orderData->games->each(function ($game) {
            $game->makeHidden(['order_id']);
        });

        return response()->json([
            'message' => 'Order created successfully',
            'data' => $orderData,
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

        //user cmn bisa update milik sndiri
        if ($user->role === 'user' && $order->user_id !== $user->id) {
            return response()->json(['message' => 'You are not authorized to update this order.']);
        }

        $currentGameIds = $order->games->pluck('id')->toArray();

        $newGameIds = $request->game_ids;

        //hpus game dri order
        $removedGameIds = array_diff($currentGameIds, $newGameIds);

        if (count($removedGameIds) > 0) {
            $order->games()->whereIn('id', $removedGameIds)->update(['order_id' => null]);
        }

        foreach ($newGameIds as $gameId) {

            $game = Games::find($gameId);
            if ($game && $game->order_id !== $order->id) {
                $game->order_id = $order->id;  // Set order_id
                $game->save();
            }
        }

        $orderData = $order->load('games');

        $orderData->games->each(function ($game) {
            $game->makeHidden(['order_id']);
        });

        return response()->json([
            'message' => 'Order updated successfully',
            'data' => $orderData,
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

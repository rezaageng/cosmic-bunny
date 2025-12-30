<?php

namespace App\Http\Controllers;

use App\Models\Games;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class GameController extends Controller
{
    // List games with optional search and pagination
    public function index(Request $request)
    {
        $query = Games::with('categories');

        if ($request->has('search')) {
            $query->where('name', 'ilike', "%" . $request->search . "%");
        }

        $version = Cache::get('games:index:version', 1);
        $key = 'games:index:v' . $version . ':' . md5($request->fullUrl());

        $data = Cache::remember($key, 300, function () use ($query) {
            return $query->get();
        });

        return response()->json([
            'message' => 'List of games',
            'data' => $data
        ]);
    }

    // Create a new game
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'short_description' => 'required|string',
            'description' => 'required|string',
            'publisher' => 'required|string',
            'price' => 'required|numeric',
            'header_img' => 'required|string',
            'image' => 'required|string',
            'categories' => 'sometimes|array',
            'categories.*' => 'exists:categories,id'
        ]);

        $game = Games::create($request->only([
            'name',
            'short_description',
            'description',
            'publisher',
            'price',
            'header_img',
            'image',
        ]));

        if ($request->has('categories')) {
            $game->categories()->attach($request->categories);
        }

        // Reload the model with categories
        $game->load('categories');
        // Invalidate index cache by bumping version
        Cache::increment('games:index:version');

        return response()->json([
            'message' => 'Game created successfully',
            'data' => $game
        ]);
    }


    // Show game details
    public function show(Games $game)
    {
        $game->load('categories:id,name'); // Memuat kategori dengan id dan nama saja

        $version = Cache::get('games:show:version:' . $game->id, 1);
        $key = 'games:show:' . $game->id . ':v' . $version;

        $data = Cache::remember($key, 300, function () use ($game) {
            return $game;
        });

        return response()->json([
            'message' => 'Game details',
            'data' => $data,
        ]);
    }


    // Update an existing game
    public function update(Request $request, Games $game)
    {
        $request->validate([
            'name' => 'string',
            'short_description' => 'string',
            'description' => 'string',
            'publisher' => 'string',
            'price' => 'decimal:,8,2',
            'header_img' => 'string',
            'image' => 'string',
            'categories' => 'array',
            'categories.*' => 'integer|exists:categories,id'
        ]);

        $game->update($request->all());

        if ($request->has('categories')) {
            $game->categories()->sync($request->categories);
        }

        // Bump index version and show version for this game
        Cache::increment('games:index:version');
        Cache::increment('games:show:version:' . $game->id);

        return response()->json([
            'message' => 'Game updated successfully',
            'data' => $game->load('categories'),
        ]);
    }


    // Delete a game
    public function destroy(Games $game)
    {
        $game->delete();

        // Invalidate caches
        Cache::increment('games:index:version');
        Cache::increment('games:show:version:' . $game->id);

        return response()->json([
            'message' => 'Game deleted successfully',
        ]);
    }
}

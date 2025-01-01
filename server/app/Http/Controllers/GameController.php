<?php

namespace App\Http\Controllers;

use App\Models\Games;
use Illuminate\Http\Request;

class GameController extends Controller
{
    // List games with optional search and pagination
    public function index(Request $request)
{
    $game = Games::with('categories');

    if ($request->has('search')) {
        $game->where('name', 'like', "%" . $request->search . "%");
    }

    return response()->json([
        'message' => 'List of games',
        'data' => $game->get()
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

    return response()->json([
        'message' => 'Game created successfully',
        'data' => $game
    ]);
}


    // Show game details
    public function show(Games $game)
{
    $game->load('categories:id,name'); // Memuat kategori dengan id dan nama saja

    return response()->json([
        'message' => 'Game details',
        'data' => $game,
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

    return response()->json([
        'message' => 'Game updated successfully',
        'data' => $game->load('categories'),
    ]);
}


    // Delete a game
    public function destroy(Games $game)
    {
        $game->delete();

        return response()->json([
            'message' => 'Game deleted successfully',
        ]);
    }
}

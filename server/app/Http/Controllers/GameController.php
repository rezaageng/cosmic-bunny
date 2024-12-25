<?php

namespace App\Http\Controllers;

use App\Models\Games;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function index(Request $request)
    {
        $game = Games::query();

        if ($request->has('search')) {
            $game->where('name', 'like', "%" . $request->search . "%");
        }
        $game = $game->get();

        return response()->json([
            'messages' => 'list of games',
            'data' => $game
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name'=>'required|string',
            'short_description'=>'required|string',
            'description'=>'required|string',
            'publisher'=>'required|string',
            'price'=>'required|decimal:,8,2',
            'header_img' => 'required|string',
            'image' => 'required|string'
        ]);

        $game = Games::create($request->all());

        return response()->json([
            'message' => 'Games created succesfully',
            'data' => $game,
        ]);
    }

    public function show(Games $game)
    {
        return response()->json([
            'messages' => 'game details',
            'data' => $game
        ]);
    }

    public function update(Request $request, Games $game)
    {
        $request->validate([
            'name'=>'required|string',
            'short_description'=>'required|string',
            'description'=>'required|string',
            'publisher'=>'required|string',
            'price'=>'required|decimal:,8,2',
            'header_img' => 'required|string',
            'image' => 'required|string'
        ]);

        $game->update($request->all());

        return response()->json([
            'message' => 'Game Update Succes',
            'data' => $game,
        ]);
    }

    public function destroy(Games $game)
    {
        $game->delete();

        return response()->json([
            'message' => 'game delete succes',
        ]);
    }
}

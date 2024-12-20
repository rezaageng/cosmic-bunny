<?php

namespace App\Http\Controllers;

use App\Models\Library;
use Illuminate\Http\Request;

class LibraryController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'user') {
            $libraries = Library::where('user_id', $user->id)->get();
        } else {
            $libraries = Library::all();
        }

        $data = $libraries->map(function ($library) {
            return [
                'id' => $library->id,
                'name' => $library->game->name,
                'image' => $library->game->image,
            ];
        });

        return response()->json([
            'data' => $data,
        ]);
    }

    //create library
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'game_id' => 'required|exists:games,id',
        ]);

        // Check if the user already has the game in their library
        $existingLibrary = Library::where('user_id', $request->user_id)
            ->where('game_id', $request->game_id)
            ->first();

        if ($existingLibrary) {
            return response()->json([
                'message' => 'User already has this game in their library',
            ], 400);
        }

        $library = Library::create($request->all());

        return response()->json([
            'message' => 'Library successfully created',
            'data' => $library,
        ]);
    }

    //delete
    public function destroy(Library $library)
    {
        $library->delete();

        return response()->json([
            'message' => 'Library Deleted'
        ]);
    }
}

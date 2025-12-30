<?php

namespace App\Http\Controllers;

use App\Models\Library;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class LibraryController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'user') {
            $version = Cache::get('libraries:user:' . $user->id . ':version', 1);
            $key = 'libraries:user:' . $user->id . ':v' . $version;

            $libraries = Cache::remember($key, 300, function () use ($user) {
                return Library::with('game')->where('user_id', $user->id)->get();
            });
        } else {
            $version = Cache::get('libraries:all:version', 1);
            $key = 'libraries:all:v' . $version;

            $libraries = Cache::remember($key, 300, function () {
                return Library::with('game')->get();
            });
        }

        $data = $libraries->map(function ($library) {
            return [
                'id' => $library->id,
                'game' => [
                    'id' => $library->game->id,
                    'name' => $library->game->name,
                    'image' => $library->game->header_img,
                ],
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

        // Invalidate user's library cache
        Cache::increment('libraries:user:' . $request->user_id . ':version');

        return response()->json([
            'message' => 'Library successfully created',
            'data' => $library,
        ]);
    }

    //delete
    public function destroy(Library $library)
    {
        $library->delete();

        // Invalidate cache for this user
        Cache::increment('libraries:user:' . $library->user_id . ':version');

        return response()->json([
            'message' => 'Library Deleted'
        ]);
    }
}

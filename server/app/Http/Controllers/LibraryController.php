<?php

namespace App\Http\Controllers;

use App\Models\Library;
use Illuminate\Http\Request;

class LibraryController extends Controller
{
    public function index(Request $request){
        $library = Library::with(['user', 'game']);

        if($request->has('user_id')){
            $library->where('user_id', $request->user_id);
        }
    
        if($request->has('game_id')){
            $library->where('game_id', $request->game_id);
        }

        $library=$library->get();

        return response()->json([
            'message' => 'List Library',
            'data' => $library,
        ]);
    }

    //create library
    public function store(Request $request){
        $request->validate([
            'user_id'=>'required|exists:users,id',
            'game_id'=>'required|exists:games,id',
        ]);

        $library=Library::create($request->all());

        return response()->json([
            'message'=>'library successfully created',
            'data'=>$library,
        ]);
    }

    //show
    public function show(Library $library){
        $library->load(['user', 'games']);

        return response()->json([
            'message'=>'Library details',
            'data'=>$library
        ]);
    }

    //update
    public function update(Request $request, Library $library){
        $request->validate([
            'game_id'=>'required|exists:games,id',
        ]);

        $library->update([
            'game_id' => $request->game_id,  // Update game
        ]);

        return response()->json([
            'message'=>'Library update success',
            'data'=>$library
        ]);
    }

    //delete
    public function destroy(Library $library){
        $library->delete();

        return response()->json([
            'message'=>'Library Deleted'
        ]);
    }
}

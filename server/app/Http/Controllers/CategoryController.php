<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of categories.
     */
    public function index()
    {
        $categories = Category::with('games')->get();

        return response()->json([
            'message' => 'List of categories',
            'data' => $categories
        ]);
    }

    /**
     * Store a newly created category in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'game_ids' => 'sometimes|array',
            'game_ids.*' => 'exists:games,id',
        ]);

        $category = Category::create($request->only('name'));

        if ($request->has('game_ids')) {
            $category->games()->attach($request->game_ids);
        }

        return response()->json([
            'message' => 'Category created successfully',
            'data' => $category
        ]);
    }

    /**
     * Display the specified category.
     */
    public function show(Category $category)
    {
        $category->load('games'); // Load related games

        return response()->json([
            'message' => 'Category details',
            'data' => $category
        ]);
    }

    /**
     * Update the specified category in storage.
     */
    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
        ]);

        $category->update($request->only('name'));

        return response()->json([
            'message' => 'Category updated successfully',
            'data' => $category
        ]);
    }

    /**
     * Remove the specified category from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json([
            'message' => 'Category deleted successfully',
        ]);
    }
}

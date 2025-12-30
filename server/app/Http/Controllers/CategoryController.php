<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class CategoryController extends Controller
{
    /**
     * Display a listing of categories.
     */
    public function index(Request $request)
    {
        $query = Category::with('games');

        if ($request->has('search')) {
            $query->where('name', 'ilike', "%" . $request->search . "%");
        }

        $version = Cache::get('categories:index:version', 1);
        $key = 'categories:index:v' . $version . ':' . md5($request->fullUrl());

        $categories = Cache::remember($key, 300, function () use ($query) {
            return $query->get();
        });

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
        // Invalidate categories index cache
        Cache::increment('categories:index:version');

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

        $version = Cache::get('categories:show:version:' . $category->id, 1);
        $key = 'categories:show:' . $category->id . ':v' . $version;

        $data = Cache::remember($key, 300, function () use ($category) {
            return $category;
        });

        return response()->json([
            'message' => 'Category details',
            'data' => $data
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

        // Invalidate index and show cache for this category
        Cache::increment('categories:index:version');
        Cache::increment('categories:show:version:' . $category->id);

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

        // Invalidate caches
        Cache::increment('categories:index:version');
        Cache::increment('categories:show:version:' . $category->id);

        return response()->json([
            'message' => 'Category deleted successfully',
        ]);
    }
}

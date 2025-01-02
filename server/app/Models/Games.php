<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Category;

class Games extends Model
{
    protected $fillable = ['name', 'short_description', 'description', 'publisher', 'price', 'header_img', 'image'];

    protected $casts = [
        'price' => 'float',
    ];

    protected $appends = ['categories_list'];

    protected $hidden = ['categories'];

    public function orders()
    {
        return $this->belongsTo(Order::class, 'game_order', 'order_id', 'game_id');
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_game', 'game_id', 'category_id');
    }

    public function getCategoriesListAttribute()
    {
        return $this->categories->pluck('name')->toArray();
    }
}

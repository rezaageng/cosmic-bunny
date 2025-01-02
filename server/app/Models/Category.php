<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name'];

    public function games()
    {
        return $this->belongsToMany(Games::class, 'category_game', 'category_id', 'game_id');
    }
}    
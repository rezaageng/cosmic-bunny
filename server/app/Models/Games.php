<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Games extends Model
{
    protected $fillable = [
        'name',
        'short_description',
        'description',
        'publisher',
        'price',
        'header_img',
        'image'
    ];

    protected $casts = [
        'price' => 'float',
    ];

    public function orders()
    {
        return $this->belongsTo(Order::class, 'game_order', 'order_id', 'game_id');
    }
}

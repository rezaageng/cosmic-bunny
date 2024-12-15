<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Games extends Model
{
    protected $fillable = [
        'name',
        'description',
        'publisher',
        'price',
    ];

    protected $casts = [
        'price' => 'float',
    ];
}

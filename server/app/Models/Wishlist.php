<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class wishlist extends Model
{
    protected $table='wishlists';
    protected $fillable = [
        'user_id',
        'game_id'
    ];
    

    // Relasi ke User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi ke Game
    public function game()
    {
        return $this->belongsTo(Games::class);
    }
}

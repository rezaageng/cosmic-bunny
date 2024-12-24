<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table='orders';
    protected $fillable = [
        'user_id',
        'game_id'
    ];

    //relasi ke user
    public function user(){
        return $this->belongsTo(User::class);
    }

    //relasi ke game
    public function game(){
        return $this->belongsTo(Games::class);
    }
}

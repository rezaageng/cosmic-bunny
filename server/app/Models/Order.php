<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table='orders';
    protected $fillable = [
        'user_id',
        'status'
    ];

    //relasi ke user
    public function user(){
        return $this->belongsTo(User::class);
    }

    //relasi ke game
    public function games(){
        return $this->hasMany(Games::class);
    }
}

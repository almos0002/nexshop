<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    protected $fillable = [
        'uuid',
        'name',
        'description',
        'price',
        'stock',
        'image',
    ];

    public function orders()
    {
        return $this->belongsToMany(Order::class);
    }

    public function orderProducts()
    {
        return $this->belongsToMany(OrderProduct::class);
    }
}

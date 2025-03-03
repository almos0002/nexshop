<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

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

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        if ($this->image) {
            return Storage::url($this->image);
        }
        return null;
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class);
    }

    public function orderProducts()
    {
        return $this->belongsToMany(OrderProduct::class);
    }
}

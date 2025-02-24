<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Products extends Model
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
}

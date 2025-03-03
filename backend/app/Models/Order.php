<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Order extends Model
{
    protected $fillable = [
        'uuid',
        'user_id',
        'total_price',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orderProducts()
    {
        return $this->hasMany(OrderProduct::class, 'order_uuid', 'uuid');
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_products', 'order_uuid', 'product_uuid', 'uuid', 'uuid')
            ->withPivot(['quantity', 'price'])
            ->withTimestamps();
    }

    public function transaction(): HasOne
    {
        return $this->hasOne(Transaction::class);
    }
}

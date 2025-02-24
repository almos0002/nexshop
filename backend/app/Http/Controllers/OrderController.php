<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;

class OrderController extends Controller
{
    public function index()
    {
        return OrderResource::collection(Order::all());
    }

    public function store(Request $request)
    {
        $order = Order::create([
            'uuid' => 'OD' . mt_rand(100000, 999999),
            'user_id' => $request->user_id,
            'total_price' => 0,
        ]);

        $totalPrice = 0;
        foreach ($request->products as $product) {
            $orderProduct = OrderProduct::create([
                'order_uuid' => $order->uuid,
                'product_uuid' => $product['uuid'],
                'quantity' => $product['quantity'],
                'price' => $product['price']
            ]);
            $totalPrice += $orderProduct->quantity * $orderProduct->price;
        }

        $product = Product::where('uuid', $orderProduct->product_uuid)->first();
        $product->update([
            'stock' => $product->stock - $orderProduct->quantity
        ]);
        $order->update([
            'total_price' => $totalPrice
        ]);

        return new OrderResource($order->fresh());
    }

    public function show(string $uuid)
    {
        $order = Order::where('uuid', $uuid)->first();
        return new OrderResource($order);
    }
}

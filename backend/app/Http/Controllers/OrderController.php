<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderProductResource;
use Illuminate\Http\Request;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use App\Models\User;

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
                'price' => Product::where('uuid', $product['uuid'])->firstOrFail()->price,
            ]);
            $totalPrice += $orderProduct->quantity * $orderProduct->price;
        }

        $product = Product::where('uuid', $orderProduct->product_uuid)->first();
        if ($product->stock >= $orderProduct->quantity) {
            $product->update([
                'stock' => $product->stock - $orderProduct->quantity
            ]);
        } else {
            return response()->json(['error' => "Not Enough Quantity"], 400);
        }



        $order->update([
            'total_price' => $totalPrice
        ]);

        $user = User::where('id', $request->user_id)->first();

        if ($user->wallet >= $totalPrice) {
            $user->update([
                'wallet' => $user->wallet - $totalPrice
            ]);
        } else {
            return response()->json(['error' => 'Insufficient Balance, Add some money Gareeb'], 400);
        }

        return new OrderResource($order->fresh());
    }

    public function show(string $uuid)
    {
        $order = Order::where('uuid', $uuid)->first();
        $orderProducts = OrderProduct::where('order_uuid', $uuid)->get();
        return response()->json([
            'uuid' => $order->uuid,
            'total_price' => $order->total_price,
            'products' => OrderProductResource::collection($orderProducts)
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderProductResource;
use Illuminate\Http\Request;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Exception;

class OrderController extends Controller
{
    public function index()
    {
        // Get the authenticated user
        $user = auth()->user();
        
        // Return only orders for the authenticated user
        return response()->json([
            "data" => Order::where('user_id', $user->id)->get()->map(function ($order) {
                return [
                    "uuid" => $order->uuid,
                    "user_id" => $order->user_id,
                    "total_price" => $order->total_price,
                    "created_at" => $order->created_at
                ];
            })
        ]);
    }

    public function store(Request $request)
    {
        // Validate request
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'products' => 'required|array|min:1',
            'products.*.uuid' => 'required|exists:products,uuid',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        // Start a database transaction
        DB::beginTransaction();

        try {
            // Calculate total price and check product quantities
            $totalPrice = 0;
            $productUpdates = [];

            // First, validate all products have enough quantity and calculate total price
            foreach ($request->products as $productData) {
                $product = Product::where('uuid', $productData['uuid'])->lockForUpdate()->firstOrFail();
                $quantity = $productData['quantity'];

                // Check if enough quantity is available
                if ($product->stock < $quantity) {
                    DB::rollBack();
                    return response()->json(['error' => 'Not Enough Quantity', 'product' => $product->name], 400);
                }

                $price = $product->price;
                $subtotal = $price * $quantity;
                $totalPrice += $subtotal;

                // Save product data for later update
                $productUpdates[] = [
                    'product' => $product,
                    'quantity' => $quantity,
                    'price' => $price
                ];
            }

            // Check if user has enough balance
            $user = User::where('id', $request->user_id)->lockForUpdate()->firstOrFail();
            if ($user->wallet < $totalPrice) {
                DB::rollBack();
                return response()->json(['error' => 'Not Enough Balance', 'required' => $totalPrice, 'available' => $user->wallet], 400);
            }

            // Create the order
            $order = Order::create([
                'uuid' => 'OD' . mt_rand(100000, 999999),
                'user_id' => $request->user_id,
                'total_price' => $totalPrice,
            ]);

            // Create order products and update stock
            foreach ($productUpdates as $data) {
                $product = $data['product'];
                $quantity = $data['quantity'];
                $price = $data['price'];

                // Create order product
                OrderProduct::create([
                    'order_uuid' => $order->uuid,
                    'product_uuid' => $product->uuid,
                    'quantity' => $quantity,
                    'price' => $price,
                ]);

                // Update product stock
                $product->update([
                    'stock' => $product->stock - $quantity
                ]);
            }

            // Update user's wallet
            $user->update([
                'wallet' => $user->wallet - $totalPrice
            ]);

            // Commit the transaction
            DB::commit();

            return new OrderResource($order->fresh());
        } catch (Exception $e) {
            // Something went wrong, rollback the transaction
            DB::rollBack();
            return response()->json(['error' => 'Order processing failed', 'message' => $e->getMessage()], 500);
        }
    }

    public function show(string $uuid)
    {
        $user = auth()->user();
        $order = Order::where('uuid', $uuid)->where('user_id', $user->id)->first();
        
        if (!$order) {
            return response()->json([
                'error' => 'Order not found or you do not have permission to view it'
            ], 404);
        }
        
        $orderProducts = OrderProduct::where('order_uuid', $uuid)->get();
        return response()->json([
            'uuid' => $order->uuid,
            'user_id' => $order->user_id,
            'total_price' => $order->total_price,
            'created_at' => $order->created_at,
            'products' => OrderProductResource::collection($orderProducts)
        ]);
    }
}

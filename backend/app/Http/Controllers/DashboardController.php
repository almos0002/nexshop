<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        $TotalProducts = Product::all()->count();
        $TotalOrders = Order::all()->count();
        $TotalUsers = User::all()->count();
        $TotalRevenue = Order::sum('total_price');
        
        // Get recent orders for dashboard
        $recentOrders = Order::with('user')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();
            
        return view('dashboard', compact('TotalProducts', 'TotalOrders', 'TotalUsers', 'TotalRevenue', 'recentOrders'));
    }
    
    /**
     * Show all orders (admin view)
     */
    public function orders(Request $request)
    {
        $query = Order::query()->with('user');
        
        // Filter by status if provided
        if ($request->has('status')) {
            if ($request->status === 'completed') {
                $query->where('total_price', '>', 0);
            } elseif ($request->status === 'processing') {
                $query->where('total_price', '=', 0);
            }
        }
        
        // Search by order ID
        if ($request->has('search') && !empty($request->search)) {
            $query->where('uuid', 'like', '%' . $request->search . '%');
        }
        
        // Sort orders
        $sortField = $request->sort ?? 'created_at';
        $sortDirection = $request->direction ?? 'desc';
        $query->orderBy($sortField, $sortDirection);
        
        $orders = $query->paginate(10)->withQueryString();
        
        return view('orders', compact('orders'));
    }
    
    /**
     * Show order details
     */
    public function orderDetails($uuid)
    {
        $order = Order::with(['user', 'products'])->where('uuid', $uuid)->firstOrFail();
        
        return view('order-details', compact('order'));
    }
}

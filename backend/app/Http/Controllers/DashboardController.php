<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Order;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        $TotalProducts = Product::all()->count();
        $TotalOrders = Order::all()->count();
        $TotalUsers = User::all()->count();
        $TotalRevenue = Order::sum('total_price');
        return view('dashboard', compact('TotalProducts', 'TotalOrders', 'TotalUsers', 'TotalRevenue'));
    }
}

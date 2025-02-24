<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\ProductResource;
use App\Models\Product;

class ProductController extends Controller
{
    // Display the table data in json form
    public function index()
    {
        return ProductResource::collection(Product::all());
    }

    // Show the form for creating a new resource
    public function create()
    {
        return view('product.create');
    }

    // Store the products data in table
    public function store(Request $request)
    {
        $product = Product::create([
            'uuid' => 'PP' . mt_rand(100000, 999999),
            ...$request->all()
        ]);
        return redirect()->route('products.create', $product->uuid);
    }

    // Display the specified resource
    public function show(string $uuid)
    {
        $product = Product::where('uuid', $uuid)->first();
        return new ProductResource($product);
    }

    // Show the form for editing the specified resource
    public function edit(string $uuid)
    {
        $product = Product::where('uuid', $uuid)->first();
        return view('product.edit', compact('product'));
    }

    // Update the specified resource in storage.
    public function update(Request $request, string $uuid)
    {
        $product = Product::where('uuid', $uuid)->first();
        $product->update($request->all());
        return redirect()->route('products.create');
    }

    // Remove the specified resource from storage.
    public function destroy(string $uuid)
    {
        $product = Product::where('uuid', $uuid)->first();
        $product->delete();
        return redirect()->route('products.create');
    }
}

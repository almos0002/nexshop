<?php

namespace App\Http\Controllers;

use App\Models\Product;
// use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Resources\ProductResource;

class ProductController extends Controller
{
    // Display the table data in json form
    public function index()
    {
        return ProductResource::collection(Product::all());
    }

    public function list()
    {
        $products = Product::paginate(10);
        return view('product.list', compact('products'));
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

        // Handle product image upload
        if ($request->hasFile('image')) {
            $profilePath = $request->file('image')->store('product-images', 'public');
            $product['image'] = $profilePath;
            $product->save();
        }

        return redirect()->route('product.list', $product->uuid)->with('success', 'Product created successfully');
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

        // Handle product image upload
        if ($request->hasFile('image')) {
            $profilePath = $request->file('image')->store('product-images', 'public');
            $product['image'] = $profilePath;
            $product->update();
        }

        return redirect()->route('product.list')->with('success', 'Product updated successfully');
    }

    // Remove the specified resource from storage.
    public function destroy(string $uuid)
    {
        $product = Product::where('uuid', $uuid)->first();
        $product->delete();
        return redirect()->route('product.list')->with('success', 'Product deleted successfully');
    }
}

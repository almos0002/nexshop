<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Resources\ProductResource;
use Illuminate\Support\Facades\Storage;

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
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image|max:10240', // Max 10MB
        ]);

        $product = Product::create([
            'uuid' => 'PP' . mt_rand(100000, 999999),
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
        ]);

        // Handle product image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('product-images', 'public');
            $product->image = $imagePath;
            $product->save();
        }

        return redirect()->route('product.list')->with('success', 'Product created successfully');
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
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image|max:10240', // Max 10MB
        ]);

        $product = Product::where('uuid', $uuid)->first();
        
        $product->name = $request->name;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->stock = $request->stock;

        // Handle product image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            
            $imagePath = $request->file('image')->store('product-images', 'public');
            $product->image = $imagePath;
        }
        
        $product->save();

        return redirect()->route('product.list')->with('success', 'Product updated successfully');
    }

    // Remove the specified resource from storage.
    public function destroy(string $uuid)
    {
        $product = Product::where('uuid', $uuid)->first();
        
        // Delete the product image if it exists
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }
        
        $product->delete();
        return redirect()->route('product.list')->with('success', 'Product deleted successfully');
    }
}

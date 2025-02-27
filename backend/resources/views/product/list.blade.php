@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Product List</h5>
                    <a href="{{ route('product.create') }}" class="btn btn-primary btn-sm">Add Product</a>
                </div>
                <div class="card-body">
                    @if($products->count() > 0)
                        <div class="list-group">
                            @foreach($products as $product)
                                <div class="list-group-item list-group-item-action">
                                    <div class="d-flex w-100 justify-content-between align-items-center">
                                        <h6 class="mb-1">{{ $product->name }}</h6>
                                        <small>₹{{ number_format($product->price, 2) }}</small>
                                    </div>
                                    <p class="mb-1">{{ Str::limit($product->description, 50) }}</p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <small class="text-muted">Stock: {{ $product->stock }}</small>
                                        <div>
                                            <a href="{{ route('product.edit', $product->uuid) }}" class="btn btn-outline-primary btn-sm">Edit</a>
                                            <form action="{{ route('product.destroy', $product->uuid) }}" method="POST" class="d-inline" onsubmit="return confirm('Are you sure you want to delete this product?');">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="btn btn-outline-danger btn-sm">Delete</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                        <div class="mt-4 d-flex justify-content-center">
                            {{ $products->links('pagination::bootstrap-4') }}
                        </div>
                    @else
                        <p class="text-muted text-center">No products found.</p>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
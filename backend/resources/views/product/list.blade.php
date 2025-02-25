@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h4 class="mb-0">Product List</h4>
                    <a href="{{ route('product.create') }}" class="btn btn-primary">Create Product</a>
                </div>
                <div class="card-body">
                    @if($products->count() > 0)
                        <div class="row">
                            @foreach($products as $product)
                                <div class="col-md-4 mb-4">
                                    <div class="card h-100">
                                        @if($product->image)
                                            <img src="{{ asset('storage/' . $product->image) }}" class="card-img-top" alt="{{ $product->name }}">
                                        @endif
                                        <div class="card-body">
                                            <h5 class="card-title">{{ $product->name }}</h5>
                                            <p class="card-text">{{ Str::limit($product->description, 100) }}</p>
                                            <div class="d-flex items-center justify-content-between">
                                                <p class="card-text"><small class="text-muted">Stock: {{ $product->stock }}</small></p>
                                                <p class="card-text"><small class="text-muted">Price: ₹{{ number_format($product->price, 2) }}</small></p>
                                            </div>
                                        </div>
                                        <div class="card-footer d-flex gap-2">
                                            <a href="{{ route('product.edit', $product->uuid) }}" class="btn btn-primary btn-sm">Edit</a>
                                            <form action="{{ route('product.destroy', $product->uuid) }}" method="POST">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="btn btn-danger btn-sm">Delete</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    @else
                        <div class="alert alert-info" role="alert">
                            No products found.
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
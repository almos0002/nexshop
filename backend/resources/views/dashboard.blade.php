@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">Dashboard</div>
                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <h4 class="fs-3">Welcome {{ Auth::user()->name }}!</h4>
                    <p class="fs-5">Check Your Today's Stats</p>
                    
                    <div class="row mt-4">
                        <div class="col-md-3">
                            <div class="card h-100">
                                <div class="card-body d-flex flex-column justify-content-between">
                                    <h5 class="card-title fs-4">Total Products</h5>
                                    <p class="card-text display-4 fs-1">{{ $TotalProducts }}</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="card h-100">
                                <div class="card-body d-flex flex-column justify-content-between">
                                    <h5 class="card-title fs-4">Total Users</h5>
                                    <p class="card-text display-4 fs-1">{{ $TotalUsers }}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-3">
                            <div class="card h-100">
                                <div class="card-body d-flex flex-column justify-content-between">
                                    <h5 class="card-title fs-4">Total Orders</h5>
                                    <p class="card-text display-4 fs-1">{{ $TotalOrders }}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-3">
                            <div class="card h-100">
                                <div class="card-body d-flex flex-column justify-content-between">
                                    <h5 class="card-title fs-4">Total Revenue</h5>
                                    <p class="card-text display-4 fs-1">₹{{ $TotalRevenue }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

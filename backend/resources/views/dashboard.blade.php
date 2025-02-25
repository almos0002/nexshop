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

                    <h4>Welcome {{ Auth::user()->name }}!</h4>
                    <p>Check Your Today's Stats</p>
                    
                    <!-- Add your dashboard content here -->
                    <div class="row mt-4">
                        <div class="col-md-4">
                            <div class="card" style="height: 200px;">
                                <div class="card-body d-flex flex-column justify-content-between">
                                    <h5 class="card-title">Total Products</h5>
                                    <p class="card-text display-4">0</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-4">
                            <div class="card" style="height: 200px;">
                                <div class="card-body d-flex flex-column justify-content-between">
                                    <h5 class="card-title">Total Orders</h5>
                                    <p class="card-text display-4">0</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-4">
                            <div class="card" style="height: 200px;">
                                <div class="card-body d-flex flex-column justify-content-between">
                                    <h5 class="card-title">Total Earnings</h5>
                                    <p class="card-text display-4">₹0</p>
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

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Laravel') }}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="font-sans antialiased bg-gray-100">
    <div class="min-h-screen">
        <nav class="bg-white border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex">
                        <div class="shrink-0 flex items-center">
                            <a href="{{ url('/') }}" class="text-xl font-bold text-indigo-600">
                                {{ config('app.name', 'Laravel') }}
                            </a>
                        </div>
                    </div>
                    
                    <div class="hidden sm:flex sm:items-center sm:ml-6">
                        @guest
                            <a href="{{ route('login') }}" class="text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                                Login
                            </a>
                            <a href="{{ route('register') }}" class="text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                                Register
                            </a>
                        @else
                            <a href="{{ route('dashboard') }}" class="px-3 py-2 text-sm font-medium {{ request()->routeIs('dashboard') ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600' }}">
                                Dashboard
                            </a>
                            <a href="{{ route('orders') }}" class="px-3 py-2 text-sm font-medium {{ request()->routeIs('orders*') ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600' }}">
                                Orders
                            </a>
                            <a href="{{ route('product.list') }}" class="px-3 py-2 text-sm font-medium {{ request()->routeIs('product.*') ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600' }}">
                                Products
                            </a>
                            <form method="POST" action="{{ route('logout') }}" class="inline">
                                @csrf
                                <button type="submit" class="text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                                    Logout
                                </button>
                            </form>
                        @endguest
                    </div>
                    
                    <div class="-mr-2 flex items-center sm:hidden">
                        <button type="button" class="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
                            <span class="sr-only">Open main menu</span>
                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Mobile menu -->
            <div class="sm:hidden">
                <div class="px-2 pt-2 pb-3 space-y-1">
                    @guest
                        <a href="{{ route('login') }}" class="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:text-indigo-600">
                            Login
                        </a>
                        <a href="{{ route('register') }}" class="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:text-indigo-600">
                            Register
                        </a>
                    @else
                        <a href="{{ route('dashboard') }}" class="block pl-3 pr-4 py-2 text-base font-medium {{ request()->routeIs('dashboard') ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600' }}">
                            Dashboard
                        </a>
                        <a href="{{ route('orders') }}" class="block pl-3 pr-4 py-2 text-base font-medium {{ request()->routeIs('orders*') ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600' }}">
                            Orders
                        </a>
                        <a href="{{ route('product.list') }}" class="block pl-3 pr-4 py-2 text-base font-medium {{ request()->routeIs('product.*') ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600' }}">
                            Products
                        </a>
                        <form method="POST" action="{{ route('logout') }}">
                            @csrf
                            <button type="submit" class="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:text-indigo-600">
                                Logout
                            </button>
                        </form>
                    @endguest
                </div>
            </div>
        </nav>

        <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            @yield('content')
        </main>
    </div>
</body>
</html>

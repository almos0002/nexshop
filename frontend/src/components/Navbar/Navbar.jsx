import { useState } from 'react';

const Navbar = ({ cartCount, onCheckoutClick, onOrderHistoryClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(1250.75); // Mock wallet balance

  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold">NexShop</span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="hover:text-indigo-200 transition">Home</a>
            <a href="#" className="hover:text-indigo-200 transition">Products</a>
            <a href="#" className="hover:text-indigo-200 transition">Categories</a>
            <a href="#" className="hover:text-indigo-200 transition">About</a>
            <a href="#" className="hover:text-indigo-200 transition">Contact</a>
          </div>

          {/* Wallet and cart icons */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Wallet */}
            <div className="relative group">
              <button className="flex items-center hover:text-indigo-200 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span>${walletBalance.toFixed(2)}</span>
              </button>
              <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg py-2 z-10 text-gray-700 hidden group-hover:block">
                <div className="px-4 py-2 border-b">
                  <p className="font-semibold">Wallet Balance</p>
                  <p className="text-indigo-600 font-bold">${walletBalance.toFixed(2)}</p>
                </div>
                <a href="#" className="block px-4 py-2 hover:bg-indigo-50">Add Funds</a>
                <a href="#" className="block px-4 py-2 hover:bg-indigo-50">Transaction History</a>
              </div>
            </div>

            {/* Cart */}
            <button onClick={onCheckoutClick} className="flex items-center hover:text-indigo-200 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs rounded-full">
                {cartCount}
              </span>
            </button>

            {/* Order History */}
            <button onClick={onOrderHistoryClick} className="flex items-center hover:text-indigo-200 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-indigo-200 focus:outline-none"
            >
              <svg 
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg 
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-500">Home</a>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-500">Products</a>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-500">Categories</a>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-500">About</a>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-500">Contact</a>
        </div>

        <div className="pt-4 pb-3 border-t border-indigo-500">
          <div className="flex items-center justify-between px-5">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>${walletBalance.toFixed(2)}</span>
            </div>
            <div className="flex space-x-4">
              <button onClick={onCheckoutClick} className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs rounded-full">
                  {cartCount}
                </span>
              </button>
              <button onClick={onOrderHistoryClick}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </button>
            </div>
          </div>
          <div className="mt-3 px-2 space-y-1">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-500">Add Funds</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-500">Transaction History</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = ({ cartCount = 0, onCheckoutClick, onOrderHistoryClick, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);
  
  // Ensure wallet balance is properly parsed from user object
  const walletBalance = user && user.wallet ? parseFloat(user.wallet) : 0;
  
  // Log wallet balance for debugging
  useEffect(() => {
    if (user) {
      console.log('Navbar received user with wallet:', user.wallet);
    }
  }, [user]);

  // Close profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef]);

  const activeClassName = "text-indigo-200";
  const inactiveClassName = "hover:text-indigo-200 transition";

  return (
    <nav className="bg-indigo-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold">NexShop</Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={({ isActive }) => isActive ? activeClassName : inactiveClassName}>Home</NavLink>
            <NavLink to="/products" className={({ isActive }) => isActive ? activeClassName : inactiveClassName}>Products</NavLink>
            <NavLink to="/categories" className={({ isActive }) => isActive ? activeClassName : inactiveClassName}>Categories</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? activeClassName : inactiveClassName}>About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? activeClassName : inactiveClassName}>Contact</NavLink>
          </div>

          {/* Wallet, auth and cart icons */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Wallet - Only show if user is logged in */}
            {user && (
              <div className="relative group">
                <button className="flex items-center hover:text-indigo-200 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span>NPR {walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </button>
                <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg py-2 z-10 text-gray-700 hidden group-hover:block">
                  <div className="px-4 py-2 border-b">
                    <p className="font-semibold">Wallet Balance</p>
                    <p className="text-indigo-600 font-bold">NPR {walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  </div>
                  <Link to="/wallet/add" className="block px-4 py-2 hover:bg-indigo-50">Add Funds</Link>
                  <Link to="/wallet/history" className="block px-4 py-2 hover:bg-indigo-50">Transaction History</Link>
                </div>
              </div>
            )}

            {/* Cart */}
            <button 
              className="flex items-center hover:text-indigo-200 transition"
              onClick={onCheckoutClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Authentication - User Profile or Login/Register */}
            {user ? (
              <div className="relative" ref={profileMenuRef}>
                <button 
                  className="flex items-center hover:text-indigo-200 transition"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  <div className="h-8 w-8 rounded-full bg-indigo-300 flex items-center justify-center text-indigo-800 font-medium mr-2">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:block">{user.name}</span>
                </button>
                
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <div className="px-4 py-2 text-xs text-gray-500 border-b">
                      <div>Signed in as</div>
                      <div className="font-semibold text-indigo-700">{user.email}</div>
                    </div>
                    
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Your Profile
                    </Link>
                    
                    <Link 
                      to="/orders" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                      onClick={() => {
                        setShowProfileMenu(false);
                        onOrderHistoryClick();
                      }}
                    >
                      Your Orders
                    </Link>
                    
                    <div className="border-t my-1"></div>
                    
                    <button 
                      onClick={() => {
                        setShowProfileMenu(false);
                        onLogout();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-indigo-50"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-sm hover:text-indigo-200 transition"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="text-sm bg-white text-indigo-600 px-3 py-1 rounded-md hover:bg-indigo-100"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Order History - Only show if user is logged in */}
            {user && (
              <button onClick={onOrderHistoryClick} className="flex items-center hover:text-indigo-200 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </button>
            )}
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
          <NavLink to="/" 
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-indigo-500' : 'hover:bg-indigo-500'}`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink to="/products" 
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-indigo-500' : 'hover:bg-indigo-500'}`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Products
          </NavLink>
          <NavLink to="/categories" 
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-indigo-500' : 'hover:bg-indigo-500'}`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Categories
          </NavLink>
          <NavLink to="/about" 
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-indigo-500' : 'hover:bg-indigo-500'}`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink to="/contact" 
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-indigo-500' : 'hover:bg-indigo-500'}`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </NavLink>
          
          {/* Mobile authentication links */}
          {!user && (
            <>
              <div className="border-t border-indigo-500 my-2"></div>
              <NavLink to="/login" 
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-indigo-500' : 'hover:bg-indigo-500'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </NavLink>
              <NavLink to="/register" 
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-indigo-500' : 'hover:bg-indigo-500'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile user options */}
        {user && (
          <div className="pt-4 pb-3 border-t border-indigo-500">
            <div className="flex items-center justify-between px-5">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-indigo-300 flex items-center justify-center text-indigo-800 font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium">{user.name}</div>
                  <div className="text-sm text-indigo-200">{user.email}</div>
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <div className="flex items-center px-3 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span>NPR {walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <NavLink to="/profile" 
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-indigo-500' : 'hover:bg-indigo-500'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Your Profile
              </NavLink>
              <NavLink to="/orders" 
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-indigo-500' : 'hover:bg-indigo-500'}`
                }
                onClick={() => {
                  setIsMenuOpen(false);
                  onOrderHistoryClick();
                }}
              >
                Your Orders
              </NavLink>
              <NavLink to="/wallet/add" 
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-indigo-500' : 'hover:bg-indigo-500'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Add Funds
              </NavLink>
              <NavLink to="/wallet/history" 
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-indigo-500' : 'hover:bg-indigo-500'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Transaction History
              </NavLink>
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  onLogout();
                }}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-300 hover:bg-indigo-500 hover:text-white"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

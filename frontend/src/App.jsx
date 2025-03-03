import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ProductList from './components/Products/ProductList';
import ProductDetail from './components/Products/ProductDetail';
import Checkout from './components/Checkout/Checkout';
import OrderHistory from './components/OrderHistory/OrderHistory';
import Footer from './components/Footer/Footer';
import About from './components/Pages/About';
import Contact from './components/Pages/Contact';
import Categories from './components/Pages/Categories';
import AddFunds from './components/Wallet/AddFunds';
import TransactionHistory from './components/Wallet/TransactionHistory';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Profile/Profile';
import { getUser, logout, isAuthenticated, fetchCurrentUser } from './services/api';

// Helper functions for cart persistence
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem('nexshop_cart', JSON.stringify(cart));
};

const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem('nexshop_cart');
  return cart ? JSON.parse(cart) : [];
};

function App() {
  const [cartItems, setCartItems] = useState(() => getCartFromLocalStorage());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    saveCartToLocalStorage(cartItems);
  }, [cartItems]);

  // Function to refresh user data, can be passed to child components
  const refreshUserData = useCallback(async () => {
    try {
      if (isAuthenticated()) {
        const freshUserData = await fetchCurrentUser();
        console.log('App: Refreshed user data with wallet balance:', freshUserData.wallet);
        setUser(freshUserData);
        return freshUserData;
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
    return null;
  }, []);

  // Check if user is already logged in and fetch latest data
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        // First check if we have locally stored user data
        const localUser = getUser();
        
        if (localUser) {
          // Set user from localStorage immediately for a quick initial render
          setUser(localUser);
          
          // If authenticated, fetch the latest user data from the server
          await refreshUserData();
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUserData();
  }, [refreshUserData]);

  const handleLoginSuccess = async (userData) => {
    console.log('Login success in App with wallet:', userData.wallet);
    setUser(userData);
    
    // Refresh user data after login to get the most up-to-date wallet balance
    await refreshUserData();
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate('/');
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      // Check if the product is already in the cart
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // If it is, set the new quantity (not increment)
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: quantity } 
            : item
        );
      } else {
        // If not, add it with specified quantity
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const updateCartItemQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar 
        cartCount={cartItems.reduce((total, item) => total + (item.quantity || 1), 0)} 
        user={user}
        onLogout={handleLogout}
        onCheckoutClick={() => navigate('/checkout')}
        onOrderHistoryClick={() => navigate('/orders')}
        refreshUserData={refreshUserData}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<ProductList addToCart={addToCart} cartItems={cartItems} />} />
            <Route path="/products" element={<ProductList addToCart={addToCart} cartItems={cartItems} />} />
            <Route path="/products/:uuid" element={<ProductDetail addToCart={addToCart} updateCartItemQuantity={updateCartItemQuantity} cartItems={cartItems} />} />
            <Route path="/checkout" element={
              <Checkout 
                cartItems={cartItems} 
                setCartItems={setCartItems} 
                updateCartItemQuantity={updateCartItemQuantity}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                user={user} 
                refreshUserData={refreshUserData} 
              />
            } />
            <Route path="/orders" element={<OrderHistory user={user} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/wallet/add" element={<AddFunds user={user} refreshUserData={refreshUserData} />} />
            <Route path="/wallet/history" element={<TransactionHistory user={user} />} />
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/register" element={<Register onRegisterSuccess={handleLoginSuccess} />} />
            <Route path="/profile" element={<Profile user={user} refreshUserData={refreshUserData} />} />
          </Routes>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;

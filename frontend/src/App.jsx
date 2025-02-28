import { useState, useEffect } from 'react';
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
import { getUser, logout } from './services/api';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const loggedInUser = getUser();
    if (loggedInUser) {
      setUser(loggedInUser);
      console.log('App loaded user with wallet balance:', loggedInUser.wallet);
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    console.log('Login success in App with wallet:', userData.wallet);
    setUser(userData);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate('/');
  };

  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Check if the product is already in the cart
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // If it is, increase the quantity
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: (item.quantity || 1) + 1 } 
            : item
        );
      } else {
        // If not, add it with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar 
        cartCount={cartItems.length} 
        user={user}
        onLogout={handleLogout}
        onCheckoutClick={() => navigate('/checkout')}
        onOrderHistoryClick={() => navigate('/orders')}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<ProductList addToCart={addToCart} />} />
          <Route path="/products" element={<ProductList addToCart={addToCart} />} />
          <Route path="/products/:uuid" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="/checkout" element={<Checkout cartItems={cartItems} setCartItems={setCartItems} user={user} />} />
          <Route path="/orders" element={<OrderHistory user={user} />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wallet/add" element={<AddFunds user={user} />} />
          <Route path="/wallet/history" element={<TransactionHistory user={user} />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={<Register onRegisterSuccess={setUser} />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;

import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import ProductList from './components/Products/ProductList';
import Checkout from './components/Checkout/Checkout';
import OrderHistory from './components/OrderHistory/OrderHistory';
import Footer from './components/Footer/Footer';

function App() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const toggleCheckout = () => {
    setShowCheckout(!showCheckout);
    setShowOrderHistory(false);
  };

  const toggleOrderHistory = () => {
    setShowOrderHistory(!showOrderHistory);
    setShowCheckout(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar 
        cartCount={cartItems.length} 
        onCheckoutClick={toggleCheckout}
        onOrderHistoryClick={toggleOrderHistory}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {showCheckout ? (
          <Checkout cartItems={cartItems} setCartItems={setCartItems} />
        ) : showOrderHistory ? (
          <OrderHistory />
        ) : (
          <ProductList addToCart={addToCart} />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;

import { useState, useEffect } from 'react';
import { placeOrder, fetchCurrentUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cartItems, setCartItems, user, refreshUserData }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderError, setOrderError] = useState(null);
  const [walletBalance, setWalletBalance] = useState(user?.wallet || 0);
  const navigate = useNavigate();
  
  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email
      }));
      setWalletBalance(user.wallet || 0);
    }
  }, [user]);
  
  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    const quantity = item.quantity || 1;
    return sum + (item.price * quantity);
  }, 0);
  const tax = subtotal * 0.13; // 13% VAT in Nepal
  const shipping = subtotal > 0 ? 100 : 0; // Fixed shipping rate in NPR
  const total = subtotal + tax + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setOrderError('Please log in to place an order');
      navigate('/login');
      return;
    }
    
    if (cartItems.length === 0) {
      setOrderError('Your cart is empty');
      return;
    }
    
    setIsSubmitting(true);
    setOrderError(null);

    try {
      // Format order data according to backend API requirements
      const orderData = {
        user_id: user.id,
        products: cartItems.map(item => ({
          uuid: item.uuid,
          quantity: item.quantity || 1
        }))
      };

      // Call API service
      await placeOrder(orderData);
      
      // Refresh user data to get updated wallet balance
      if (refreshUserData) {
        await refreshUserData();
      }
      
      setOrderPlaced(true);
      setCartItems([]);
    } catch (error) {
      console.error('Failed to place order:', error);
      // Display the specific error message
      setOrderError(error.message || 'Failed to place your order. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h2>
        <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been placed successfully.</p>
        <button
          onClick={() => {
            setOrderPlaced(false);
            navigate('/');
          }}
          className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>
      
      {orderError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6" role="alert">
          <p>{orderError}</p>
        </div>
      )}
      
      {cartItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <button
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
              
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-4 flex items-center">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="ml-4 flex-grow">
                      <h3 className="text-md font-medium text-gray-800">{item.name}</h3>
                      <p className="text-gray-600 text-sm">NPR {item.price.toLocaleString()}</p>
                      {item.stock <= 5 && <p className="text-orange-500 text-xs">Only {item.stock} left in stock</p>}
                    </div>
                    <div className="flex items-center">
                      <button 
                        onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="mx-2 w-6 text-center">{item.quantity || 1}</span>
                      <button 
                        onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        disabled={item.quantity >= item.stock}
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800 font-medium">NPR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">VAT (13%)</span>
                  <span className="text-gray-800 font-medium">NPR {tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-800 font-medium">NPR {shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-800 text-lg">Total</span>
                  <span className="text-indigo-600 text-lg">NPR {total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Checkout Form */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Shipping & Payment</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Contact Information</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Shipping Address</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="address" className="block text-gray-700 text-sm font-medium mb-1">Street Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-gray-700 text-sm font-medium mb-1">City</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="zipCode" className="block text-gray-700 text-sm font-medium mb-1">ZIP Code</label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Payment Method</h3>
                  <div className="flex space-x-4 mb-4">
                    <div 
                      className={`flex-1 border rounded-md p-3 cursor-pointer ${paymentMethod === 'card' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="card" 
                          name="paymentMethod" 
                          checked={paymentMethod === 'card'} 
                          onChange={() => setPaymentMethod('card')}
                          className="mr-2"
                        />
                        <label htmlFor="card" className="flex items-center cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                          <span>Credit Card</span>
                        </label>
                      </div>
                    </div>
                    <div 
                      className={`flex-1 border rounded-md p-3 cursor-pointer ${paymentMethod === 'wallet' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
                      onClick={() => setPaymentMethod('wallet')}
                    >
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="wallet" 
                          name="paymentMethod" 
                          checked={paymentMethod === 'wallet'} 
                          onChange={() => setPaymentMethod('wallet')}
                          className="mr-2"
                        />
                        <label htmlFor="wallet" className="flex items-center cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                          </svg>
                          <span>Wallet (NPR {walletBalance.toLocaleString()})</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {paymentMethod === 'card' && (
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label htmlFor="cardNumber" className="block text-gray-700 text-sm font-medium mb-1">Card Number</label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required={paymentMethod === 'card'}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiryDate" className="block text-gray-700 text-sm font-medium mb-1">Expiry Date</label>
                          <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required={paymentMethod === 'card'}
                          />
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block text-gray-700 text-sm font-medium mb-1">CVV</label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required={paymentMethod === 'card'}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <button
                  type="submit"
                  className={`w-full bg-indigo-600 text-white p-3 rounded-md font-medium hover:bg-indigo-700 transition ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : `Pay NPR ${total.toLocaleString()}`}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;

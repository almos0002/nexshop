import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchProductByUUID } from '../../services/api';

const ProductDetail = ({ addToCart, updateCartItemQuantity, cartItems }) => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        setLoading(true);
        const productData = await fetchProductByUUID(uuid);
        
        // Ensure image URL is complete
        const processedProduct = {
          ...productData,
          image: productData.image ? 
            (productData.image.startsWith('http') ? 
              productData.image : 
              `http://127.0.0.1:8000/storage/${productData.image}`) : 
            'https://via.placeholder.com/400x400?text=No+Image'
        };
        
        setProduct(processedProduct);
        setLoading(false);
      } catch (err) {
        setError('Failed to load product details. Please try again later.');
        setLoading(false);
      }
    };

    getProductDetails();
  }, [uuid]);

  // Check if this product is already in the cart and update the quantity input
  useEffect(() => {
    if (product && cartItems) {
      const existingItem = cartItems.find(item => item.id === product.id);
      if (existingItem) {
        setQuantity(existingItem.quantity);
      }
    }
  }, [product, cartItems]);

  const handleAddToCart = () => {
    if (product && product.stock > 0) {
      // Add product to cart with specified quantity
      addToCart(product, quantity);
      setAddedToCart(true);
      
      // Reset the "Added to cart" message after 3 seconds
      setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && product && value <= product.stock) {
      setQuantity(value);
      
      // If product is already in cart, update its quantity automatically
      if (cartItems && cartItems.some(item => item.id === product.id)) {
        updateCartItemQuantity(product.id, value);
      }
    }
  };

  const handleBuyNow = () => {
    if (product && product.stock > 0) {
      // Add product to cart with specified quantity
      addToCart(product, quantity);
      // Navigate to checkout
      navigate('/checkout');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/" 
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Link to="/" className="text-indigo-600 hover:text-indigo-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Products
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Product Image */}
          <div className="md:w-1/2 p-4 flex justify-center items-center bg-gray-50">
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-h-96 object-contain"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
              }} 
            />
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Product ID: {product.uuid}
            </div>
            <h1 className="mt-2 text-3xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>
            
            <div className="mt-4 flex items-center">
              <span className="text-2xl font-bold text-gray-900">
                NPR {product.price.toLocaleString()}
              </span>
              {product.stock <= 5 && product.stock > 0 && (
                <span className="ml-4 px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded">
                  Only {product.stock} left
                </span>
              )}
              {product.stock === 0 && (
                <span className="ml-4 px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                  Out of Stock
                </span>
              )}
            </div>
            
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900">Description</h2>
              <p className="mt-2 text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
            
            {product.stock > 0 && (
              <div className="mt-8">
                <div className="flex items-center">
                  <label htmlFor="quantity" className="mr-4 text-gray-700 font-medium">
                    Quantity:
                  </label>
                  <select 
                    id="quantity" 
                    className="form-select rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    value={quantity}
                    onChange={handleQuantityChange}
                  >
                    {[...Array(product.stock).keys()].map(num => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    className={`px-6 py-3 bg-indigo-600 text-white rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-colors ${
                      addedToCart ? 'bg-green-600 hover:bg-green-700' : ''
                    }`}
                  >
                    {addedToCart ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Add to Cart
                      </>
                    )}
                  </button>
                  
                  <button 
                    onClick={handleBuyNow}
                    className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Buy Now
                  </button>
                </div>
              </div>
            )}
            
            {product.stock === 0 && (
              <div className="mt-8">
                <button
                  disabled
                  className="w-full px-6 py-3 bg-gray-300 text-gray-500 rounded-lg flex items-center justify-center cursor-not-allowed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Out of Stock
                </button>
              </div>
            )}
            
            {/* Additional Product Information */}
            <div className="mt-10 pt-6 border-t border-gray-200">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">Free shipping for orders over NPR 10,000</span>
              </div>
              <div className="flex items-center mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">30-day return policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related products section could be added here */}
    </div>
  );
};

export default ProductDetail;

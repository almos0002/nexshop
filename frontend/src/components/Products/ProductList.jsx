import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { fetchProducts } from '../../services/api';
import DocumentTitle from '../utils/DocumentTitle';

const ProductList = ({ addToCart, cartItems }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const productsData = await fetchProducts();
        
        // Process products to ensure image URLs are complete
        const processedProducts = productsData.map(product => ({
          ...product,
          image: product.image ? `${product.image}` : 'https://via.placeholder.com/400x400?text=No+Image'
        }));
        
        setProducts(processedProducts);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-100 border-t-indigo-600"></div>
          <p className="mt-4 text-indigo-600 font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg shadow-sm" role="alert">
        <div className="flex">
          <svg className="h-6 w-6 text-red-600 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="font-medium">Error loading products</h3>
            <p className="text-sm mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <DocumentTitle title="Products">
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Our Products</h1>
          
          {/* Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg 
                className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-8">
          {filteredProducts.map((product, index) => {
            // Check if product is in cart
            const cartItem = cartItems?.find(item => item.id === product.id);
            const quantityInCart = cartItem ? cartItem.quantity : 0;
            
            return (
              <div 
                key={product.id || product.uuid} 
                className="animate-fadeIn" 
                style={{animationDelay: `${index * 50}ms`}}
              >
                <ProductCard 
                  product={product} 
                  addToCart={addToCart} 
                  quantityInCart={quantityInCart}
                />
              </div>
            );
          })}
        </div>
        
        {filteredProducts.length === 0 && !loading && (
          <div className="bg-gray-50 rounded-xl py-16 px-6 text-center mt-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria.</p>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </DocumentTitle>
  );
};

export default ProductList;

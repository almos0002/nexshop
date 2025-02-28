import { useState } from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ addToCart }) => {
  // Mock products data
  const [products] = useState([
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 129.99,
      image: 'https://placehold.co/300x300/e5e7eb/a3a3a3?text=Headphones',
      description: 'Premium wireless headphones with noise cancellation technology.',
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Smartphone',
      price: 899.99,
      image: 'https://placehold.co/300x300/e5e7eb/a3a3a3?text=Smartphone',
      description: 'Latest model with high resolution camera and long battery life.',
      rating: 4.8,
    },
    {
      id: 3,
      name: 'Laptop',
      price: 1299.99,
      image: 'https://placehold.co/300x300/e5e7eb/a3a3a3?text=Laptop',
      description: 'Powerful laptop for work and gaming with SSD storage.',
      rating: 4.7,
    },
    {
      id: 4,
      name: 'Smart Watch',
      price: 249.99,
      image: 'https://placehold.co/300x300/e5e7eb/a3a3a3?text=SmartWatch',
      description: 'Track your fitness and stay connected with this smartwatch.',
      rating: 4.2,
    },
    {
      id: 5,
      name: 'Wireless Earbuds',
      price: 89.99,
      image: 'https://placehold.co/300x300/e5e7eb/a3a3a3?text=Earbuds',
      description: 'Compact wireless earbuds with crystal clear sound quality.',
      rating: 4.4,
    },
    {
      id: 6,
      name: 'Tablet',
      price: 499.99,
      image: 'https://placehold.co/300x300/e5e7eb/a3a3a3?text=Tablet',
      description: 'Lightweight tablet perfect for entertainment and productivity.',
      rating: 4.6,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Audio', 'Computers', 'Wearables', 'Smartphones'];

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'All' || product.category === selectedCategory)
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Our Products</h1>
        
        {/* Search and filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg 
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <div className="flex-shrink-0">
            <select
              className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No products found. Try adjusting your search.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;

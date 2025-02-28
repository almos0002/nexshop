import { Link } from 'react-router-dom';
import { useState } from 'react';

const ProductCard = ({ product, addToCart, quantityInCart = 0 }) => {
  const { uuid, name, price, image, description, stock } = product;
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    // If already in cart, add one more
    const newQuantity = quantityInCart + 1;
    if (newQuantity <= stock) {
      addToCart(product, newQuantity);
      setIsAdding(true);
      
      // Reset button state after a brief delay
      setTimeout(() => {
        setIsAdding(false);
      }, 1000);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link to={`/products/${uuid}`} className="block">
        <div className="relative">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
            }}
          />
          {stock <= 5 && stock > 0 && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Low Stock: {stock}
            </div>
          )}
          {stock === 0 && (
            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Out of Stock
            </div>
          )}
          {quantityInCart > 0 && (
            <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {quantityInCart} in cart
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/products/${uuid}`} className="block">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 hover:text-indigo-600">{name}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        </Link>
        
        <div className="flex justify-between items-center">
          <span className="text-indigo-600 font-bold">NPR {price.toLocaleString()}</span>
          <button 
            onClick={handleAddToCart}
            className={`
              ${stock === 0 ? 'bg-gray-400 cursor-not-allowed' : 
                isAdding ? 'bg-green-600' : 
                quantityInCart > 0 ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'
              } 
              text-white px-3 py-1.5 rounded-md transition flex items-center text-sm
            `}
            disabled={stock === 0 || isAdding}
          >
            {isAdding ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Added
              </>
            ) : quantityInCart > 0 ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add More
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

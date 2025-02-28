import { Link } from 'react-router-dom';
import { useState } from 'react';

const ProductCard = ({ product, addToCart, quantityInCart = 0 }) => {
  const { uuid, name, price, image, description, stock } = product;
  const [isAdding, setIsAdding] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col h-[420px] border border-gray-100">
      <div className="relative pt-[75%] w-full bg-gray-50"> {/* 4:3 aspect ratio */}
        <Link to={`/products/${uuid}`} className="absolute inset-0 overflow-hidden">
          <div className="relative h-full w-full flex items-center justify-center">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
              </div>
            )}
            <img 
              src={image} 
              alt={name} 
              className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                setImageLoaded(true);
              }}
            />
            {stock <= 5 && stock > 0 && (
              <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                Only {stock} left
              </div>
            )}
            {stock === 0 && (
              <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                Out of Stock
              </div>
            )}
            {quantityInCart > 0 && (
              <div className="absolute top-3 left-3 bg-indigo-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {quantityInCart} in cart
              </div>
            )}
          </div>
        </Link>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/products/${uuid}`} className="group block flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate group-hover:text-indigo-600 transition-colors duration-200">
            {name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        </Link>
        
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
          <span className="text-indigo-600 font-bold">NPR {price.toLocaleString()}</span>
          <button 
            onClick={handleAddToCart}
            className={`
              ${stock === 0 ? 'bg-gray-400 cursor-not-allowed' : 
                isAdding ? 'bg-green-600 scale-105' : 
                quantityInCart > 0 ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-105'
              } 
              text-white px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center text-sm whitespace-nowrap shadow-sm
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

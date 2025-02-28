import { Link } from 'react-router-dom';

const ProductCard = ({ product, addToCart }) => {
  const { uuid, name, price, image, description, stock } = product;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link to={`/products/${uuid}`} className="block">
        <div className="relative">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-48 object-cover"
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
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className={`${stock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} text-white px-3 py-1 rounded-md transition flex items-center`}
            disabled={stock === 0}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

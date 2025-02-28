// API service for handling data fetching in the application

// Base API URL
const API_BASE_URL = 'http://127.0.0.1:8000/api';
const STORAGE_URL = 'http://127.0.0.1:8000/storage/';

/**
 * Fetch all products from the API
 * @returns {Promise<Array>} - The transformed product data
 */
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const result = await response.json();
    
    // Transform the data to match our expected format
    return result.data.map(product => ({
      id: product.uuid,
      name: product.name,
      price: product.price,
      description: product.description,
      stock: product.stock,
      image: `${STORAGE_URL}${product.image}`
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Fetch a single product by ID
 * @param {string} id - The product ID
 * @returns {Promise<Object>} - The product data
 */
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const product = await response.json();
    
    return {
      id: product.uuid,
      name: product.name,
      price: product.price,
      description: product.description,
      stock: product.stock,
      image: `${STORAGE_URL}${product.image}`
    };
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

/**
 * Place an order
 * @param {Object} orderData - The order data
 * @returns {Promise<Object>} - The order confirmation
 */
export const placeOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};

/**
 * Fetch order history
 * @returns {Promise<Array>} - The order history data
 */
export const fetchOrderHistory = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching order history:', error);
    throw error;
  }
};

// Export default object with all API functions
export default {
  fetchProducts,
  fetchProductById,
  placeOrder,
  fetchOrderHistory
};

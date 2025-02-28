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
      uuid: product.uuid,
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
 * Fetch a single product by UUID
 * @param {string} uuid - The product UUID
 * @returns {Promise<Object>} - The product data
 */
export const fetchProductByUUID = async (uuid) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${uuid}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data; // Return the product data from the response
  } catch (error) {
    console.error('Error fetching product details:', error);
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
        ...authHeader()
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
    const response = await fetch(`${API_BASE_URL}/orders`, {
      headers: authHeader()
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching order history:', error);
    throw error;
  }
};

/**
 * Login user with credentials
 * @param {Object} credentials - The user credentials (email, password)
 * @returns {Promise<Object>} - The login response with user data and token
 */
export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }
    
    const data = await response.json();
    // Store the token in localStorage
    localStorage.setItem('auth_token', data.access_token);
    
    // Make sure the user object includes wallet
    if (data.user && data.user.wallet) {
      console.log('API service: Storing user with wallet balance:', data.user.wallet);
    }
    
    // Store the user data in localStorage
    localStorage.setItem('user', JSON.stringify(data.user));
    
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

/**
 * Register a new user
 * @param {Object} userData - The user registration data
 * @returns {Promise<Object>} - The registration response with user data and token
 */
export const register = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }
    
    const data = await response.json();
    
    // Store the token in localStorage
    localStorage.setItem('auth_token', data.access_token);
    
    // Make sure the user object includes wallet
    if (data.user && data.user.wallet) {
      console.log('API service: Storing registered user with wallet balance:', data.user.wallet);
    }
    
    localStorage.setItem('user', JSON.stringify(data.user));
    
    return data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

export const logout = () => {
  // Remove auth data from localStorage
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
};

export const getAuthToken = () => {
  return localStorage.getItem('auth_token');
};

/**
 * Retrieve the currently logged-in user from localStorage
 * @returns {Object|null} - The user object or null if not logged in
 */
export const getUser = () => {
  const userString = localStorage.getItem('user');
  if (!userString) {
    return null;
  }
  
  try {
    const user = JSON.parse(userString);
    if (user && user.wallet) {
      console.log('getUser: Retrieved user with wallet balance:', user.wallet);
    }
    return user;
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error);
    return null;
  }
};

/**
 * Check if the user is authenticated
 * @returns {boolean} - True if authenticated, false otherwise
 */
export const isAuthenticated = () => {
  return !!getAuthToken();
};

// Add authentication to API calls that need it
const authHeader = () => {
  const token = getAuthToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Export default object with all API functions
export default {
  fetchProducts,
  fetchProductByUUID,
  fetchProductById,
  placeOrder,
  fetchOrderHistory,
  login,
  register,
  logout,
  getAuthToken,
  getUser,
  isAuthenticated
};

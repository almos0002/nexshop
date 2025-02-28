import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sample category data with images
  const categoryData = [
    {
      id: 1,
      name: 'Electronics',
      description: 'Latest gadgets and electronic devices for your daily needs',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      productCount: 42
    },
    {
      id: 2,
      name: 'Clothing',
      description: 'Trendy fashion items for men, women and children',
      image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      productCount: 56
    },
    {
      id: 3,
      name: 'Home & Kitchen',
      description: 'Everything you need to make your house a home',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1168&q=80',
      productCount: 38
    },
    {
      id: 4,
      name: 'Books',
      description: 'Bestsellers, textbooks, and more for all ages',
      image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      productCount: 27
    },
    {
      id: 5,
      name: 'Beauty & Personal Care',
      description: 'Cosmetics, skincare, and personal hygiene products',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
      productCount: 31
    },
    {
      id: 6,
      name: 'Sports & Outdoors',
      description: 'Equipment and gear for all your favorite activities',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      productCount: 24
    }
  ];

  useEffect(() => {
    // Simulate API fetch
    const fetchCategories = async () => {
      try {
        // In a real app, you would fetch from an API
        // const response = await fetch('http://127.0.0.1:8000/api/categories');
        // const data = await response.json();
        
        // Using sample data for now
        setTimeout(() => {
          setCategories(categoryData);
          setLoading(false);
        }, 800);
      } catch (error) {
        setError('Failed to fetch categories. Please try again later.');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

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

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Product Categories</h1>
        <p className="text-gray-600 mt-2">Browse our wide selection of products by category</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link 
            to={`/products?category=${category.id}`} 
            key={category.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover transition duration-300 transform hover:scale-105"
              />
            </div>
            <div className="p-5">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-gray-800">{category.name}</h2>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {category.productCount} Products
                </span>
              </div>
              <p className="text-gray-600">{category.description}</p>
              <div className="mt-4">
                <span className="inline-flex items-center text-indigo-600 font-medium">
                  Browse Category
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;

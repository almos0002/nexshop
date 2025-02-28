import { useState, useEffect, Fragment } from 'react';
import { fetchOrderHistory, fetchOrderDetails, isAuthenticated } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication first
    if (!isAuthenticated()) {
      setLoading(false);
      setError('Please log in to view your order history');
      return;
    }

    const getOrderHistory = async () => {
      setLoading(true);
      try {
        const response = await fetchOrderHistory();
        if (response && response.data) {
          setOrders(response.data);
        } else {
          setOrders([]);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching order history:', err);
      } finally {
        setLoading(false);
      }
    };

    getOrderHistory();
  }, []);

  const fetchDetails = async (uuid) => {
    if (expandedOrderId === uuid) {
      // If clicking the same order, collapse it
      setExpandedOrderId(null);
      setOrderDetails(null);
      return;
    }

    setDetailsLoading(true);
    setExpandedOrderId(uuid);
    
    try {
      const details = await fetchOrderDetails(uuid);
      setOrderDetails(details);
    } catch (err) {
      console.error(`Error fetching details for order ${uuid}:`, err);
      setError(`Failed to load order details: ${err.message}`);
    } finally {
      setDetailsLoading(false);
    }
  };

  const getStatusLabel = (totalPrice) => {
    if (parseFloat(totalPrice) === 0) {
      return 'Processing';
    } else if (parseFloat(totalPrice) > 0) {
      return 'Completed';
    }
    return 'Unknown';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-NP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    const isAuthError = error.includes('log in') || error.includes('session') || error.includes('Authentication required');
    
    return (
      <div className="px-4 py-6 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6 max-w-md w-full text-center" role="alert">
          <strong className="font-bold block mb-2">Unable to load orders</strong>
          <span className="block">{error}</span>
        </div>
        
        {isAuthError && (
          <div className="flex space-x-4">
            <button 
              onClick={() => navigate('/login')}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Log In
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition"
            >
              Register
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Order History</h1>
      
      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No orders yet</h2>
          <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => {
                  const status = getStatusLabel(order.total_price);
                  return (
                    <Fragment key={order.uuid}>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.uuid}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(order.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          NPR {parseFloat(order.total_price).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(status)}`}>
                            {status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => fetchDetails(order.uuid)}
                            className="text-indigo-600 hover:text-indigo-900"
                            disabled={detailsLoading && expandedOrderId === order.uuid}
                          >
                            {detailsLoading && expandedOrderId === order.uuid ? (
                              <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Loading...
                              </span>
                            ) : expandedOrderId === order.uuid ? 'Hide Details' : 'View Details'}
                          </button>
                        </td>
                      </tr>
                      
                      {expandedOrderId === order.uuid && orderDetails && (
                        <tr className="bg-gray-50">
                          <td colSpan="5" className="px-6 py-4">
                            <div className="mb-4">
                              <h3 className="text-sm font-semibold text-gray-800 mb-2">Order Items</h3>
                              <div className="grid grid-cols-1 gap-4">
                                {orderDetails.products && orderDetails.products.map((item, index) => (
                                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                                    <div className="flex items-start">
                                      {item.product_image && (
                                        <img 
                                          src={`http://127.0.0.1:8000/storage/${item.product_image}`}
                                          alt={item.product_name || 'Product image'} 
                                          className="w-12 h-12 object-cover rounded-md mr-3"
                                          onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/50?text=NexShop';
                                            e.target.onerror = null;
                                          }}
                                        />
                                      )}
                                      <div>
                                        <p className="text-sm font-medium text-gray-800">
                                          {item.product_name || 'Unknown Product'}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          Product ID: {item.product_uuid}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          NPR {item.price.toLocaleString()} x {item.quantity}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="text-sm text-gray-700">
                                      Total: NPR {(item.price * item.quantity).toLocaleString()}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-sm mt-4">
                              <div className="mb-2 md:mb-0">
                                <strong className="text-gray-700">Order UUID:</strong> {orderDetails.uuid}
                              </div>
                              <div className="mb-2 md:mb-0">
                                <strong className="text-gray-700">Date:</strong> {formatDate(orderDetails.created_at)}
                              </div>
                              <div>
                                <strong className="text-gray-700">Total Amount:</strong> 
                                <span className="ml-1 font-bold text-indigo-600">
                                  NPR {parseFloat(orderDetails.total_price).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;

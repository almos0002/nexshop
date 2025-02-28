import { useState } from 'react';

const OrderHistory = () => {
  // Mock order history data
  const [orders] = useState([
    {
      id: 'ORDER-3847',
      date: '2025-02-22',
      total: 929.99,
      status: 'Delivered',
      items: [
        {
          id: 1,
          name: 'Wireless Headphones',
          price: 129.99,
          quantity: 1,
          image: 'https://placehold.co/300x300/e5e7eb/a3a3a3?text=Headphones',
        },
        {
          id: 2,
          name: 'Smartphone',
          price: 799.99,
          quantity: 1,
          image: 'https://placehold.co/300x300/e5e7eb/a3a3a3?text=Smartphone',
        },
      ],
      address: '123 Main St, City, Country, 12345',
      payment: '**** **** **** 4567',
    },
    {
      id: 'ORDER-2791',
      date: '2025-01-15',
      total: 1389.98,
      status: 'Delivered',
      items: [
        {
          id: 3,
          name: 'Laptop',
          price: 1299.99,
          quantity: 1,
          image: 'https://placehold.co/300x300/e5e7eb/a3a3a3?text=Laptop',
        },
        {
          id: 5,
          name: 'Wireless Earbuds',
          price: 89.99,
          quantity: 1,
          image: 'https://placehold.co/300x300/e5e7eb/a3a3a3?text=Earbuds',
        },
      ],
      address: '123 Main St, City, Country, 12345',
      payment: '**** **** **** 4567',
    },
    {
      id: 'ORDER-1653',
      date: '2024-12-03',
      total: 339.98,
      status: 'Delivered',
      items: [
        {
          id: 4,
          name: 'Smart Watch',
          price: 249.99,
          quantity: 1,
          image: 'https://placehold.co/300x300/e5e7eb/a3a3a3?text=SmartWatch',
        },
        {
          id: 5,
          name: 'Wireless Earbuds',
          price: 89.99,
          quantity: 1,
          image: 'https://placehold.co/300x300/e5e7eb/a3a3a3?text=Earbuds',
        },
      ],
      address: '123 Main St, City, Country, 12345',
      payment: 'Wallet',
    },
  ]);

  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Order History</h1>
      
      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No orders yet</h2>
          <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
          <button
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Order</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <>{/* Using fragment shorthand instead of React.Fragment */}
                    <tr key={`row-${order.id}`} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">{order.id}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">{order.date}</td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">${order.total.toFixed(2)}</td>
                      <td className="py-4 px-6 text-sm">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm">
                        <button 
                          onClick={() => toggleOrderDetails(order.id)}
                          className="text-indigo-600 hover:text-indigo-900 font-medium"
                        >
                          {expandedOrderId === order.id ? 'Hide Details' : 'View Details'}
                        </button>
                      </td>
                    </tr>
                    {expandedOrderId === order.id && (
                      <tr key={`details-${order.id}`}>
                        <td colSpan="5" className="bg-gray-50 p-4">
                          <div className="p-4 border rounded-md">
                            <div className="flex flex-col md:flex-row justify-between mb-4 pb-4 border-b">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Shipping Details</h3>
                                <p className="text-gray-600">{order.address}</p>
                              </div>
                              <div className="mt-4 md:mt-0">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Payment Method</h3>
                                <p className="text-gray-600">{order.payment}</p>
                              </div>
                            </div>
                            
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h3>
                            <div className="space-y-4">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex items-center">
                                  <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-16 h-16 object-cover rounded-md"
                                  />
                                  <div className="ml-4 flex-grow">
                                    <h4 className="text-md font-medium text-gray-800">{item.name}</h4>
                                    <p className="text-gray-600 text-sm">
                                      ${item.price.toFixed(2)} x {item.quantity}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-medium text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            <div className="flex justify-end mt-6 pt-4 border-t">
                              <div className="w-full max-w-xs">
                                <div className="flex justify-between mb-2">
                                  <span className="text-gray-600">Subtotal</span>
                                  <span className="text-gray-800 font-medium">${(order.total - (order.total * 0.08) - 4.99).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                  <span className="text-gray-600">Tax (8%)</span>
                                  <span className="text-gray-800 font-medium">${(order.total * 0.08).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mb-4">
                                  <span className="text-gray-600">Shipping</span>
                                  <span className="text-gray-800 font-medium">$4.99</span>
                                </div>
                                <div className="flex justify-between font-semibold">
                                  <span className="text-gray-800 text-lg">Total</span>
                                  <span className="text-indigo-600 text-lg">${order.total.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;

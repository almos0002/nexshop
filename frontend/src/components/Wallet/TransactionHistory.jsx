import React, { useState, useEffect } from 'react';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  // Sample transaction data
  const sampleTransactions = [
    {
      id: 'tx-1001',
      type: 'add',
      amount: 2000,
      method: 'Khalti',
      date: '2025-02-25T15:30:45',
      status: 'completed'
    },
    {
      id: 'tx-1002',
      type: 'purchase',
      amount: 1250,
      method: 'Wallet',
      date: '2025-02-23T12:15:30',
      status: 'completed',
      orderNumber: 'ORD-2502'
    },
    {
      id: 'tx-1003',
      type: 'add',
      amount: 5000,
      method: 'eSewa',
      date: '2025-02-20T09:45:22',
      status: 'completed'
    },
    {
      id: 'tx-1004',
      type: 'purchase',
      amount: 3500,
      method: 'Wallet',
      date: '2025-02-18T14:20:15',
      status: 'completed',
      orderNumber: 'ORD-2485'
    },
    {
      id: 'tx-1005',
      type: 'refund',
      amount: 1250,
      method: 'Wallet',
      date: '2025-02-15T10:05:55',
      status: 'completed',
      orderNumber: 'ORD-2470'
    },
    {
      id: 'tx-1006',
      type: 'add',
      amount: 1000,
      method: 'Credit Card',
      date: '2025-02-10T18:30:00',
      status: 'completed'
    },
    {
      id: 'tx-1007',
      type: 'purchase',
      amount: 800,
      method: 'Wallet',
      date: '2025-02-05T11:22:18',
      status: 'completed',
      orderNumber: 'ORD-2412'
    },
  ];

  useEffect(() => {
    // Simulate API fetch
    const fetchTransactions = async () => {
      try {
        // In a real app, you would fetch from an API
        // const response = await fetch('http://127.0.0.1:8000/api/wallet/transactions');
        // const data = await response.json();
        
        // Using sample data for now
        setTimeout(() => {
          setTransactions(sampleTransactions);
          setLoading(false);
        }, 800);
      } catch (error) {
        setError('Failed to fetch transaction history. Please try again later.');
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(tx => tx.type === filter);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NP', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTransactionIcon = (type) => {
    switch(type) {
      case 'add':
        return (
          <div className="bg-green-100 p-2 rounded-full">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        );
      case 'purchase':
        return (
          <div className="bg-red-100 p-2 rounded-full">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        );
      case 'refund':
        return (
          <div className="bg-blue-100 p-2 rounded-full">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 p-2 rounded-full">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Transaction History</h1>
      
      {/* Filters */}
      <div className="flex mb-6 overflow-x-auto">
        <button 
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-md mr-2 ${
            filter === 'all' 
              ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-500' 
              : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
          }`}
        >
          All Transactions
        </button>
        <button 
          onClick={() => setFilter('add')}
          className={`px-4 py-2 rounded-md mr-2 ${
            filter === 'add' 
              ? 'bg-green-100 text-green-700 border-2 border-green-500' 
              : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
          }`}
        >
          Deposits
        </button>
        <button 
          onClick={() => setFilter('purchase')}
          className={`px-4 py-2 rounded-md mr-2 ${
            filter === 'purchase' 
              ? 'bg-red-100 text-red-700 border-2 border-red-500' 
              : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
          }`}
        >
          Purchases
        </button>
        <button 
          onClick={() => setFilter('refund')}
          className={`px-4 py-2 rounded-md ${
            filter === 'refund' 
              ? 'bg-blue-100 text-blue-700 border-2 border-blue-500' 
              : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
          }`}
        >
          Refunds
        </button>
      </div>
      
      {/* Transactions List */}
      {filteredTransactions.length === 0 ? (
        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No transactions found.</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {filteredTransactions.map((transaction) => (
              <li key={transaction.id} className="p-4 hover:bg-gray-50 transition">
                <div className="flex items-center">
                  {getTransactionIcon(transaction.type)}
                  
                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-800">
                        {transaction.type === 'add' && 'Wallet Top-up'}
                        {transaction.type === 'purchase' && 'Purchase'}
                        {transaction.type === 'refund' && 'Refund'}
                      </span>
                      <span className={`font-semibold ${
                        transaction.type === 'add' || transaction.type === 'refund' 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {transaction.type === 'add' || transaction.type === 'refund' 
                          ? '+' 
                          : '-'
                        } NPR {transaction.amount.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between mt-1">
                      <div className="text-sm text-gray-500">
                        <span>Via {transaction.method}</span>
                        {transaction.orderNumber && (
                          <span className="ml-2 bg-gray-100 px-2 py-0.5 rounded text-xs">
                            Order #{transaction.orderNumber}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">{formatDate(transaction.date)}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;

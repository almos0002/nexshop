import React, { useState } from 'react';

const AddFunds = () => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('khalti');
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState(null);

  const handleAmountChange = (e) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAmount(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!amount || parseInt(amount) < 100) {
      setMessage({
        type: 'error',
        text: 'Please enter an amount of at least NPR 100.'
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setMessage({
        type: 'success',
        text: `Successfully added NPR ${parseInt(amount).toLocaleString()} to your wallet using ${getPaymentMethodName()}.`
      });
      setAmount('');
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }, 2000);
  };
  
  const getPaymentMethodName = () => {
    switch(paymentMethod) {
      case 'khalti':
        return 'Khalti';
      case 'esewa':
        return 'eSewa';
      case 'connectips':
        return 'ConnectIPS';
      case 'credit':
        return 'Credit/Debit Card';
      default:
        return paymentMethod;
    }
  };

  const quickAmounts = [500, 1000, 2000, 5000];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Funds to Your Wallet</h1>
      
      {message && (
        <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
            Amount (NPR)
          </label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
            placeholder="Enter amount"
          />
          <p className="text-sm text-gray-500 mt-1">Minimum amount: NPR 100</p>
        </div>
        
        {/* Quick amount buttons */}
        <div className="mb-6">
          <p className="text-gray-700 font-medium mb-2">Quick Select:</p>
          <div className="flex flex-wrap gap-2">
            {quickAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setAmount(amt.toString())}
                className={`px-4 py-2 rounded-md ${
                  amount === amt.toString()
                    ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-500'
                    : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                }`}
              >
                NPR {amt.toLocaleString()}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Payment Method
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div 
              onClick={() => setPaymentMethod('khalti')}
              className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                paymentMethod === 'khalti'
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-md mr-3">
                <span className="text-purple-600 font-bold">K</span>
              </div>
              <span className="font-medium">Khalti</span>
              {paymentMethod === 'khalti' && (
                <svg className="w-5 h-5 ml-auto text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            
            <div 
              onClick={() => setPaymentMethod('esewa')}
              className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                paymentMethod === 'esewa'
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-md mr-3">
                <span className="text-green-600 font-bold">E</span>
              </div>
              <span className="font-medium">eSewa</span>
              {paymentMethod === 'esewa' && (
                <svg className="w-5 h-5 ml-auto text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            
            <div 
              onClick={() => setPaymentMethod('connectips')}
              className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                paymentMethod === 'connectips'
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-md mr-3">
                <span className="text-blue-600 font-bold">C</span>
              </div>
              <span className="font-medium">ConnectIPS</span>
              {paymentMethod === 'connectips' && (
                <svg className="w-5 h-5 ml-auto text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            
            <div 
              onClick={() => setPaymentMethod('credit')}
              className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                paymentMethod === 'credit'
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-md mr-3">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <span className="font-medium">Credit Card</span>
              {paymentMethod === 'credit' && (
                <svg className="w-5 h-5 ml-auto text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            `Add NPR ${amount ? parseInt(amount).toLocaleString() : '0'}`
          )}
        </button>
      </form>
    </div>
  );
};

export default AddFunds;

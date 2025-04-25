import React, { useState , useEffect } from 'react';
import axios from 'axios';

// import local images
import BCAImg from '../assets/image/BCA.jpg';
import BNIImg from '../assets/image/BNI.png';
import BRIImg from '../assets/image/BRI.png';
import GopayImg from '..assets/image/Gopay.jpg';

const paymentMethods = [
  { id: 'bca', label: 'BCA', image : BCAImg, last4: '1238' },
  { id: 'bni', label: 'BNI', image: BNIImg, last4: '2219' },
  { id: 'bri', label: 'BRI', image: BRIImg, last4: '9084' },
  { id: 'gopay', label: 'Gopay', image : GopayImg, last4: '8935' },
];

const PaymentPage: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [orderTotal, setOrderTotal] = useState<number>(0);

  useEffect(() => {
    const total = Number(localStorage.getItem('checkout_total') || 0);
    setOrderTotal(total);
  }, []);  

  const handlePayment = async () => {
    try {
      setShowModal(true);

      const userId = localStorage.getItem('user_id');
      if (!userId) {
        console.error('User ID not found in localStorage');
        return;
      }

      // Delete cart
      await axios.delete('http://localhost:3000/api/cart/' + userId);
      // Delete total_order from localStorage
      localStorage.removeItem('checkout_total');

    } catch (error) {
      console.error('Failed to complete payment:', error);
    }
  };

  return (
    <div className="max-w-sm mx-auto px-4 py-6 text-sm">
      <h2 className="text-lg font-bold mb-4">Checkout</h2>

      {/* Order Summary */}
      <div className="bg-gray-50 p-4 rounded-lg mb-4 border space-y-2">
        <div className="flex justify-between">
          <span>Order</span>
          <span>Rp {orderTotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Rp 0</span>
        </div>
        <hr />
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>Rp {orderTotal.toLocaleString()}</span>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Payment</h3>
        <div className="space-y-2">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`flex items-center justify-between px-4 py-3 rounded-lg border cursor-pointer ${
                selectedMethod === method.id
                  ? 'border-pink-500 bg-white'
                  : 'border-gray-300 bg-gray-50'
              }`}
              onClick={() => setSelectedMethod(method.id)}
            >
              <div className="flex items-center space-x-2">
              <img src={method.image} alt={method.label} className="w-8 h-8 rounded" />
                <span>{method.label}</span>
              </div>
              <span>**** {method.last4}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <button
        className="w-full bg-pink-600 text-white py-3 rounded-lg font-medium"
        onClick={handlePayment}
      >
        Continue
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-72 text-center">
            <div className="text-4xl mb-4 text-pink-500">✅</div>
            <p className="text-lg font-semibold mb-2">Payment done successfully.</p>
            <button
              className="mt-4 text-sm text-pink-600 underline"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;

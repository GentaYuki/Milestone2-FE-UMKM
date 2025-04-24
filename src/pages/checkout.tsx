import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface UserAddress {
  address: string;
  phone: string;
}

const CheckoutPage: React.FC = () => {
  const [address, setAddress] = useState<UserAddress | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, cartRes] = await Promise.all([
          axios.get('http://localhost:3000/api/auth/profile'),
          axios.get('http://localhost:3000/api/cart'),
        ]);
        setAddress({
          address: userRes.data.address,
          phone: userRes.data.phone,
        });
        setCartItems(cartRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getTotalAmount = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <button onClick={() => history.back()} className="mb-4 text-gray-600 text-sm">← Back</button>
      <h2 className="text-xl font-bold mb-4">Checkout</h2>

      {/* Address Section */}
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h3 className="text-sm font-semibold mb-1">📍 Delivery Address</h3>
        <p className="text-sm">{address?.address}</p>
        <p className="text-sm">Contact: {address?.phone}</p>
      </div>

      {/* Cart Items */}
      {cartItems.map((item) => (
        <div key={item.id} className="bg-white border rounded-lg p-4 mb-4 shadow-sm">
          <div className="flex items-center mb-2">
            {item.image && (
              <img src={item.image} alt={item.name} className="w-16 h-16 rounded mr-4 object-cover" />
            )}
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <div className="flex items-center space-x-2 mt-1">
                <button className="text-lg px-2">➖</button>
                <span>{item.quantity}</span>
                <button className="text-lg px-2">➕</button>
              </div>
              <p className="mt-1 text-sm text-gray-600">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Summary */}
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h3 className="font-semibold mb-3">Order Payment Details</h3>
        <div className="flex justify-between text-sm mb-1">
          <span>Order Amount</span>
          <span>₹ {getTotalAmount().toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span>Delivery Fee</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-bold text-lg">
          <span>Order Total</span>
          <span>₹ {getTotalAmount().toLocaleString()}</span>
        </div>
      </div>

      {/* Button */}
      <button
        className="w-full bg-pink-600 text-white py-3 rounded-lg text-center text-sm font-medium"
        onClick={() => alert('Proceed to payment')}
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default CheckoutPage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface UserAddress {
  address: string;
  city : string;
  pincode : string;
  username: string;
  phone: string;
  userId: string;
}

const CheckoutPage: React.FC = () => {
  const [address, setAddress] = useState<UserAddress | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem('user_id');
      const token = localStorage.getItem('token');

      if (!userId || !token) {
        alert('User not authenticated');
        navigate('/login');
        return;
      }
      try {
        const userRes = await axios.get(`https://expected-odella-8fe2e9ce.koyeb.app/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const userData = userRes.data;

        setAddress({
          address: userData.address,
          city: userData.city,
          pincode: userData.pincode || '-',
          username: userData.username,
          phone: userData.phone,
          userId,
        });
        
        const cartRes = await axios.get(`http://localhost:3000/api/cart?userId=${userId}`);
        setCartItems(cartRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getTotalAmount = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleProceedToPayment = () => {
    const total = getTotalAmount();
    localStorage.setItem('checkout_total', total.toString());
    localStorage.setItem('checkout_user_id', address?.userId || '');
    navigate('/payment');
  };
  
  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="w-full max-w-sm mx-auto px-2">
       <button onClick={() => navigate(-1)} className="flex items-center text-sm text-gray-500 mb-4 gap-1"> <span className='text-2xl'>&larr;</span>
       </button>
      <h2 className="text-xl font-bold mb-4">Checkout</h2>

      {/* Address Section */}
      <section className='space-y-4 border-b pb-6 text-left'>
      <h3 className="text-sm font-semibold mb-1 flex items-center justify-between">
          <span>📍 Delivery Information </span>
          <button onClick={() => navigate('/profile')} className="text-xs text-pink-600 font-medium">
            Edit
          </button>
        </h3>
        <p className="text-sm">Address : {address?.address}, {address?.city}, {address?.pincode}</p>
        <p className="text-sm mt-1"> Name: {address?.username}, Phone: {address?.phone}</p>
      </section>

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
    
        <h3 className="font-semibold mb-3 text-left">Order Payment Details</h3>
        <div className="flex justify-between text-sm mb-1">
          <span>Order Amount</span>
          <span>Rp {getTotalAmount().toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span>Delivery Fee</span>
          <span className="text-red-600 font-medium">Free</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between text-md">
          <span>Order Total</span>
          <span>Rp {getTotalAmount().toLocaleString()}</span>
        </div>
        <hr className="my-2" />

      {/* Button */}
      <button
        className="w-full bg-pink-600 text-white py-3 rounded-lg text-center text-sm font-medium mt-5"
        onClick={handleProceedToPayment}
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default CheckoutPage;

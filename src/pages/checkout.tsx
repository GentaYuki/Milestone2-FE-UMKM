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
      const token = localStorage.getItem('access_token');

      if (!userId || !token) {
        alert('User not authenticated');
        navigate('/login');
        return;
      }
      try {
        const userRes = await axios.get(`https://expected-odella-8fe2e9ce.koyeb.app/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const userData = userRes?.data?.data;

        setAddress({
          address: userData.address_street,
          city: userData.address_city,
          pincode: userData.pincode || '-',
          username: userData.name,
          phone: userData.phone,
          userId,
        });
        const cartRes = await axios.get(`https://expected-odella-8fe2e9ce.koyeb.app/cart/${userId}`);

        const mappedCartItems = cartRes.data.data.map((item: any) => ({
          id: item.cart_id.toString(),
          name: item.product.name,
          price: parseFloat(item.product.price),
          image: item.product.product_images[0]?.image_url || '',
          quantity: item.quantity,
        }));

        setCartItems(mappedCartItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const getTotalAmount = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleProceedToPayment = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      navigate('/home');
      return;
    }
    const total = getTotalAmount();
    localStorage.setItem('checkout_total', total.toString());
    navigate('/payment');
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };
  
  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="w-full max-w-sm mx-auto px-2">
       <button onClick={() => navigate(-1)} className="flex items-center text-sm text-gray-500 mb-4 gap-1"> <span className='text-2xl'>&larr;</span>
       </button>
      <h2 className="text-xl font-bold mb-4 text-center">Checkout</h2>

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
              <img src={item.image} alt={item.name} loading="lazy" className="w-16 h-16 rounded mr-4 object-cover" />
            )}
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <div className="flex items-center space-x-2 mt-1">
                <button className="text-lg px-2" onClick={() => updateQuantity(item.id, -1)}>➖</button>
                <span>{item.quantity}</span>
                <button className="text-lg px-2" onClick={() => updateQuantity(item.id, 1)}>➕</button>
              </div>
              <p className="mt-1 text-sm text-gray-600">Rp{(item.price * item.quantity).toLocaleString()}</p>
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


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// interface ProductImage {
//   image_url: string;
// }

// interface Product {
//   product_id: number;
//   name: string;
//   price: string;
//   product_images: ProductImage[];
// }

// interface CartItem {
//   cart_id: number;
//   product_id: number;
//   quantity: number;
//   product: Product;
// }

// interface UserAddress {
//   address: string;
//   city: string;
//   pincode: string;
//   username: string;
//   phone: string;
//   userId: string;
// }

// const CheckoutPage: React.FC = () => {
//   const [address, setAddress] = useState<UserAddress | null>(null);
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       const userId = localStorage.getItem('user_id');
//       const token = localStorage.getItem('access_token');

//       if (!userId || !token) {
//         alert('User not authenticated');
//         navigate('/login');
//         return;
//       }
      
//       try {
//         // Fetch user data
//         const userRes = await axios.get(`https://expected-odella-8fe2e9ce.koyeb.app/user/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         const userData = userRes?.data?.data;

//         setAddress({
//           address: userData.address_street,
//           city: userData.address_city,
//           pincode: userData.pincode || '-',
//           username: userData.name,
//           phone: userData.phone,
//           userId,
//         });
        
//         // Fetch cart data
//         const cartRes = await axios.get(`https://expected-odella-8fe2e9ce.koyeb.app/cart/${userId}`);
//         setCartItems(cartRes.data.data); // Ambil dari property data
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const getTotalAmount = () =>
//     cartItems.reduce(
//       (total, item) => total + (parseFloat(item.product.price) * item.quantity),
//       0
//     );

//   const handleProceedToPayment = () => {
//     const total = getTotalAmount();
//     localStorage.setItem('checkout_total', total.toString());
//     localStorage.setItem('checkout_user_id', address?.userId || '');
//     navigate('/payment');
//   };
  
//   if (loading) return <p className="text-center mt-10">Loading...</p>;

//   if (!cartItems || cartItems.length === 0) {
//     return (
//       <div className="w-full max-w-sm mx-auto px-2">
//         <button onClick={() => navigate(-1)} className="flex items-center text-sm text-gray-500 mb-4 gap-1">
//           <span className='text-2xl'>&larr;</span>
//         </button>
//         <h2 className="text-xl font-bold mb-4">Checkout</h2>
//         <p className="text-center py-10">Keranjang belanja kosong</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full max-w-sm mx-auto px-2">
//       <button onClick={() => navigate(-1)} className="flex items-center text-sm text-gray-500 mb-4 gap-1">
//         <span className='text-2xl'>&larr;</span>
//       </button>
//       <h2 className="text-xl font-bold mb-4">Checkout</h2>

//       {/* Address Section */}
//       <section className='space-y-4 border-b pb-6 text-left'>
//         <h3 className="text-sm font-semibold mb-1 flex items-center justify-between">
//           <span>📍 Delivery Information </span>
//           <button onClick={() => navigate('/profile')} className="text-xs text-pink-600 font-medium">
//             Edit
//           </button>
//         </h3>
//         <p className="text-sm">Address : {address?.address}, {address?.city}, {address?.pincode}</p>
//         <p className="text-sm mt-1"> Name: {address?.username}, Phone: {address?.phone}</p>
//       </section>

//       {/* Cart Items */}
//       {cartItems.map((item) => (
//         <div key={item.cart_id} className="bg-white border rounded-lg p-4 mb-4 shadow-sm">
//           <div className="flex items-center mb-2">
//             {item.product.product_images[0]?.image_url && (
//               <img 
//                 src={item.product.product_images[0].image_url} 
//                 alt={item.product.name} 
//                 className="w-16 h-16 rounded mr-4 object-cover" 
//               />
//             )}
//             <div className="flex-1">
//               <p className="font-medium">{item.product.name}</p>
//               <div className="flex items-center space-x-2 mt-1">
//                 <span>Jumlah: {item.quantity}</span>
//               </div>
//               <p className="mt-1 text-sm text-gray-600">
//                 Rp {(parseFloat(item.product.price) * item.quantity).toLocaleString('id-ID')}
//               </p>
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* Summary */}
//       <div className="mt-4">
//         <h3 className="font-semibold mb-3 text-left">Order Payment Details</h3>
//         <div className="flex justify-between text-sm mb-1">
//           <span>Order Amount</span>
//           <span>Rp {getTotalAmount().toLocaleString('id-ID')}</span>
//         </div>
//         <div className="flex justify-between text-sm mb-1">
//           <span>Delivery Fee</span>
//           <span className="text-red-600 font-medium">Free</span>
//         </div>
//         <hr className="my-2" />
//         <div className="flex justify-between text-md font-semibold">
//           <span>Order Total</span>
//           <span>Rp {getTotalAmount().toLocaleString('id-ID')}</span>
//         </div>
//         <hr className="my-2" />
//       </div>

//       {/* Button */}
//       <button
//         className="w-full bg-pink-600 text-white py-3 rounded-lg text-center text-sm font-medium mt-5 hover:bg-pink-700 transition-colors"
//         onClick={handleProceedToPayment}
//       >
//         Proceed to Payment
//       </button>
//     </div>
//   );
// };

// export default CheckoutPage;
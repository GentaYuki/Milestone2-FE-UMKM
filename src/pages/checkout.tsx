import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BackButton, SubmitButton } from '../components/button';
import { Card, CardBody, CardHeader, Heading, Text, Button, Flex, Box, Image, Divider} from '@chakra-ui/react';

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface UserAddress {
  address: string;
  city: string;
  pincode: string;
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

  if (loading) return <Text textAlign="center" mt={10}>Loading...</Text>;

  return (
    <Box maxW="sm" mx="auto" px={4}>
      <BackButton top={5} left={5}/>

      <Heading size="md" textAlign="center" mb={4}>Checkout</Heading>

      {/* Address Section */}
      <Card mb={6}>
        <CardHeader display="flex" justifyContent="space-between" fontSize="sm" fontWeight="bold">
          📍 Delivery Information
          <Button size="xs" variant="link" colorScheme="pink" onClick={() => navigate('/profile')}>
            Edit
          </Button>
        </CardHeader>
        <CardBody fontSize="sm" pt={0} textAlign={'left'}>
          <Text>Name: {address?.username}</Text>
          <Text>Phone: {address?.phone}</Text>
          <Text mb={1}>Address: {address?.address}, {address?.city}, {address?.pincode}</Text>
        </CardBody>
      </Card>

      {/* Cart Items */}
      {cartItems.map((item) => (
        <Card key={item.id} mb={4} shadow="md">
          <CardBody display="flex" gap={4}>
            {item.image && (
              <Image src={item.image} boxSize="64px" borderRadius="md" objectFit="cover" />
            )}
            <Box flex="1">
              <Text fontWeight="medium">{item.name}</Text>
              <Flex gap={2} mt={1}>
                <Button size="xs" onClick={() => updateQuantity(item.id, -1)}>➖</Button>
                <Text>{item.quantity}</Text>
                <Button size="xs" onClick={() => updateQuantity(item.id, 1)}>➕</Button>
              </Flex>
              <Divider my={2} />
              <Text textAlign={'left'} fontSize="sm" mt={1} color="gray.600">
                Total : Rp{(item.price * item.quantity).toLocaleString()}
              </Text>
            </Box>
          </CardBody>
        </Card>
      ))}

      {/* Summary */}
      <Card mt={6}>
        <CardHeader fontSize="sm" fontWeight="bold">
          Order Payment Details
        </CardHeader>
        <CardBody fontSize="sm" pt={0}>
          <Flex justify="space-between" mb={1}>
            <Text>Order Amount</Text>
            <Text>Rp {getTotalAmount().toLocaleString()}</Text>
          </Flex>
          <Flex justify="space-between" mb={1}>
            <Text>Delivery Fee</Text>
            <Text color="red.500" fontWeight="medium">Free</Text>
          </Flex>
          <Divider my={2} />
          <Flex justify="space-between" fontSize="md" fontWeight="semibold">
            <Text>Order Total</Text>
            <Text>Rp {getTotalAmount().toLocaleString()}</Text>
          </Flex>
        </CardBody>
      </Card>

      {/* Proceed Button */}
      <SubmitButton onClick={handleProceedToPayment}> Proceed to Payment </SubmitButton>
    </Box>
  );
};

export default CheckoutPage;

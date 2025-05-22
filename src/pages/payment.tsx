import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Image,
  SimpleGrid,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SubmitButton, BackButton } from '../components/button';

// Images
import BCAImg from '../assets/image/BCA.jpg';
import BNIImg from '../assets/image/BNI.png';
import BRIImg from '../assets/image/BRI.png';
import GopayImg from '../assets/image/Gopay.jpg';

const paymentMethods = [
  { id: 'bca', label: 'BCA', image: BCAImg, last4: '1238' },
  { id: 'bni', label: 'BNI', image: BNIImg, last4: '2219' },
  { id: 'bri', label: 'BRI', image: BRIImg, last4: '9084' },
  { id: 'gopay', label: 'Gopay', image: GopayImg, last4: '8935' },
];

const PaymentPage: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [orderTotal, setOrderTotal] = useState<number>(0);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const total = Number(localStorage.getItem('checkout_total') || 0);
    setOrderTotal(total);
  }, []);

  const handlePayment = async () => {
    try {
      onOpen();

      const userId = localStorage.getItem('user_id');
      if (!userId) {
        console.error('User ID not found in localStorage');
        return;
      }

      await axios.delete(`https://expected-odella-8fe2e9ce.koyeb.app/cart/clear/${userId}`);
      localStorage.removeItem('checkout_total');
    } catch (error) {
      console.error('Failed to complete payment:', error);
    }
  };

  return (
    <Box maxW="md" mx="auto" p={4}>
      <BackButton top={5} left={5}/>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Payment
      </Text>

      {/* Order Summary */}
      <Card mb={6}>
        <CardHeader fontWeight="semibold">Order Summary</CardHeader>
        <CardBody>
          <Flex justify="space-between" mb={2}>
            <Text>Order</Text>
            <Text>Rp {orderTotal.toLocaleString()}</Text>
          </Flex>
          <Flex justify="space-between" mb={2}>
            <Text>Shipping</Text>
            <Text>Rp 0</Text>
          </Flex>
          <Divider my={2} />
          <Flex justify="space-between" fontWeight="semibold">
            <Text>Total</Text>
            <Text>Rp {orderTotal.toLocaleString()}</Text>
          </Flex>
        </CardBody>
      </Card>

      {/* Payment Methods */}
      <Text fontWeight="medium" mb={2}>
        Payment
      </Text>
      <SimpleGrid spacing={3}>
        {paymentMethods.map((method) => (
          <Card
            key={method.id}
            borderColor={selectedMethod === method.id ? 'pink.400' : 'gray.200'}
            bg={selectedMethod === method.id ? 'white' : 'gray.50'}
            borderWidth="1px"
            onClick={() => setSelectedMethod(method.id)}
            cursor="pointer"
            _hover={{ borderColor: 'pink.300' }}
          >
            <CardBody display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <Flex  gap={3}>
                <Box w="150px" h="50px">
                <Image src={method.image} alt={method.label} objectFit="contain" w="100%" h="100%" align={'left'} />
                </Box>
              </Flex>
              <Text fontSize="sm" color="gray.500">
                **** {method.last4}
              </Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {/* Continue Button */}
      <Box mt={4} gap={2}>
      <SubmitButton onClick={handlePayment} isDisabled={!selectedMethod}>
        Continue
      </SubmitButton>
      </Box>

      {/* Success Modal */}
      <Modal isOpen={isOpen} onClose={() => {
        onClose();
        navigate('/home');
      }} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" color="green.500" fontSize="3xl">✅</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign="center" pb={6}>
            <Text fontSize="lg" fontWeight="semibold">
              Payment done successfully.
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PaymentPage;

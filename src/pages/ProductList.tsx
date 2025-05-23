import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Image,
  Text,
  VStack,
  HStack,
  Spinner,
  Center,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';

interface ProductImage {
  image_url: string;
}

interface Product {
  product_id: number;
  name: string;
  description: string;
  product_images: ProductImage[];
  stock: number;
  price: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) throw new Error('User ID tidak ditemukan');

      const response = await axios.get(
        `https://expected-odella-8fe2e9ce.koyeb.app/product/byuserid?user_id=${userId}`
      );

      const productsData = response.data.data;

      if (Array.isArray(productsData)) {
        setProducts(productsData);
      } else {
        setProducts([]);
        toast({
          title: 'Data produk tidak valid',
          status: 'warning',
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: 'Gagal memuat produk',
        description: (err as Error).message || 'Terjadi kesalahan saat mengambil data',
        status: 'error',
        isClosable: true,
      });
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('Token tidak ditemukan');
      }
  
      await axios.delete(`https://expected-odella-8fe2e9ce.koyeb.app/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      toast({
        title: 'Produk berhasil dihapus',
        status: 'success',
        isClosable: true,
      });
  
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast({
        title: 'Gagal menghapus produk',
        description: (err as Error).message || 'Terjadi kesalahan saat menghapus',
        status: 'error',
        isClosable: true,
      });
    }
  };
  

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Center mt={10}>
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <VStack spacing={4} p={4}>
      <Header />
      <Button colorScheme="pink" width="100%" onClick={() => navigate('/createproduct')}>
        Add New Product
      </Button>

      {products.length === 0 ? (
        <Text mt={10} fontWeight="bold">
          Belum ada produk
        </Text>
      ) : (
        products.map((product) => (
          <Box key={product.product_id} w="100%" bg="white" p={4} borderRadius="lg" boxShadow="sm">
            <HStack spacing={4} align="start">
              <Image
                src={product.product_images?.[0]?.image_url || ''}
                alt={product.name}
                boxSize="80px"
                objectFit="cover"
                borderRadius="md"
              />
              <Box flex="1">
                <Text fontWeight="bold" fontSize="md">
                  {product.name}
                </Text>
                <Text fontSize="sm" noOfLines={2}>
                  {product.description}
                </Text>
                <Text fontSize="sm" mt={2}>
                  Stock: {product.stock} &nbsp;&nbsp; {Number(product.price).toLocaleString()}
                </Text>
                <HStack mt={2}>
                  <Button
                    size="sm"
                    colorScheme="pink"
                    onClick={() => navigate(`/updateproduct/${product.product_id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDelete(product.product_id)}
                  >
                    Delete
                  </Button>
                </HStack>
              </Box>
            </HStack>
          </Box>
        ))
      )}
    </VStack>
  );
};

export default ProductList;

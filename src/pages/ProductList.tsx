// src/components/ProductList.tsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Image,
  Stack,
  Text,
  VStack,
  HStack,
  Spinner,
  Center,
} from '@chakra-ui/react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  stock: number;
  price: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get<Product[]>('http://localhost:3000/products') // ganti URL dengan API kamu
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
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
      <Button colorScheme="pink" width="100%">
        Add New Product
      </Button>

      {products.length === 0 ? (
        <Text mt={10} fontWeight="bold">
          Belum ada produk
        </Text>
      ) : (
        products.map((product) => (
          <Box
            key={product.id}
            w="100%"
            bg="white"
            p={4}
            borderRadius="lg"
            boxShadow="sm"
          >
            <HStack spacing={4} align="start">
              <Image
                src={product.image}
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
                  Stock: {product.stock} &nbsp;&nbsp; {product.price.toLocaleString()}
                </Text>
                <HStack mt={2}>
                  <Button size="sm" colorScheme="pink">
                    Edit
                  </Button>
                  <Button size="sm" colorScheme="red">
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

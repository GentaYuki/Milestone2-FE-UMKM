import React, { useEffect, useState } from "react";
import NavBar from '../components/navBar';
import { useParams } from "react-router-dom";
import { fetchProductById, Product } from '../api/products';
import { SubmitButton , BackButton} from "../components/button";
import { Card, CardBody, CardFooter , useToast, Image, Box, Stack, Heading, Text, Divider, Flex} from '@chakra-ui/react'

const ProductDetailPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<number | null>(null);
    const toast = useToast();

    // Get user ID from localStorage - PERSIS seperti di login page
    useEffect(() => {
        const storedUserId = localStorage.getItem('user_id');
        console.log('user_id dari localStorage:', storedUserId); // Debug
        
        if (storedUserId) {
            try {
                setUserId(parseInt(storedUserId));
            } catch (error) {
                console.error("Gagal parsing user_id:", error);
            }
        }
    }, []);

    useEffect(() => {
        if (!productId) return;

        fetchProductById(parseInt(productId))
            .then((productData) => {
                setProduct(productData);
                console.log(productData);
            })
            .catch((error) => {
                console.error("Gagal memuat produk:", error);
                toast({
                title: 'Gagal memuat detail product',
                status: 'error',
                duration: 3000,
                isClosable: true,
                });;
            })
            .finally(() => {
                setLoading(false);
            });
    }, [productId, toast]);

    const addToCart = () => {
        if (!product || !userId) {
            toast({
                title: 'Silahkan Login Terlebih Dahulu',
                status: 'error',
                duration: 3000,
                isClosable: true,
                });
            return;
        }

        fetch(`https://expected-odella-8fe2e9ce.koyeb.app/cart/${userId}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product_id: product.product_id,
                quantity: 1,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Gagal menambahkan ke keranjang');
                }
                return response.json(); // optional: if you need response content
            })
            .then(() => {
                toast({
                title: `${product.name} berhasil ditambahkan ke keranjang`,
                status: 'success',
                duration: 3000,
                isClosable: true,
                });
            })
            .catch((error) => {
                console.error("Error:", error);
                toast({
                title: 'Gagal menambahkan ke keranjang',
                status: 'error',
                duration: 3000,
                isClosable: true,
                });
            });
    };

    if (loading) {
        return (
            <div className="bg-[#fdfdfd] flex flex-row justify-center w-full">
                <div className="bg-[#fdfdfd] w-[375px] min-h-screen flex items-center justify-center">
                    <p>Memuat produk...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="bg-[#fdfdfd] flex flex-row justify-center w-full">
                <div className="bg-[#fdfdfd] w-[375px] min-h-screen flex items-center justify-center">
                    <p>Produk tidak ditemukan</p>
                </div>
            </div>
        );
    }

    return (
         <Box bg="gray.50" minH="100vh" maxW="375px" mx="auto" position="relative" px={4} pb={24}>
                {/* Back Button */}
                <BackButton top={5} left={5} />

            <Card borderRadius="xl" boxShadow="md">
                <CardBody>
                {/* Product Content */}
                    {/* Product Image */}
                        <Image
                            mt={10}
                            alt={product.name}
                            borderRadius={"md"}
                            objectFit={"cover"}
                            src={
                                product.product_images[0]?.image_url || 
                                "https://img.freepik.com/premium-vector/vector-illustration-about-concept-no-items-found-no-results-found_675567-6665.jpg?semt=ais_hybrid&w=740"
                            }
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "https://img.freepik.com/premium-vector/vector-illustration-about-concept-no-items-found-no-results-found_675567-6665.jpg?semt=ais_hybrid&w=740";
                            }}
                        />
                    

                    {/* Product Info */}
                    <Stack mt={4} spacing={2} textAlign={"left"}>
                        <Heading size="md">{product.name}</Heading>
                        
                        {/* <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-blue-600">
                                Rp {Number(product.price).toLocaleString('id-ID')}
                            </span>
                            {/* <span className="text-sm text-gray-500">
                                Stock: {product.stock}
                            </span> */}
                        {/* </div> */}
                        <Text fontWeight='bold' fontSize='sm' color='gray.700'>Category : {product.category}</Text>
                        <Text color="blue.600" fontWeight="bold">Rp {Number(product.price).toLocaleString('id-ID')}</Text>
                        
                        <Divider/>
                        <Text fontWeight='bold' color='gray.700'>{product.shop_id}</Text>
                        <Divider/>
                        <Text fontWeight="semibold">Description</Text>
                        <Text fontSize='sm' color='gray.600'>{product.description}</Text>
                        {/* <div>
                            <h2 className="font-semibold">Description</h2>
                            <p className="mt-1 text-gray-700 line-clamp-3">
                                {product.description}
                            </p>
                        </div> */}

                        {/* <div>
                            <h2 className="font-semibold">Category</h2>
                            <p className="mt-1 text-gray-700 capitalize">
                                {product.category}
                            </p>
                        </div> */}
                    </Stack>
                </CardBody>
                <Divider/>
                <CardFooter>
                    <Flex justify="center" width="100%">
                    {/* Add to Cart Button */}
                        <SubmitButton onClick={addToCart}>Add to Cart</SubmitButton>
                    </Flex>
                </CardFooter>
            </Card>
                <NavBar />
        </Box>
    );
};

export default ProductDetailPage;
















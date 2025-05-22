import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import NavBar from '../components/navBar'
import { fetchProducts, Product } from '../api/products'
import axios from 'axios'
import { Card, SimpleGrid, Box, Spinner, Text, Image , Heading, Flex, Button} from '@chakra-ui/react'

const PRODUCTS_PER_PAGE = 10;
// const DEFAULT_PROFILE_PIC = require('../assets/image/profile.png');


const HomePage2: React.FC = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [initialValues, setInitialValues] = useState({profilePicture: ''});

  // Categories data
  const categories = [
    {
      name: "Food",
      image: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg",
      slug: "food"
    },
    {
      name: "Fashion",
      image: "https://img.freepik.com/free-photo/assortment-jamu-traditional-indonesian-herbal-medicine_23-2149156159.jpg",
      slug: "fashion"
    },
    {
      name: "Handicraft",
      image: "https://img.freepik.com/free-photo/indonesian-wayang-puppets-display_23-2147948773.jpg",
      slug: "handicraft"
    },
    {
      name: "Electronic",
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb",
      slug: "electronic"
    },
    {
      name: "Herbal",
      image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924",
      slug: "herbal"
    },
    
];

useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem('user_id');
      if (!userId){
        console.error('User ID not found in localStorage');
        navigate('/login');
        return;
      }
      try {
        const response = await axios.get(`https://expected-odella-8fe2e9ce.koyeb.app/user/${userId}`);
        const user = response?.data?.data;
        console.log(user);

        if (user) {
          setInitialValues({
            profilePicture: user.user_image || '',
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts()
        setProducts(productsData)
        setError(null)
      } catch (err) {
        console.error("Failed to load products:", err)
        setError(err instanceof Error ? err.message : 'Failed to load products')
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Handle category click
  const handleCategoryClick = (categorySlug: string) => {
    navigate(`/category/${categorySlug}`)
  }

  // Only show first 10 products
 const paginatedProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  return (
    <Box bg="#fdfdfd" w="full" display="flex" justifyContent="center">
      <Box maxW="375px" w="full" pb="80px">
          <Card mt={4} p={3} boxShadow={'md'} borderRadius={'lg'}>
            <Flex align='center' justify='space-between'>
                <Flex align='center' gap={2}>
                <Image
                    boxSize='32px'
                    alt="Stylish Logo"
                    src="https://c.animaapp.com/m9sr09xvPvV0Jw/img/group-34010.png"/>

                    <Heading size='md' color='blue.400'>
                    UMKM Connect
                    </Heading>

                </Flex>

                <Link to = "/profile">
                <Image 
                src={initialValues.profilePicture} 
                alt="profile" 
                className="w-10 h-10 object-cover rounded-full" 
                />
                </Link>
            </Flex>
          </Card>

          {/* Categories Section */}
          <Card mt={4} p={4} boxShadow="md" borderRadius="lg">
            <Flex gap={4} overflowX="auto" pb={2}>
              {categories.map((category, index) => (
                <Box 
                  key={index}
                  textAlign="center"
                  cursor="pointer"
                  onClick={() => handleCategoryClick(category.slug)}
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    boxSize="56px"
                    borderRadius="full"
                    objectFit="cover"
                  />
                  <Text fontSize="xs" mt={1} fontFamily={'Montserrat, Helvetica'}>
                    {category.name}
                  </Text>
                </Box>
              ))}
            </Flex>
          </Card>

          {/* Products Section */}
          <Card mt={6} p={4} boxShadow="md" borderRadius="lg">
            {error ? (
              <Text color="red.500" fontSize="xs" textAlign="center" textStyle={'montserrat'}>{error}</Text>
            ) : loading ? (
              <Flex justify="center" align="center" minH="100px">
                <Spinner size="sm" />
                <Text ml={2}>Loading products...</Text>
              </Flex>
            ) : paginatedProducts.length === 0 ? (
              <Text textAlign="center" fontSize="sm">
                No products available
              </Text>
            ) : (
            <>
              <SimpleGrid columns={2} spacing={3}>
                {paginatedProducts.map((product) => (
                  <Card
                    key={product.product_id}
                    p={2}
                    borderRadius="md"
                    boxShadow="lg"
                    cursor="pointer"
                    onClick={() => navigate(`/product/${product.product_id}`)}
                  >
                    {/* Product Image */}
                    {product.product_images?.[0]?.image_url ? (
                      <Image
                        src={product.product_images[0].image_url}
                        alt={product.name}
                        height="100px"
                        objectFit="cover"
                        borderRadius="md"
                        fallbackSrc="https://via.placeholder.com/150"
                      />
                    ) : (
                      <Box height="100px" bg="gray.200" display="flex" justifyContent="center" alignItems="center">
                        <Text fontSize="xs" color="gray.500">
                          No Image
                        </Text>
                      </Box>
                    )}
                    
                    {/* Product Info */}
                    <Text fontWeight="semibold" fontSize="sm" noOfLines={1}>
                        {product.name}
                    </Text>
                    <Text fontSize="xs" color="gray.600" noOfLines={1}>
                        {product.shop.shop_name}
                    </Text>
                    <Flex justify="space-between" align="center" mt={1}>
                        <Text fontWeight="bold" fontSize="sm">
                          Rp {product.price}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          Stock: {product.stock}
                        </Text>
                    </Flex>
                  </Card>
                ))}
              </SimpleGrid>
              <Flex justify ='space-between' mt={4}>
                <Button size='sm' onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} isDisabled={currentPage === 1}>
                  Previous
                </Button>
                <Text fontSize='xs'>Page {currentPage} of {totalPages}</Text>
                <Button size='sm' onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} isDisabled={currentPage === totalPages}>
                  Next
                </Button>
              </Flex>
              </>
            )}
          </Card>

          <NavBar />
        </Box>
      </Box>

  );
};

export default HomePage2
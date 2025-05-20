import React, { useEffect, useState } from "react";
import NavBar from '../components/navBar';
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById, Product } from '../api/products';
import { SubmitButton , BackButton} from "../components/button";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'

const ProductDetailPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState<{show: boolean, message: string}>({show: false, message: ''});
    const [userId, setUserId] = useState<number | null>(null);

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
                setNotification({
                    show: true,
                    message: 'Gagal memuat detail produk',
                });
                setTimeout(() => setNotification({ show: false, message: '' }), 3000);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [productId]);

    const addToCart = () => {
        if (!product || !userId) {
            setNotification({
                show: true,
                message: 'Silakan login terlebih dahulu',
            });
            setTimeout(() => setNotification({ show: false, message: '' }), 3000);
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
                setNotification({
                    show: true,
                    message: `${product.name} berhasil ditambahkan ke keranjang!`,
                });
                setTimeout(() => setNotification({ show: false, message: '' }), 3000);
            })
            .catch((error) => {
                console.error("Error:", error);
                setNotification({
                    show: true,
                    message: error instanceof Error ? error.message : 'Gagal menambahkan produk',
                });
                setTimeout(() => setNotification({ show: false, message: '' }), 3000);
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
        <div className="bg-[#fdfdfd] flex flex-row justify-center w-full">
            <div className="bg-[#fdfdfd] w-[375px] min-h-screen relative">
                {/* Back Button */}
                <BackButton top={5} left={5} />

                {/* Notification */}
                {notification.show && (
                    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 max-w-[90%]">
                        {notification.message}
                    </div>
                )}

                {/* Product Content */}
                <div className="pt-16 pb-20 px-4">
                    {/* Product Image */}
                    <div className="w-72 h-40 mb-4 rounded-lg overflow-hidden bg-gray-100 mx-auto">
                        <img
                            className="w-full h-full object-cover"
                            alt={product.name}
                            src={
                                product.product_images[0]?.image_url || 
                                "https://img.freepik.com/premium-vector/vector-illustration-about-concept-no-items-found-no-results-found_675567-6665.jpg?semt=ais_hybrid&w=740"
                            }
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "https://img.freepik.com/premium-vector/vector-illustration-about-concept-no-items-found-no-results-found_675567-6665.jpg?semt=ais_hybrid&w=740";
                            }}
                        />
                    </div>

                    {/* Product Info */}
                    <div className="space-y-4">
                        <h1 className="text-xl font-bold">{product.name}</h1>
                        
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-blue-600">
                                Rp {Number(product.price).toLocaleString('id-ID')}
                            </span>
                            <span className="text-sm text-gray-500">
                                Stock: {product.stock}
                            </span>
                        </div>

                        <div>
                            <h2 className="font-semibold">Description</h2>
                            <p className="mt-1 text-gray-700 line-clamp-3">
                                {product.description}
                            </p>
                        </div>

                        <div>
                            <h2 className="font-semibold">Category</h2>
                            <p className="mt-1 text-gray-700 capitalize">
                                {product.category}
                            </p>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="fixed bottom-16 left-0 right-0 px-4 max-w-[375px] mx-auto">
                        <SubmitButton onClick={addToCart}>Add to Cart</SubmitButton>
                    </div>
                </div>

                <NavBar />
            </div>
        </div>
    );
};

export default ProductDetailPage;
















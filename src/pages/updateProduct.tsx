import React, { useEffect, useState } from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInputField } from '../components/InputField2';
import axios from 'axios';
import { useNavigate , useParams} from 'react-router-dom';
import { SubmitButton , BackButton} from '../components/button';
import { Card, CardBody, Heading, Box} from '@chakra-ui/react'


const updateProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    category: Yup.string().required('Category is required'),
    price: Yup.string().required('Price is required'),
    quantity: Yup.number()
        .required('Quantity is required')
        .moreThan(0, 'Quantity must be greater than 0'),
});


const UpdateProductPage : React.FC = () => {
    const navigate = useNavigate();
    const { productId } = useParams();
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [initialValues, setInitialValues] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        quantity: 0,
    });
    

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://expected-odella-8fe2e9ce.koyeb.app/product/${productId}`);
                const data = response.data.data;
                setInitialValues({
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category,
                    quantity: data.stock,
                });
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch product details');
                console.error(error);
                setLoading(false);
            }
        };

         fetchProduct();
    }, [productId]);

    const handleSubmit = async (values: typeof initialValues) => {
        const access_token = localStorage.getItem('access_token');
        if (!access_token) {
            navigate('/login');
            return;
        }

        try {
            await axios.put(
                `https://expected-odella-8fe2e9ce.koyeb.app/product/${productId}`,
                values,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            );
            navigate('/DashboardSeller');
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message || 'Failed to update product');
            } else {
                setError('An error occurred during update');
            }
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <Box p={4}>
            <BackButton top={5} left={5}/>
            <Heading size="md" mb="4">Update Product</Heading>
            <Card>
                <CardBody>
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize
                        validationSchema={updateProductSchema}
                        onSubmit={handleSubmit}
                    >
                        {() => (
                            <Form>
                                <Box display='flex' flexDirection={'column'} gap={3}>
                                <TextInputField name="name" label='Product Name:' placeholder="Product Name" />
                                <TextInputField name="description" label='Description:' placeholder="Description" />
                                <TextInputField name="category" label='Category:' placeholder="Category" />
                                <TextInputField name="price" label='Price:' placeholder="Price" />
                                <TextInputField name="quantity" label='Quantity:' type="number" />

                                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                                    <Box mt={4} gap={2}>
                                        <SubmitButton type="submit">Update Product</SubmitButton>
                                    </Box>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </CardBody>
            </Card>
        </Box>
    );
};

export default UpdateProductPage;
import React, { useState } from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInputField } from '../components/InputField2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SubmitButton , BackButton} from '../components/button';
import { Card, CardBody, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Box} from '@chakra-ui/react'


interface createProductFormValues {
    name: string;
    description: string;
    category: string;
    price: string;
    quantity: number;
}


const createProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    category: Yup.string().required('Category is required'),
    price: Yup.string().required('Price is required'),
    quantity: Yup.number().required('Quantity is required').moreThan(0, 'Quantity must be greater than 0'),
});

const CreateProductPage : React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');
    const [productId, setProductId] = useState<number | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('');

    const handleProductSubmit = async (values: createProductFormValues) => {
        const userId = localStorage.getItem('user_id');
        const access_token = localStorage.getItem('access_token');

            if (!userId && !access_token) {
                console.error('Please Login First');
                navigate('/login');
                return;
            }
        try {
            const rensponse = await axios.post('https://expected-odella-8fe2e9ce.koyeb.app/product/', values, {
                headers: {
                Authorization: `Bearer ${access_token}`
                }
            });
            const newProductId = rensponse.data?.data?.product_id;
            setProductId(newProductId);
            setError('');
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message || 'Product creation failed');
            } else {
                setError(' An error occurred during product creation');
            }
        };
    };

    const handleImageUpload = async () => {
        if (!productId || !selectedFile) {
            setUploadStatus('Product ID or file not found');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            await axios.post(`https://expected-odella-8fe2e9ce.koyeb.app/upload/productimage/${productId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUploadStatus('Image uploaded successfully');
            navigate('/DashboardSeller');
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message || 'Upload Image failed');
            } else {
                setError(' An error occurred during Upload Image');
            }
        }
    };

    return (
        <Box p={4}>
            <BackButton top={5} left={5}/>
            <Heading size='md' mb='4'>Create Product</Heading>
            <Tabs isFitted variant='enclosed'>
                <TabList>
                    <Tab>Create Product</Tab>
                    <Tab isDisabled={!productId}>Product Image</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Card boxShadow={'lg'}>
                            <CardBody>
                                <Formik
                                initialValues={{
                                    name: '',
                                    description:'',
                                    category: '',
                                    price:'',
                                    quantity: 0 ,
                                }}
                                validationSchema={createProductSchema}
                                onSubmit={handleProductSubmit}
                                >
                                    {() => (
                                        <Form>
                                            <Box display={'flex'} flexDirection={'column'} gap={4}>
                                                <TextInputField name='name' 
                                                label='Product Name:' placeholder='Nama Product'/>
                                                <TextInputField name='description'label='Description:' placeholder='Description Product' />
                                                <TextInputField name='category' 
                                                label='Category:' placeholder='Category' />
                                                <TextInputField name='price' 
                                                label='Price:' placeholder='Price' />
                                                <TextInputField name='quantity' 
                                                label='Quantity:' placeholder='Quantity' type='number' />

                                                {error && <p className='text-red-500 text-sm text-center'>{error}</p>}

                                                <Box mt={4}>
                                                    <SubmitButton type='submit'>Create Product</SubmitButton>
                                                </Box>
                                            </Box>
                                        </Form>
                                    )}
                                </Formik>
                            </CardBody>
                        </Card>
                    </TabPanel>

                    <TabPanel>
                        <Card>
                            <CardBody>
                                <input 
                                className='mb-4'
                                type="file"
                                accept="image/png, image/jpeg, image/jpg" 
                                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />

                                <SubmitButton onClick={handleImageUpload}>Upload Image</SubmitButton>
                                {uploadStatus && <p>{uploadStatus}</p>}
                            </CardBody>
                        </Card>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default CreateProductPage;

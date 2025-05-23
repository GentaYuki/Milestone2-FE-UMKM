import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInputField, SelectField } from '../components/InputField2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SubmitButton, BackButton } from '../components/button';
import { Card, CardBody, Heading, Box } from '@chakra-ui/react';
import { Header } from '../components/Header';

interface CreateProductFormValues {
  name: string;
  price: number;
  description: string;
  stock: number;
  category: string;
  image?: File | null;
}

const createProductSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  price: Yup.number().required('Price is required').positive('Price must be positive'),
  description: Yup.string().required('Description is required'),
  stock: Yup.number().required('Quantity is required').moreThan(0, 'Quantity must be greater than 0'),
  category: Yup.string().required('Category is required'),
});

const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  const handleSubmit = async (values: CreateProductFormValues) => {
    const userId = localStorage.getItem('user_id');
    const access_token = localStorage.getItem('access_token');

    if (!userId || !access_token) {
      console.error('Please Login First');
      navigate('/login');
      return;
    }

    let newProductId: number | undefined;

    try {
      // 1. Buat produk
      const response = await axios.post(
        'https://expected-odella-8fe2e9ce.koyeb.app/product/',
        {
          name: values.name,
          price: values.price,
          description: values.description,
          stock: values.stock,
          category: values.category,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      newProductId = response.data?.data?.product_id;
      if (!newProductId) throw new Error('Product ID not returned from server');

      // 2. Upload gambar jika ada
      if (values.image) {
        const formData = new FormData();
        formData.append('image', values.image);

        try {
          await axios.post(
            `https://expected-odella-8fe2e9ce.koyeb.app/upload/productimage/${newProductId}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${access_token}`,
              },
            }
          );
        } catch (uploadError) {
          // Upload gagal, rollback: hapus produk yang sudah dibuat
          try {
            await axios.delete(
              `https://expected-odella-8fe2e9ce.koyeb.app/product/${newProductId}`,
              {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                },
              }
            );
            setError('Image upload failed. Product creation was canceled.');
          } catch (deleteError) {
            setError('Image upload failed and product deletion also failed.');
          }
          return;
        }
      }

      // Jika sukses semua, navigasi ke daftar produk
      setError('');
      navigate('/productlist');
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Submission failed');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred during submission');
      }
    }
  };

  return (
    <Box p={4}>
      <BackButton top={5} left={5} />
      <Header />
      <Heading size="md" mb="4">
        Create Product
      </Heading>
      <Card boxShadow={'lg'}>
        <CardBody>
          <Formik
            initialValues={{
              name: '',
              price: 0,
              description: '',
              stock: 0,
              category: '',
              image: null,
            }}
            validationSchema={createProductSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form>
                <Box display={'flex'} flexDirection={'column'} gap={4}>
                  <TextInputField
                    name="name"
                    label="Product Name:"
                    placeholder="Product Name"
                  />
                  <TextInputField
                    name="price"
                    label="Price:"
                    placeholder="Price"
                    type="number"
                  />
                  <TextInputField
                    name="description"
                    label="Description:"
                    placeholder="Description Product"
                  />
                  <TextInputField
                    name="stock"
                    label="Stock:"
                    placeholder="Stock"
                    type="number"
                  />
                  <SelectField
                    name="category"
                    label="Category:"
                    options={[
                      'food',
                      'fashion',
                      'handicraft',
                      'electronic',
                      'herbal',
                    ]}
                    placeholder="Select Category"
                  />

                  <Box>
                    <label>Upload Image:</label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={(event) => {
                        const file = event.currentTarget.files?.[0] || null;
                        setFieldValue('image', file);
                      }}
                    />
                  </Box>

                  {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                  )}

                  <Box mt={4}>
                    <SubmitButton type="submit">Create Product</SubmitButton>
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

export default CreateProductPage;

import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { 
  FiShoppingBag, 
  FiPhone, 
  FiFileText, 
  FiCreditCard, 
  FiUser,
  FiDollarSign,
  FiMapPin
} from 'react-icons/fi';
import { TextInputField } from '../components/InputField2';
import { SubmitButton } from '../components/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from "lucide-react";
import { Button, FormControl, InputGroup, InputLeftElement, useToast, Spinner } from '@chakra-ui/react';
import { Field } from 'formik';
import axios from 'axios';

interface ShopRegisterValues {
  shopName: string;
  phoneNumber: string;
  shopDescription: string;
  shopCategory: string;
  idCard: string;
  bankAccount: string;
  bankHolder: string;
  city: string;
}

const ShopRegisterSchema = Yup.object().shape({
  shopName: Yup.string().required('Nama toko wajib diisi'),
  phoneNumber: Yup.string()
    .required('Nomor telepon wajib diisi')
    .matches(/^[0-9]+$/, 'Harus berupa angka')
    .min(10, 'Minimal 10 digit')
    .max(15, 'Maksimal 15 digit'),
  shopDescription: Yup.string()
    .required('Deskripsi toko wajib diisi')
    .min(20, 'Minimal 20 karakter'),
  city: Yup.string().required('Kota wajib diisi'),
  shopCategory: Yup.string(),
  idCard: Yup.string(),
  bankAccount: Yup.string(),
  bankHolder: Yup.string(),
});

export const ShopRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false); // Tambahkan state untuk authorization
  
  const initialValues: ShopRegisterValues = {
    shopName: '',
    phoneNumber: '',
    shopDescription: '',
    shopCategory: '',
    idCard: '',
    bankAccount: '',
    bankHolder: '',
    city: ''
  };

  // Pengecekan authorization sederhana
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      toast({
        title: 'Akses Ditolak',
        description: 'Anda harus login terlebih dahulu',
        status: 'warning',
        duration: 3000,
      });
      navigate('/login');
    } else {
      setIsAuthorized(true); // Set authorized jika token ada
    }
  }, [navigate, toast]);

  const handleSubmit = async (values: ShopRegisterValues) => {
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        navigate('/login');
        return;
      }

      const payload = {
        shop_name: values.shopName,
        shop_address_city: values.city,
        description: values.shopDescription,
        shop_phone: values.phoneNumber
      };

      const { data } = await axios.post(
        'https://expected-odella-8fe2e9ce.koyeb.app/shop/shop',
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      toast({
        title: 'Pendaftaran Berhasil',
        description: `Toko "${data.shop_name}" berhasil terdaftar`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      setTimeout(() => navigate('/productlist'), 2000);
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          localStorage.removeItem('access_token');
          navigate('/login');
          return;
        }
        
        const errorMessage = error.response?.data?.message || 
                         error.response?.data?.error || 
                         'Terjadi kesalahan saat mendaftarkan toko';
        
        toast({
          title: 'Pendaftaran Gagal',
          description: errorMessage,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Error',
          description: 'Terjadi kesalahan tidak terduga',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Jika belum authorized, tampilkan loading spinner
  if (!isAuthorized) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-white">
      <div className="w-full max-w-[375px] space-y-5">
        <div className="flex items-center mb-2">
          <Button 
            onClick={() => navigate(-1)} 
            variant="ghost"
            p={2}
            borderRadius="full"
            _hover={{ bg: 'gray.100' }}
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </Button>
          <h1 className="ml-2 text-3xl font-bold">Create Your Shop</h1>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={ShopRegisterSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              <TextInputField 
                name="shopName"
                placeholder="Shop's Name"
                icon={<FiShoppingBag color="gray" />}
              />

              <TextInputField 
                name="city"
                placeholder="City"
                icon={<FiMapPin color="gray" />}
              />

              <TextInputField 
                name="phoneNumber"
                placeholder="Telephone Number"
                icon={<FiPhone color="gray" />}
              />

              <TextInputField 
                name="shopDescription"
                placeholder="Deskripsi Toko"
                type="textarea"
                icon={<FiFileText color="gray" />}
              />

              <TextInputField 
                name="shopCategory"
                placeholder="Category (optional)"
                icon={<FiShoppingBag color="gray" />}
              />

              <TextInputField 
                name="idCard"
                placeholder="ID Card (optional)"
                icon={<FiCreditCard color="gray" />}
              />

              <TextInputField 
                name="bankAccount"
                placeholder="Bank Account's Number (optional)"
                icon={<FiDollarSign color="gray" />}
              />

              <TextInputField 
                name="bankHolder"
                placeholder="Bank Account Holder's Name (optional)"
                icon={<FiUser color="gray" />}
              />

              <SubmitButton 
                isLoading={isSubmitting} 
                disabled={isSubmitting} 
                loadingText="Mendaftarkan..."
              >
                Create Shop
              </SubmitButton>

              {/* <p className="text-xs text-gray-500 text-center px-2">
                Dengan mengklik <span className="text-pink-600 font-medium">Daftarkan Toko</span>, 
                Anda menyetujui Syarat dan Ketentuan kami
              </p> */}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};


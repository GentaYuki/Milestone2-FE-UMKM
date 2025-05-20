import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { TextInputField } from '../components/InputField2';
import axios from 'axios';
import { SubmitButton, LogoutButton } from '../components/button';
import { Accordion, AccordionButton, AccordionPanel, AccordionItem, AccordionIcon, Box } from '@chakra-ui/react';

const ProfileForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    gender : '',
    profilePicture: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    bankNumber: '',
    accountName: '',
    ifsc: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem('user_id');
      console.log (userId);
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
            name: user.name || '',
            email: user.email || '',
            gender: user.gender || '',
            profilePicture: user.user_image || '',
            phone: user.phone || '',
            address: user.address_street || '',
            city: user.address_city || '',
            state: user.address_district || '',
            country: user.address_country || '',
            bankNumber: '',
            accountName: '',
            ifsc: '',
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

  const handleSubmit = async (values: typeof initialValues) => {
    const userId = localStorage.getItem('user_id');
    console.log (userId);

      if (!userId){
        console.error('User ID not found in localStorage');
        navigate('/login');
        return;
      }

      const payload = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        address_street: values.address,
        address_city: values.city,
        address_district: values.state,
        address_country: values.country,
        address_subdistrict: '',
        address_zipcode: '',    
      };

    try {
      await axios.put(`https://expected-odella-8fe2e9ce.koyeb.app/user/update/${userId}`, payload);
      alert('Profile updated successfully');
      console.log(payload);
      navigate('/home');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  const changePassword = () => {
    navigate('/changepassword');
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      alert('Only JPG, JPEG, and PNG files are allowed');
      return;
    }

    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('access_token');

    if (!userId || !token) {
      alert('User not authenticated');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      await axios.post(
        `https://expected-odella-8fe2e9ce.koyeb.app/upload/userimage/${userId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
      });
      window.location.reload();
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const ProfileSchema = Yup.object().shape({
    name: Yup.string().required('username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().nullable(),
    phone: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
    bankNumber: Yup.string().nullable(),
    accountName: Yup.string().nullable(),
    ifsc: Yup.string().nullable(),
  });

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-[375px] mx-auto px-4 py-6">
      <button onClick={() => navigate(-1)} className="flex items-center text-sm text-gray-500 mb-4 gap-1"> <span className='text-2xl'>&larr;</span>
      </button>

      <h2 className="text-center text-2xl font-bold mb-6">Profile</h2>

      <div className="flex justify-center mb-4">
        <img
          src={initialValues.profilePicture || 'https://via.placeholder.com/80'}
          alt="Avatar"
          className="w-20 h-20 rounded-full object-cover"
        />
      </div>
      <div className="mb-2 text-sm text-blue-600 underline cursor-pointer hover:tetx-blue-800">
                <label htmlFor="fileUpload" className="cursor-pointer">
                  Change Profile Picture
                </label>
                <input id="fileUpload" type="file" accept=".jpg,.jpeg,.png" onChange={handleImageUpload} className="hidden"
                />
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={ProfileSchema}
        onSubmit={handleSubmit}
        enableReinitialize 
      >
        <Form className="space-y-5">
            <Accordion defaultIndex={[0]} allowMultiple>
              <AccordionItem>
            <h3 className="font-semibold mb-2 text-lg">
              <AccordionButton>
                <Box as='span' flex='1' textAlign='left'>Personal Details</Box>
              <AccordionIcon/>
              </AccordionButton>
            </h3>
            <AccordionPanel pb={4}>
            <TextInputField name="name" label="Username:" placeholder="Username" />
            {/* <label htmlFor='email' className='block text-sm/6 font-medium text-gray-900'>Email</label>
            <InputField name="email" type="email" placeholder="Email address" /> */}
            <TextInputField name="email" label="Email:" placeholder="Email" />
            <div className="mb-2 mt-2">
              <button onClick={changePassword} className="text-sm text-blue-600 underline cursor-pointer hover:text-blue-800">
                Change Password
              </button>
            </div>
            </AccordionPanel>
          </AccordionItem>          

          <AccordionItem>
            <h3 className="font-semibold mb-2 text-lg">
              <AccordionButton>
                <Box as='span' flex='1' textAlign='left'>Business Address Details</Box>
              <AccordionIcon/>
              </AccordionButton>
              </h3>
            <AccordionPanel pb={4}>
            <TextInputField name="phone" label="Phone Number:" placeholder="Phone Number" />
            <TextInputField name="address" label="Address:" placeholder="Address" />
            <TextInputField name="city" label="City:" placeholder="City" />
            <TextInputField name="state" label="State:" placeholder="State" />
            <TextInputField name="country" label="Country:" placeholder="Country" />
            </AccordionPanel>
          </AccordionItem>
          
          <AccordionItem>
            <h3 className="font-semibold mb-2 text-lg">
              <AccordionButton>
                <Box as='span' flex='1' textAlign='left'>Bank Account Details</Box>
              <AccordionIcon/>
              </AccordionButton>
            </h3>
            <AccordionPanel pb={4}>            
            <TextInputField name="bankNumber" label="Bank Number:" placeholder="Bank Number" />
            <TextInputField name="accountName" label="Account Name:" placeholder="Account Name" />
            <TextInputField name="ifsc" label="IFSC Code:" placeholder="IFSC Code" />
            </AccordionPanel>
          </AccordionItem>
          </Accordion>

          <SubmitButton>Save</SubmitButton>

          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </Form>
      </Formik>
    </div>
  );
};

export default ProfileForm;

import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/inputField';
import axios from 'axios';

const ProfileForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    username:``,
    email: '',
    password: '',
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

      if (!userId){
        console.error('User ID not found in localStorage');
        navigate('/login');
        return;
      }
      try {
        const response = await axios.get(`https://expected-odella-8fe2e9ce.koyeb.app/user/${userId}`);
        setInitialValues(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (values: typeof initialValues) => {
    const userId = localStorage.getItem('user_id');

      if (!userId){
        console.error('User ID not found in localStorage');
        navigate('/login');
        return;
      }
    try {
      await axios.put(`https://expected-odella-8fe2e9ce.koyeb.app/user/update/${userId}`, values);
      alert('Profile updated successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      alert('Only JPG, JPEG, and PNG files are allowed');
      return;
    }

    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      alert('User not authenticated');
      return;
    }

    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      await axios.post(
        `https://expected-odella-8fe2e9ce.koyeb.app/user/update/${userId}`,
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
    username: Yup.string().required('username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    phone: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
    bankNumber: Yup.string().required('Bank number is required'),
    accountName: Yup.string().required('Account name is required'),
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

      <Formik
        initialValues={initialValues}
        validationSchema={ProfileSchema}
        onSubmit={handleSubmit}
        enableReinitialize 
      >
        <Form className="space-y-5">
          <section className='space-y-4 border-b pb-6 text-left'>
            <h3 className="font-semibold mb-2 text-lg">Personal Details</h3>
            <div>
            <label htmlFor="username" className='block text-sm/6 font-medium text-gray-900'>Username</label>
            <InputField name="username" type="text" placeholder="Username" />
            </div>
            <div>
            <label htmlFor='email' className='block text-sm/6 font-medium text-gray-900'>Email</label>
            <InputField name="email" type="email" placeholder="Email address" />
            </div>
            <div>
            <label htmlFor='password' className='block text-sm/6 font-medium text-gray-900'>Password</label>
            <InputField name="password" type="password" placeholder="Password" />
            </div>
            <div className="mt-2 text-sm text-blue-600 underline cursor-pointer hover:tetx-blue-800">
                <label htmlFor="fileUpload" className="cursor-pointer">
                  Change Profile Picture
                </label>
                <input id="fileUpload" type="file" accept=".jpg,.jpeg,.png" onChange={handleImageUpload} className="hidden"
                />
              </div>
          </section>

          <section className='space-y-4 border-b pb-6 text-left'>
            <h3 className="font-semibold mb-2 text-lg">Business Address Details</h3>
            <div>
            <label htmlFor='phone' className='block text-sm/6 font-medium text-gray-900'>Phone Number</label>
            <InputField name="phone" type="text" placeholder="Phone number" />
            </div>
            <div>
            <label htmlFor='address' className='block text-sm/6 font-medium text-gray-900'>Address</label>
            <InputField name="address" type="text" placeholder="Address" />
            </div>
            <div>
            <label htmlFor='city' className='block text-sm/6 font-medium text-gray-900'>City</label>
            <InputField name="city" type="text" placeholder="City" />
            </div>
            <div>
            <label htmlFor='state' className='block text-sm/6 font-medium text-gray-900'>State</label>
            <InputField name="state" type="text" placeholder="State" />
            </div>
            <div>
            <label htmlFor='country' className='block text-sm/6 font-medium text-gray-900'>Country</label>
            <InputField name="country" type="text" placeholder="Country" />
            </div>
          </section>

          <section className='space-y-4 border-b pb-6 text-left'>
            <h3 className="font-semibold mb-2 text-lg">Bank Account Details</h3>
            <div> 
            <label htmlFor='bankNumber' className='block text-sm/6 font-medium text-gray-900'>Bank Number</label>
            <InputField name="bankNumber" type="text" placeholder="Bank Number" />
            </div>
            <div>
            <label htmlFor='accountName' className='block text-sm/6 font-medium text-gray-900'>Account Name</label>
            <InputField name="accountName" type="text" placeholder="Account Name" />
            </div>
            <div>
            <label htmlFor='ifsc' className='block text-sm/6 font-medium text-gray-900'>IFSC</label>
            <InputField name="ifsc" type="text" placeholder="IFSC" />
            </div>
          </section>

          <button type="submit" className="w-full bg-pink-600 text-white py-3 rounded-md font-semibold text-sm">
            Save
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ProfileForm;

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
    email: '',
    password: '',
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
      try {
        const response = await axios.get('http://localhost:3000/api/auth/profile');
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
    try {
      await axios.put('http://localhost:3000/api/auth/profile', values);
      alert('Profile updated successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const ProfileSchema = Yup.object().shape({
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
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-center text-2xl font-bold mb-4">Profile</h2>

      <div className="flex justify-center mb-4">
        <img
          src="https://via.placeholder.com/80"
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
        <Form className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Personal Details</h3>
            <InputField name="email" type="email" placeholder="Email address" />
            <InputField name="password" type="password" placeholder="Password" />
          </div>

          <div>
            <h3 className="font-semibold mb-2">Business Address Details</h3>
            <InputField name="phone" type="text" placeholder="Phone number" />
            <InputField name="address" type="text" placeholder="Address" />
            <InputField name="city" type="text" placeholder="City" />
            <InputField name="state" type="text" placeholder="State" />
            <InputField name="country" type="text" placeholder="Country" />
          </div>

          <div>
            <h3 className="font-semibold mb-2">Bank Account Details</h3>
            <InputField name="bankNumber" type="text" placeholder="Bank Number" />
            <InputField name="accountName" type="text" placeholder="Account Name" />
            <InputField name="ifsc" type="text" placeholder="IFSC" />
          </div>

          <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded-md">
            Save
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ProfileForm;

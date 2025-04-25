import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FiUser, FiLock , FiEye, FiEyeOff} from 'react-icons/fi';
import InputField from '../components/inputField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


interface RegisterFormValues {
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').matches(/[A-Z]/, 'Password must contain at least one uppercase letter and number').matches(/\d/, 'Password must contain at least one number').required('Password is required'),
    confirmPassword : Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm Password Required'),
});

const RegisterForm : React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');
    const [ShowPassword, setShowPassword] = useState(false);
    const [ShowConfirmPassword, setShowConfirmPassword] = useState(false);
    
    {/* initial value for Register */}
    const InitialValues = {
        email: '',
        password: '',
        confirmPassword: '',
    };

    const handleSubmit = async (values : RegisterFormValues) => {
        try {
            const { email, password } = values;
            const response = await axios.post('https://expected-odella-8fe2e9ce.koyeb.app/user/register', {email, password});
            console.log ( response.data);
            navigate('/login');
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message || 'Registration failed');
            } else {
                setError(' An error occurred during registration');
            }
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen px-4 bg-white'>
            <Formik
            initialValues={InitialValues}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit} >

            {({ isSubmitting }) => (
                <Form className = 'w-full max-w-[375px] space-y-5'>
                    <h2 className = 'text-3xl font-bold text-center'>Create an account</h2>

                {/* Email */}
                <InputField name= 'email' type='email' placeholder='Email' icon={<FiUser />} />

                {/*Password */}
                <div className='relative'>
                <InputField name= 'password' type={ShowPassword ? 'text' : 'password'} placeholder='Password' icon={<FiLock />} />
                <button type='button' className = 'absolute right-3 top-1/2 -translate-y-1/2 text-gray-500' onClick={() => setShowPassword(!ShowPassword)}>
                    {ShowPassword ? <FiEye /> : <FiEyeOff />}
                </button>

                {/*Confirm Password */}
                </div>
                <div className ='relative'>
                <InputField name= 'confirmPassword' type={ShowConfirmPassword ? 'text' : 'password'} placeholder='Confirm Password' icon={<FiLock />} />
                <button type='button' className = 'absolute right-3 top-1/2 -translate-y-1/2 text-gray-500' onClick={() => setShowConfirmPassword(!ShowConfirmPassword)}>
                    {ShowConfirmPassword ? <FiEye/> : <FiEyeOff />}
                </button>
                </div>

                <p className='text-xs text-gray-500 text-center px-2'>By clicking the <span className='text-pink-600 font-medium'> Register </span>button, you agree to the public offer</p>

                <button type='submit' className='w-full bg-pink-600 text-white py-2 rounded-md text-sm font-semibold' disabled={isSubmitting}>
                    {isSubmitting ? 'Registering...' : 'Register'}
                </button>
                {error && <p className ='text-red-500 text-sm text-center'>{error}</p>}
                
                <p className='text-center text-sm text-gray-700'>
                    I Already Have an Account <a href = '/login' className = 'text-pink-600 font-medium'>Login</a>
                </p>
            </Form>
         )}
            </Formik>
        </div>
    );
};
export default RegisterForm
           
    
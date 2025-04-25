import React, {useState} from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/inputField';
import axios from 'axios';
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';


interface LoginFormValues {
    email: string;
    password: string;
}

const LoginSchema=Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email Required'),
    password : Yup.string().min(6, 'Password must be at least 6 characters').required('Password Required'),
})

const LoginForm : React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);

    {/* initial value for login */}
    const InitialValues = {
        email :'',
        password: ''
    }

    const handleSubmit = async (values : LoginFormValues) => {
        try {
            const response = await axios.post('https://expected-odella-8fe2e9ce.koyeb.app/user/login', values);
            console.log ( response.data);
            const { data } = response.data;

            if (data?.user?.user_id && data?.access_toke){
                localStorage.setItem('user_id', data.user.user_id.toString());
                localStorage.setItem('access_token', data.access_token);
            }
            navigate('/dashboard');
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message || 'Login failed');
            } else {
                setError(' An error occurred during login');
            }
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen px-4 bg-white'>
            <Formik
            initialValues={InitialValues}
            validationSchema = {LoginSchema}
            onSubmit={handleSubmit}>

            {({ isSubmitting }) => (
            
                <Form className='w-full max-w-[375px] space-y-5'>
                        <h2 className = 'text-3xl font-bold text-center'>Welcome Back!</h2>

                    {/* Email */}
                    <InputField name='email' type='email' placeholder='Email' icon={<FiUser />} />
                    
                    {/*password */}
                    <div className='relative'>
                    <InputField name='password' type='password' placeholder='Password' icon={<FiLock />} />
                    <button type='button' className = 'absolute right-3 top-1/2 -translate-y-1/2 text-gray-500' onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FiEye /> : <FiEyeOff />}
                    </button>
                    </div>
                    
                    <button type = 'submit' className = 'w-full bg-pink-600 text-white py-3 rounded-md text-sm font-semibold' disabled={isSubmitting}>
                        {isSubmitting? 'Logging in...' : 'Login'}
                    </button>
                    {error && <p className='text-red-500 text-sm text-center'>{error}</p> }

                    <p className = 'text-center text-sm mt-6 text-gray-700'> Create An Account <a href='/register' className = 'text-pink-600 font-medium'> Sign Up</a></p>
                </Form>
            )}
            </Formik>
        </div>
    );
};

export default LoginForm
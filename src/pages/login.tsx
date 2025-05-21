import React, {useEffect, useState} from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { TextInputField, PasswordInputField } from '../components/InputField2'
import axios from 'axios';
import { FiUser, FiLock } from 'react-icons/fi';
import { SubmitButton } from '../components/button';
import { Card, CardHeader, CardBody, CardFooter, Heading, Flex} from '@chakra-ui/react'


interface LoginFormValues {
    email: string;
    password: string;
}

const LoginSchema=Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').matches(/[A-Z]/, 'Password must contain at least one uppercase letter and number').matches(/\d/, 'Password must contain at least one number').required('Password is required'),
})

const LoginForm : React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');

    {/* initial value for login */}
    const InitialValues = {
        email :'',
        password: ''
    }

    useEffect(() => {
        const user_id = localStorage.getItem('user_id');
        const access_token = localStorage.getItem('access_token');
        if (user_id && access_token) {
            navigate('/home');
        }
    }, [navigate]);

    const handleSubmit = async (values : LoginFormValues) => {
        try {
            const response = await axios.post('https://expected-odella-8fe2e9ce.koyeb.app/user/login', values);
            console.log ( response.data);
            const { data } = response.data;

            if (data?.user?.user_id && data?.access_token){
                localStorage.setItem('user_id', data.user.user_id.toString());
                localStorage.setItem('access_token', data.access_token);
            }
            navigate('/home');
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message || 'Login failed');
            } else {
                setError(' An error occurred during login');
            }
        }
    };

    return (
       <Flex minH="100vh" align="center" justify="center" bgPosition={'center'} px={4}>
            <Card maxW="sm" w="full" boxShadow="lg" borderRadius="xl">
                <CardHeader textAlign="center">
                    <Heading size="lg">Welcome Back!</Heading>
                </CardHeader>

            <Formik
            initialValues={InitialValues}
            validationSchema = {LoginSchema}
            onSubmit={handleSubmit}>

            {({ isSubmitting }) => (
            <Form>
                <CardBody display="flex" flexDirection="column" gap={4}>

                    {/* Email */}
                    <TextInputField name='email' placeholder='Enter Your Email' icon={<FiUser color='gray'/>}/>
                    
                    {/*password */}
                    <PasswordInputField name='password' placeholder='Enter Your Password' icon={<FiLock color='gray'/>}/>
                    
                    <SubmitButton isLoading={isSubmitting} disabled={isSubmitting} loadingText='Logging in..'>
                        Login
                    </SubmitButton>
                    {error && <p className='text-red-500 text-sm text-center'>{error}</p> }
                </CardBody>
                <CardFooter flexDirection="column" textAlign="center" gap={2}>
                    <p className = 'text-center text-sm mt-6 text-gray-700'> Create An Account <a href='/register' className = 'text-pink-600 font-medium'> Sign Up</a></p>
                </CardFooter>
                </Form>
            )}
            </Formik>
        </Card>
    </Flex>
    );
};

export default LoginForm
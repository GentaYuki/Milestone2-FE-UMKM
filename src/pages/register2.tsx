import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FiUser, FiLock, FiMail} from 'react-icons/fi';
import { TextInputField, PasswordInputField } from '../components/InputField2'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SubmitButton } from '../components/button';
import { Card, CardHeader, CardBody, CardFooter, Heading, Flex} from '@chakra-ui/react'


interface RegisterFormValues {
    name : string;
    email: string;
    password: string;
    confirmPassword: string;
}
{/* validation schema */}
const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('User Name Required'),
    email: Yup.string().email('Invalid email').required('Email Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').matches(/[A-Z]/, 'Password must contain at least one uppercase letter and number').matches(/\d/, 'Password must contain at least one number').required('Password is required'),
    confirmPassword : Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm Password Required'),
});

const RegisterForm : React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');
    
    {/* initial value for Register */}
    const InitialValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const handleSubmit = async (values : RegisterFormValues) => {
        try {
            const { name, email, password} = values;
            const response = await axios.post('https://expected-odella-8fe2e9ce.koyeb.app/user/register', {name, email, password});
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
        <Flex minH='100vh' align='center' justify='center' bgPosition={'center'} px={4}>
            <Card maxW='sm' w='full' boxShadow='lg' borderRadius ='md'>
                <CardHeader textAlign='center'>
                    <Heading size='lg'>Create Account</Heading>
                </CardHeader>

            <Formik
            initialValues={InitialValues}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit} >

            {({ isSubmitting }) => (
            <Form>
                <CardBody display='flex' flexDir='column' gap='4'>

                {/* Username */}
                <TextInputField name='name' type='text' placeholder='User Name' icon={<FiUser color='gray' />} />

                {/* Email */}
                <TextInputField name='email' type='email' placeholder='Email' icon={<FiMail color='gray' />} />

                {/*Password */}
                <PasswordInputField name='password' type='password' placeholder='Password' icon={<FiLock color='gray' />} />

                {/*Confirm Password */}
                <PasswordInputField name='confirmPassword' type='password' placeholder='Confirm Password' icon={<FiLock color='gray' />} />

                <p className='text-xs text-gray-500 text-center px-2'>By clicking the <span className='text-pink-600 font-medium'> Register </span>button, you agree to the public offer</p>
                <SubmitButton isLoading={isSubmitting} disabled={isSubmitting} loadingText='Registering...'>
                    Register
                </SubmitButton>
                {error && <p className ='text-red-500 text-sm text-center'>{error}</p>}
                
                </CardBody>

                <CardFooter flexDirection="column" textAlign="center" mt='10'>

                
                <p className='text-center text-sm text-gray-700'>
                    I Already Have an Account, <a href = '/login' className = 'text-pink-600 font-medium'>Login</a>
                </p>
                </CardFooter>
            </Form>
         )}
            </Formik>
        </Card>
    </Flex>
    );
};
export default RegisterForm
           
    
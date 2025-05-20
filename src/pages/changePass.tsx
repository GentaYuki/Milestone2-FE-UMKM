import React, {useState} from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { PasswordInputField } from "../components/InputField2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SubmitButton } from "../components/button";

interface changePasswordFormValues {
    oldPassword: string;
    password: string;
    confirmPassword: string;
}

const ChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password Required'),
    password: Yup.string().notOneOf([Yup.ref("oldPassword")], "New Password cannot be the same as the old password").required('New Password Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required("Required"),
});
const ChangePasswordForm : React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');

    const handleChangePassword = async (values: changePasswordFormValues) => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      setError("User not logged in.");
      return;
    }

    try {
        const response = await axios.get(`https://expected-odella-8fe2e9ce.koyeb.app/user/${userId}`);
        const user = response?.data?.data;
        console.log(user);

        // Check if the old password is correct
        if (!user || user.password !== values.oldPassword) {
            setError("Old password is incorrect.");
            return;
        }

        await axios.put(`https://expected-odella-8fe2e9ce.koyeb.app/user/update/${userId}`, {
            password: values.password
        });

        alert("Password changed successfully.");
        navigate("/profile");
    } catch (err) {
        setError("Something went wrong. Please try again.");
        console.error(err);
    }
};

return (
    <div className="max-w-md mx-auto px-4 py-6">
        <button onClick={() => navigate(-1)} className="flex items-center text-sm text-gray-500 mb-4 gap-1"> <span className='text-2xl'>&larr;</span>
        </button>
      <h2 className="text-center text-2xl font-bold mb-6">Change Password</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 text-sm rounded">{error}</div>
      )}

      <Formik
        initialValues={{
          oldPassword: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={ChangePasswordSchema}
        onSubmit={handleChangePassword}
      >
        <Form className="space-y-5">
          <PasswordInputField
            name="oldPassword"
            label="Old Password"
            placeholder="Enter your old password"
          />
          <PasswordInputField
            name="password"
            label="New Password"
            placeholder="Enter a new password"
          />
          <PasswordInputField
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm new password"
          />
          <SubmitButton>Change Password</SubmitButton>
        </Form>
      </Formik>
    </div>
  );
};

export default ChangePasswordForm;
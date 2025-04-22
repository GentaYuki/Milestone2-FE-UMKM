import React from 'react';
import { useField } from 'formik';


interface InputFieldProperty {
    name : string;
    type : string;
    placeholder : string;
    icon? : React.ReactNode;
}

const InputField: React.FC<InputFieldProperty> = ({ name, type, placeholder, icon }) => {
    const [field, meta] = useField(name);


    return (
    <div className="mb-4 relative">
      <input
        {...field}
        id={name}
        type={type}
        placeholder={placeholder}
        className={`w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none ${
            meta.touched && meta.error ? 'border-red-500' : 'border-gray-300'
          }`}
      />
      {icon && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
          {icon}
        </span>
      )}
      
      {meta.touched && meta.error && ( 
        <p className='text-red-500 text-sm mt-1'>{meta.error}</p>
      )}
      
    </div>
    );
};

export default InputField;
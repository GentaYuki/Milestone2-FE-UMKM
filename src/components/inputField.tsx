import React from 'react';
import { useField } from 'formik';


interface InputFieldProperty {
    name : string;
    type : string;
    placeholder : string;
    icon? : React.ReactNode;
    options? : {label:string ; value: string}[];
}

const InputField: React.FC<InputFieldProperty> = ({ name, type, placeholder, icon, options }) => {
    const [field, meta] = useField(name);

    const hasError = meta.touched && meta.error;
    return (
    <div className="relative">
      <div className={`flex items-center border rounded-md px-3 py-2 ${hasError ? 'border-red-500' : 'border-gray-300'} bg-white`}>

      {icon && <span className="text-gray-500 mr-2">{icon}</span>}

      {type === 'select' && options ? (
          <select
            {...field}
            id={name}
            className="w-full bg-transparent focus:outline-none text-sm text-left"
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            className="w-full bg-transparent focus:outline-none text-sm text-left pr-10"
          />
        )}
      </div>
      {hasError && <p className="text-red-500 text-xs mt-1 ml-1">{meta.error}</p>}
    </div>
  );
};


export default InputField;
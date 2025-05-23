import React , {useState}from "react";
import { Input, InputGroup,InputLeftElement, InputRightElement, Button, FormControl, FormLabel, FormErrorMessage, Select} from '@chakra-ui/react'
import { Field, FieldInputProps, FormikProps, useField } from "formik";

// General Input Field (Text)
export const TextInputField = ({
    name,
    label,
    placeholder,
    type = 'text',
    icon
}: {
    name : string;
    label? : string;
    placeholder? : string;
    type?: string;
    icon? : React.ReactElement;

}) => (
    <Field name={name}>
    {({ field, form, }:{ field: FieldInputProps<string>;
      form: FormikProps<{ [key: string]: string }> }) => (
      <FormControl isInvalid={!!form.errors[name] && !!form.touched[name]}>
        {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
        <InputGroup>
        { icon && (<InputLeftElement pointerEvents="none">
              {icon}
            </InputLeftElement>
        )}
        <Input
          {...field}
          id={name}
          type={type}
          placeholder={placeholder}
        />
        </InputGroup>
        <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
      </FormControl>
    )}
  </Field>
);

// Password Input Field
export const PasswordInputField = ({
    name,
    label,
    placeholder,
    icon
}: {
    name : string;
    label? : string;
    placeholder? : string;
    type?: string;
    icon? : React.ReactElement;
}) => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
  
    return (
        <Field name={name}>
        {({ field, form }: { field: FieldInputProps<string>; 
            form: FormikProps<{ [key: string]: string }> }) => (
            <FormControl isInvalid={!!form.errors[name] && !!form.touched[name]}>
             {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
             <InputGroup size="md">
             {icon && (<InputLeftElement pointerEvents="none">
                  {icon}
                </InputLeftElement>
            )}
            <Input
              {...field}
              id={name}
              pr="4.5rem"
              type={show ? 'text' : 'password'}
              placeholder={placeholder}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

interface SelectFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  options: string[];
}

export const SelectField: React.FC<SelectFieldProps> = ({ label, options, ...props }) => {
  const [field, meta] = useField(props.name);

  return (
    <FormControl isInvalid={!!meta.error && meta.touched}>
      <FormLabel htmlFor={props.name}>{label}</FormLabel>
      <Select {...field} {...props}>
        <option value="">{props.placeholder || 'Select an option'}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};
import React from 'react';
import { Button, ButtonProps , Image} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface ChakraButtonProps extends ButtonProps {
    children: React.ReactNode;
  }

export const SubmitButton: React.FC<ChakraButtonProps> = ({ children, ...props }) => {
  return (
    <Button 
      type = 'submit'
      colorScheme='pink'
      variant='solid'
      spinnerPlacement='end'
      w='full'
      {...props}
      >
      {children}
    </Button>
  );
}

export const LogoutButton: React.FC<ChakraButtonProps> = ({ children, ...props }) => {
  return (
    <Button 
      colorScheme='red'
      variant='solid'
      w='full'
      py={3}
      fontSize="sm"
      fontWeight="semibold"
      {...props}
    >
      {children}
    </Button>
  );
};

export const BackButton: React.FC<ButtonProps> = (props) => {
  const navigate = useNavigate();

  return (
    <Button 
      variant="ghost"
      size="sm"
      onClick={() => navigate(-1)}
      position="absolute"
      top={5}
      left={5}
      zIndex={10}
      p={0}
      minW="unset"
      {...props}
    >
      <Image
        boxSize="16px"
        src="https://c.animaapp.com/m9uk4gudLbxSsP/img/vector-3.svg"
        alt="Back"
      />
    </Button>
  );
};
// components/Header.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Flex, Image, Heading, Button,
  Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalBody, ModalCloseButton,
  useDisclosure, Box
} from '@chakra-ui/react';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [profilePic, setProfilePic] = useState<string>('');

  // Fetch profile picture sekali saat mount
  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (!userId) return;
    axios.get(`https://expected-odella-8fe2e9ce.koyeb.app/user/${userId}`)
      .then(res => {
        setProfilePic(res.data.data.user_image || '');
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <Box as="header" bg="white" p={3} boxShadow="md" borderRadius="lg" mb={4}>
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={2}>
            <Image
              boxSize="32px"
              src="https://c.animaapp.com/m9sr09xvPvV0Jw/img/group-34010.png"
              alt="Logo"
            />
            <Heading size="md" color="blue.400">UMKM Connect</Heading>
          </Flex>
          <Image
            src={profilePic}
            alt="Profile"
            boxSize="40px"
            borderRadius="full"
            objectFit="cover"
            cursor="pointer"
            onClick={onOpen}
          />
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>My Shop Options</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Button
              colorScheme="blue"
              width="100%"
              mb={3}
              onClick={() => navigate('/createshop')}
            >
              Create Shop
            </Button>
            <Button
              colorScheme="teal"
              width="100%"
              onClick={() => navigate('/productlist')}
            >
              Visit My Shop
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

import { useRef } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import { createSite } from '@/lib/db';
import { useAuth } from '@/lib/auth';

function AddSiteModal({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const { register, handleSubmit } = useForm();
  const toast = useToast();
  const auth = useAuth();

  const onSubmit = ({ name, url }) => {
    const newSite = {
      author: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      url,
    };

    createSite(newSite);

    toast({
      title: 'Success!',
      description: "We've added your site.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    });

    mutate(
      '/api/sites',
      async (data) => {
        return { sites: [...data.sites, newSite] };
      },
      false
    );

    onClose();
  };

  return (
    <>
      <Button
        backgroundColor='gray.900'
        color='white'
        fontWeight='medium'
        _hover={{ bg: 'gray.700' }}
        _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}
        onClick={onOpen}
      >
        {children}
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as='form' onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader fontWeight='bold'>Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                ref={register({
                  required: 'Required',
                })}
                placeholder='My site'
                name='name'
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                placeholder='https://website.com'
                name='url'
                ref={register({
                  required: 'Required',
                })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight='medium'>
              Cancel
            </Button>
            <Button
              backgroundColor='#99FFEE'
              color='#194d4c'
              fontWeight='medium'
              type='submit'
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddSiteModal;

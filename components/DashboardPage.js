import {
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  Link,
  Stack,
} from '@chakra-ui/react';
import React from 'react';
import { Logo } from '@/icons/logo';
import { useAuth } from '@/lib/auth';
import AddSiteModal from './AddSiteModal';

const DashboardPage = ({ children }) => {
  const auth = useAuth();

  return (
    <Flex flexDirection='column'>
      <Flex
        backgroundColor='white'
        alignItems='center'
        justifyContent='space-between'
        px={8}
        py={4}
      >
        <Stack isInline spacing={4} align='center'>
          <Logo color='black.300' boxSize={16} />
          <Link>Feedback</Link>
          <Link>Sites</Link>
        </Stack>
        <Flex alignItems='center'>
          <Link mr={4}>Account</Link>
          <Avatar
            size='sm'
            src={auth?.user?.photoUrl}
            name={auth?.user?.name}
          />
        </Flex>
      </Flex>
      <Flex backgroundColor='gray.100' p={8} height='100vh'>
        <Flex
          maxW='800px'
          ml='auto'
          mr='auto'
          flexDirection='column'
          width='100%'
        >
          <Breadcrumb>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color='grey.700' fontSize='sm'>
                Sites/
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex justifyContent='space-between'>
            <Heading color='black' mb={4}>
              Sites
            </Heading>
            <AddSiteModal>Add site</AddSiteModal>
          </Flex>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardPage;

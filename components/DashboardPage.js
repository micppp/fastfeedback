import React from 'react';
import { Avatar, Button, Flex, Link, Stack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { Logo } from '@/icons/logo';
import { useAuth } from '@/lib/auth';

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
          <NextLink href='/dashboard' passHref>
            <Link>Sites</Link>
          </NextLink>
          <NextLink href='/feedback' passHref>
            <Link>Feedback</Link>
          </NextLink>
        </Stack>
        <Flex alignItems='center'>
          <Button
            marginRight={4}
            variant='outline'
            size='md'
            onClick={(e) => auth.signOut()}
          >
            Sign Out
          </Button>
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
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardPage;

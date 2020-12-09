import Head from 'next/head';
import { Button, Flex } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';
import { Logo } from '@/icons/logo';

export default function Home() {
  const auth = useAuth();

  return (
    <>
      <Head>
        <title>Fast Feedback</title>
      </Head>
      <Flex
        as='main'
        direction='column'
        align='center'
        justify='center'
        height='100vh'
      >
        <Logo color='blue.300' boxSize={32} marginBottom={4} />

        {auth.user ? (
          <Button variant='outline' size='md' onClick={(e) => auth.signOut()}>
            Sign Out
          </Button>
        ) : (
          <Button
            variant='outline'
            size='md'
            onClick={(e) => auth.signInWithGithub()}
          >
            Sign In
          </Button>
        )}
      </Flex>
    </>
  );
}

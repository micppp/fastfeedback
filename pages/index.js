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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
                window.location.href = "/dashboard"
              }
            `,
          }}
        />
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
          <Flex>
            <Button
              as='a'
              href='/dashboard'
              backgroundColor='gray.900'
              color='white'
              fontWeight='medium'
              marginRight={2}
              maxW='200px'
              _hover={{ bg: 'gray.700' }}
              _active={{
                bg: 'gray.800',
                transform: 'scale(0.95)',
              }}
            >
              View Dashboard
            </Button>
            <Button variant='outline' size='md' onClick={(e) => auth.signOut()}>
              Sign Out
            </Button>
          </Flex>
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

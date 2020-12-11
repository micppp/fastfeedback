import Head from 'next/head';
import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';
import { Logo } from '@/icons/logo';
import { GitHubLogo } from '@/icons/github';
import { GoogleLogo } from '@/icons/google';

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
        maxW='800px'
        margin='0 auto'
        padding='0 1rem;'
      >
        <Logo color='blue.300' boxSize={32} />
        <Text my={4} color='grey.900'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          iaculis elit a venenatis fermentum. Ut vel tincidunt nibh. Maecenas
          ultricies augue quis nunc imperdiet pharetra. Nam ullamcorper diam
          eget volutpat ultrices. Aliquam eleifend, purus ut cursus auctor,
          lacus turpis dignissim felis, et porta urna nisl at nisl. Vestibulum
          suscipit arcu in ultricies ultrices. Suspendisse arcu arcu, porttitor
          id commodo eu.
        </Text>
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
            <Button size='md' onClick={(e) => auth.signOut()}>
              Sign Out
            </Button>
          </Flex>
        ) : (
          <Stack>
            <Button
              backgroundColor='gray.900'
              color='white'
              fontWeight='medium'
              size='lg'
              width='full'
              _hover={{ bg: 'gray.700' }}
              _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}
              onClick={(e) => auth.signInWithGithub()}
              leftIcon={<GitHubLogo />}
              marginRight={6}
            >
              Sign In with Github
            </Button>
            <Button
              backgroundColor='white'
              color='gray.900'
              size='lg'
              variant='outline'
              fontWeight='medium'
              _hover={{ bg: 'gray.100' }}
              _active={{ bg: 'gray.200', transform: 'scale(0.95)' }}
              onClick={(e) => auth.signInWithGoogle()}
              leftIcon={<GoogleLogo />}
            >
              Sign In with Google
            </Button>
          </Stack>
        )}
      </Flex>
    </>
  );
}

import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/styles/theme';
import { AuthProvider } from '@/lib/auth';

function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      <style global jsx>{`
        body {
          background-color: #edf2f7;
        }
      `}</style>
    </ChakraProvider>
  );
}

export default App;

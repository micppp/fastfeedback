import { extendTheme } from '@chakra-ui/react';

const fonts = {
  body: `Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
};

const fontWeights = {
  normal: 400,
  medium: 600,
  bold: 700,
};

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

const theme = extendTheme({ colors, fonts, fontWeights });

export default theme;

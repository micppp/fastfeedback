import React from 'react';
import { Box, Heading, Text, Divider } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';

const Feedback = ({ author, text, createdAt }) => (
  <Box borderRadius={4} maxW='700px' w='100%'>
    <Heading size='sm' as='h3' mb={0} color='black.900'>
      {author}
    </Heading>
    <Text color='gray.500' mb={4} fontSize='sm'>
      {format(parseISO(createdAt), 'PPpp')}
    </Text>
    <Text color='grey.800' mb={8}>
      {text}
    </Text>
    <Divider borderColor='gray.200' backgroundColor='black.900' mb={8} />
  </Box>
);

export default Feedback;

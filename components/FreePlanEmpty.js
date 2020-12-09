import React from 'react';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import DashboardPage from './DashboardPage';

const FreePlanEmpty = () => (
  <DashboardPage>
    <Box
      width='100%'
      backgroundColor='white'
      justifyContent='center'
      alignItems='center'
      p={8}
      borderRadius='8px'
    >
      <Heading size='md'>Get feedback on your site instantly</Heading>
      <Text>Start today, then grow with us</Text>
      <Button>Upgrade to Starter</Button>
    </Box>
  </DashboardPage>
);

export default FreePlanEmpty;

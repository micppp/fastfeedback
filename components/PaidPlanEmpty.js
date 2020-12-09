import React from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import AddSiteModal from './AddSiteModal';

const PaidPlanEmpty = () => (
  <Flex
    width='100%'
    backgroundColor='white'
    justifyContent='center'
    alignItems='center'
    p={16}
    borderRadius='8px'
    flexDirection='column'
  >
    <Heading size='lg' mb={2}>
      You haven't added any sites.
    </Heading>
    <Text mb={4}>Welcome! 👋 lets get started</Text>
    <AddSiteModal>Add your first site</AddSiteModal>
  </Flex>
);

export default PaidPlanEmpty;

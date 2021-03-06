import React from 'react';
import { Box, Code, Switch } from '@chakra-ui/react';
import { Table, Tr, Th, Td } from './Table';
import RemoveButton from '@/components/RemoveButton';

const FeedbackTable = ({ allFeedback }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Feeback</Th>
          <Th>Route</Th>
          <Th>Visible</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {allFeedback.map((feedback) => (
          <Box as='tr' key={feedback.id}>
            <Td fontWeight='medium'>{feedback.author}</Td>
            <Td>{feedback.text}</Td>
            <Td>
              <Code>/</Code>
            </Td>
            <Td>
              <Switch
                defaultIsChecked={feedback.status === 'active'}
                colorScheme='green'
              />
            </Td>
            <Td>
              <RemoveButton id={feedback.id} />
            </Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default FeedbackTable;

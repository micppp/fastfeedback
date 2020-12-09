import React from 'react';
import { Box, Link } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import { Table, Tr, Th, Td } from './Table';

const SiteTable = ({ sites }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Feedback Link</Th>
          <Th>Date Added</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {sites.map(({ createdAt, name, url }) => (
          <Box as='tr' key={url}>
            <Td fontWeight='medium'>{name}</Td>
            <Td>{url}</Td>
            <Td>
              <Link>View Feedback</Link>
            </Td>
            <Td>{format(parseISO(createdAt), 'PPpp')}</Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default SiteTable;
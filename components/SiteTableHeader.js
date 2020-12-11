import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
} from '@chakra-ui/react';

import AddSiteModal from './AddSiteModal';

const SiteTableHeader = ({ breadcrumb, title }) => (
  <>
    <Breadcrumb>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink color='grey.700' fontSize='sm'>
          {breadcrumb}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
    <Flex justifyContent='space-between'>
      <Heading color='black' mb={4}>
        {title}
      </Heading>
      <AddSiteModal>Add site</AddSiteModal>
    </Flex>
  </>
);

export default SiteTableHeader;

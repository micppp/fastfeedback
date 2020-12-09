import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

import Feedback from '@/components/Feedback';
import { useAuth } from '@/lib/auth';
import { getAllFeedback, getAllSites } from '@/lib/db-admin';
import { createFeedback } from '@/lib/db';

export async function getStaticProps(context) {
  const { siteId } = context.params;
  const { feedback } = await getAllFeedback(siteId);

  return {
    props: {
      initialFeedback: feedback,
    },
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();
  const paths = sites.map((site) => ({
    params: { siteId: site.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

const SiteFeedback = ({ initialFeedback }) => {
  const auth = useAuth();
  const router = useRouter();
  const inputElement = useRef(null);
  const [allFeedback, setAllFeedback] = useState(initialFeedback);

  const onSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      id: uuidv4(),
      author: auth.user.name,
      authorId: auth.user.uid,
      siteId: router.query.siteId,
      text: inputElement.current.value,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: 'pending',
    };

    setAllFeedback([...allFeedback, newFeedback]);

    createFeedback(newFeedback);
  };

  return (
    <Box
      as='form'
      display='flex'
      flexDirection='column'
      margin='0 auto'
      maxW='700px'
      onSubmit={onSubmit}
      width='full'
    >
      <FormControl my={8}>
        <FormLabel htmlFor='comment'>Comments</FormLabel>
        <Input
          type='text'
          name='comment'
          id='comment'
          mb={2}
          ref={inputElement}
        />
        <Button type='submit' fontWeight='medium'>
          Add Comment
        </Button>
      </FormControl>
      {allFeedback.map((feedback) => (
        <Feedback key={feedback.id} {...feedback} />
      ))}
    </Box>
  );
};

export default SiteFeedback;

import React, { useContext } from 'react';
import { Container, Text } from '@chakra-ui/react';
import { SiteContext } from '../../../context/SiteContext';
import { motion } from 'framer-motion';

const Conversation: React.FC = () => {
  const { currentPrompt, currentResponse, isResponseLoading } =
    useContext<any>(SiteContext);
  return (
    <>
      <Container variant='sentMessage'>{currentPrompt}</Container>
      {isResponseLoading ? (
        <Container variant='replyMessage'>
          <motion.p
            animate={{ translateY: '2px' }}
            transition={{
              ease: 'backInOut',
              duration: .66,
              repeat: Infinity,
              delay: 0
            }}
          >
            .
          </motion.p>
          <motion.p
            animate={{ translateY: '2px' }}
            transition={{
              ease: 'backInOut',
              duration: .66,
              repeat: Infinity,
              delay: .22
            }}
          >
            .
          </motion.p>
          <motion.p
            animate={{ translateY: '2px' }}
            transition={{
              ease: 'backInOut',
              duration: .66,
              repeat: Infinity,
              delay: .44
            }}
          >
            .
          </motion.p>
        </Container>
      ) : (
        <Container variant='replyMessage'>{currentResponse}</Container>
      )}
    </>
  );
};

export default Conversation;

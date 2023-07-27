import React, { useContext, useState } from 'react';
import {
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  Textarea
} from '@chakra-ui/react';
import { SiteContext } from '../../../context/SiteContext';
import { createChatRequest, removeTokensByUserId } from '../../../api';
import { ChatWindowProps } from '../../../models/props';

const StartChat: React.FC<ChatWindowProps> = ({ setWindowState }) => {
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState('');

  const {
    setCurrentRequest,
    setCurrentResponse,
    setIsResponseLoading,
    userInfo
  } = useContext<any>(SiteContext);

  const handleSubmit = async () => {
    if (!prompt.length) {
      return setError('Invalid Request');
    }
    setIsResponseLoading(true);
    (
      document.getElementById('start-chat-container')! as HTMLDivElement
    ).style.opacity = '0';
    setTimeout(() => {
      setWindowState('conversation');
    }, 1000);
    setCurrentRequest(prompt);
    const response = await createChatRequest([
      {
        role: 'system',
        content:
          'You are my assistant. Adapt the behaviors of a cat. All replies should contain meowing, purring, and other cat behaviors. Refer to yourself as Cat-GPT'
      },
      { role: 'user', content: prompt }
    ]);
    if (!response.data) return;

    let abort = false;
    const abortController = setTimeout(() => {
      abort = true;
    }, 30000);
    if (response.data.error || abort) {
      console.log(response.error);
      setIsResponseLoading(false);
      setCurrentResponse('Unknown error, taking you back...');
      setTimeout(() => {
        setWindowState('start chat');
      }, 1000);
    }
    if (response.data.success && userInfo.id) {
      clearTimeout(abortController);
      setCurrentResponse(response.data.success);
      setIsResponseLoading(false);
      const tokens = await removeTokensByUserId(userInfo.id);
      userInfo.tokens = tokens;
    }
  };

  return (
    <Stack
      id='start-chat-container'
      opacity='1'
      transition='opacity .75s ease-out'
      w={['100%', '640px']}
      h='100%'
      align='center'
    >
      <Heading textAlign='left' variant='chatHeading'>
        New Request
      </Heading>
      <Stack w='100%' pt='2rem' align='center' gap='2rem'>
        <Stack w='100%' align='center' justify='space-between' gap='.5rem'>
          <Text
            whiteSpace='nowrap'
            w={['100%', '50%', '480px']}
            textAlign='left'
            variant='newChatLabel'
          >
            Request:
          </Text>
          <Textarea
            _focus={{
              border: '1px solid #57CC99 !important',
              transition: 'border-color .2s ease-in-out'
            }}
            _placeholder={{
              color: '#FFFFFF75'
            }}
            fontFamily='Inter, sans-serif'
            color='#FFFFFF'
            h={['10rem', '10rem', '7.25rem']}
            w={['100%', '50%', '480px']}
            placeholder="ex. 'Explain quantum computing in simple terms'"
            onChange={(e) => setPrompt(e.target.value)}
          />
        </Stack>
        <Flex w='100%' justify='center'>
          <Button w={['100%', '10rem']} onClick={handleSubmit}>
            {error.length ? error : 'Send'}
          </Button>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default StartChat;

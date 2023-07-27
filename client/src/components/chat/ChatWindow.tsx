import React, { useState } from 'react';
import { Stack } from '@chakra-ui/react';
import { ChatState } from '../../models/types';
import StartChat from './WindowStates/StartChat';
import Conversation from './WindowStates/Conversation';
import { ChatWindowProps } from '../../models/props';

const ChatWindow: React.FC<ChatWindowProps> = ({
  setWindowState,
  windowState
}) => {
  return (
    <Stack flexGrow='1' p={['2.5rem', '4rem']} align='center' minW='0'>
      {windowState === 'start chat' ? (
        <StartChat setWindowState={setWindowState} />
      ) : windowState === 'conversation' ? (
        <Conversation />
      ) : null}
    </Stack>
  );
};

export default ChatWindow;

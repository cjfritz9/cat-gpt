import React, { useContext, useEffect, useState } from 'react';
import { Flex, useMediaQuery } from '@chakra-ui/react';
import SideBar from '../chat/SideBar';
import ChatWindow from '../chat/ChatWindow';
import { useNavigate } from 'react-router-dom';
import { SiteContext } from '../../context/SiteContext';
import { ChatState } from '../../models/types';

const Chat: React.FC = () => {
  const [windowState, setWindowState] = useState<ChatState>('start chat');
  const { isLoggedIn } = useContext<any>(SiteContext);

  const [isLessThan600] = useMediaQuery('(max-width: 600px)');

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn]);

  return (
    <Flex flexDir={isLessThan600 ? 'column' : 'row'} overflowX='hidden'>
      <SideBar setWindowState={setWindowState} />
      <ChatWindow setWindowState={setWindowState} windowState={windowState} />
    </Flex>
  );
};

export default Chat;

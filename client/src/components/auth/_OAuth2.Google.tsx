import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Container,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  Input,
  Spinner,
  Stack,
  Text
} from '@chakra-ui/react';
import { verifyGoogleAuth } from '../../api';
import { SiteContext } from '../../context/SiteContext';
import { useNavigate } from 'react-router-dom';

const GoogleAuth: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLoggedIn, setUserInfo } = useContext<any>(SiteContext);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const user = await verifyGoogleAuth();
      setIsLoggedIn(user.loggedIn);
      setUserInfo(user.userInfo);
      setIsLoading(true);
      setTimeout(() => {
        navigate('/chat');
        setIsLoading(false);
      }, 1000);
    })();
  }, []);

  return (
    <Container w='100%' h='100%' justifyContent='center' alignItems='center'>
      <Stack
        opacity={isLoading ? '0' : '1'}
        transition='opacity .75s ease-out'
        boxShadow='0 0 5px #38A3A5'
        py='4rem'
        px={['0rem', '3rem']}
        align='center'
        borderRadius='5px'
        w={['100%', '100%', '100%', '520px']}
        h={['100%', '100%', '100%', 'fit-content']}
        minH='50dvh'
        bgColor='Brand.Malachite.99'
        gap='2rem'
        justifyContent={['top', 'center']}
      >
        <Stack justifyContent='center' alignItems='center' minH='400px'>
          <Spinner />
        </Stack>
      </Stack>
    </Container>
  );
};

export default GoogleAuth;

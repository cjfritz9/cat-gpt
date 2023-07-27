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

const GoogleAuth: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLoggedIn, setUserInfo } = useContext<any>(SiteContext);

  useEffect(() => {
    (async () => {
      const user = await verifyGoogleAuth();
      console.log('user data in component', user);
      console.log('logged in - component: ', user.loggedIn);
      console.log('userInfo - component: ', user.userInfo);
      setIsLoggedIn(user.loggedIn);
      setUserInfo(user.userInfo);
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
        <Heading variant='authHeading'>Creating Account</Heading>
        <Spinner />
      </Stack>
    </Container>
  );
};

export default GoogleAuth;

import React, { KeyboardEvent, useContext, useState, useEffect } from 'react';
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
import { validateLoginInputs } from '../../utils/helpers';
import { loginUser, fetchUserById } from '../../api';
import { LoginRegisterProps } from '../../models/props';
import { SiteContext } from '../../context/SiteContext';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const Login: React.FC<LoginRegisterProps> = ({ setFormState }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const { isLoading, setIsLoading, setIsLoggedIn, setUserInfo } =
    useContext<any>(SiteContext);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setIsLoggedIn(true);
    setSuccess(true);
    setIsLoading(true);
    setTimeout(() => {
      navigate('/chat');
      setIsLoading(false);
    }, 1000);
  };

  const enterSubmit = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsFetching(true);
    const validationResponse = validateLoginInputs(
      formData.email,
      formData.password
    );
    if (validationResponse !== 'valid inputs') {
      setIsFetching(false);
      return setError(validationResponse);
    }
    const response = await loginUser(formData);

    if (response) {
      if (typeof response !== 'string') {
        if (response.email === formData.email) {
          setUserInfo(response);
          handleSuccess();
        }
      }
      if (response.error) {
        setIsFetching(false);
        if (response.error == 'Database Error: Check logs') {
          setError('DB Error: Contact Developer');
        } else {
          setError(response.error.slice(7));
        }
      }
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = '/api/auth/google/callback';
  };

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (userId && userId.length) {
      const fetchData = async () => {
        const userData = await fetchUserById(userId);
        if (userData.error) return;
        setUserInfo(userData);
        handleSuccess();
      };
      fetchData();
    }
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
        bgColor='Brand.Malachite.99'
        gap='2rem'
        justifyContent={['top', 'center']}
      >
        <Heading variant='authHeading'>Login</Heading>
        <Stack w='75%' gap='1rem'>
          <Stack>
            <Text variant='authLabel'>Email Address</Text>
            <Input
              _focus={{ border: '2px solid #DDD', boxShadow: 'none' }}
              onFocus={() => setError('')}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </Stack>
          <Stack>
            <Text variant='authLabel'>Password</Text>
            <Input
              _focus={{ border: '2px solid #DDD', boxShadow: 'none' }}
              type='password'
              onFocus={() => setError('')}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              onKeyDown={(e) => enterSubmit(e)}
            />
          </Stack>
          <Button
            isDisabled={error.length ? true : false}
            w='100%'
            bgColor='#EEE'
            color={error.length ? 'red' : 'Brand.Agate.Reg'}
            onClick={handleSubmit}
          >
            {success ? (
              'Login Successful'
            ) : error.length ? (
              error
            ) : isFetching ? (
              <Spinner />
            ) : (
              'Submit'
            )}
          </Button>
          <HStack>
            <Divider borderColor='white' />
            <Text color='white'>OR</Text>
            <Divider borderColor='white' />
          </HStack>
          <Button
            w='100%'
            bgColor='#EEE'
            color='Brand.Agate.Reg'
            onClick={handleGoogleAuth}
          >
            <HStack gap='.5rem'>
              <Icon as={FcGoogle} />
              <Text>Log in with Google</Text>
            </HStack>
          </Button>
          <Flex gap='4px' color='#EEE'>
            <Text>Need an account?</Text>
            <Text
              _hover={{ color: 'white' }}
              cursor='pointer'
              color='#EEE'
              textDecor='underline'
              onClick={() => setFormState('register')}
            >
              Sign up.
            </Text>
          </Flex>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Login;

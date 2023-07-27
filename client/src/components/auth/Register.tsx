import React, { KeyboardEvent, useContext, useState } from 'react';
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
import { FcGoogle } from 'react-icons/fc';
import { validateRegistrationInputs } from '../../utils/helpers';
import { registerUser } from '../../api';
import { LoginRegisterProps } from '../../models/props';
import { SiteContext } from '../../context/SiteContext';
import { useNavigate } from 'react-router-dom';

const Register: React.FC<LoginRegisterProps> = ({ setFormState }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPass: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const { isLoading, setIsLoading, setIsLoggedIn, setUserInfo } =
    useContext<any>(SiteContext);
  const navigate = useNavigate();

  const BASE_URL =
    process.env.NODE_ENV === 'development'
      ? 'https://localhost:8080'
      : 'https://cat-gpt-5wee52lw2a-uc.a.run.app';

  const handleSuccess = () => {
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
    const validationResponse = validateRegistrationInputs(
      formData.email,
      formData.password,
      formData.confirmPass
    );
    if (validationResponse !== 'valid inputs') {
      return setError(validationResponse);
    }
    const response = await registerUser({
      email: formData.email,
      password: formData.password
    });

    if (response) {
      if (typeof response !== 'string') {
        if (response.email === formData.email) {
          setUserInfo(response);
          setIsLoggedIn(true);
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
    window.location.href = BASE_URL + '/api/auth/google/callback';
  };

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
        <Heading variant='authHeading'>Register</Heading>
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
            />
          </Stack>
          <Stack>
            <Text variant='authLabel'>Confirm Password</Text>
            <Input
              _focus={{ border: '2px solid #DDD', boxShadow: 'none' }}
              type='password'
              onFocus={() => setError('')}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  confirmPass: e.target.value
                }))
              }
              onKeyDown={(e: KeyboardEvent) => enterSubmit(e)}
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
              'Registration Successful'
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
              <Text>Sign up with Google</Text>
            </HStack>
          </Button>
          <Flex gap='4px' color='#EEE'>
            <Text>Have an account?</Text>
            <Text
              _hover={{ color: 'white' }}
              cursor='pointer'
              color='#EEE'
              textDecor='underline'
              onClick={() => setFormState('login')}
            >
              Log in.
            </Text>
          </Flex>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Register;

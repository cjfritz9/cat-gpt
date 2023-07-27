import React, { useContext, useState } from 'react';
import { Container } from '@chakra-ui/react';
import Login from '../auth/Login';
import Register from '../auth/Register';
import { SiteContext } from '../../context/SiteContext';

const LoginRegister: React.FC = () => {
  const [formState, setFormState] = useState<'login' | 'register'>('login');

  return (
    <Container w='100dvw' h='100dvh' minH='100dvh'>
      {formState === 'login' ? (
        <Login setFormState={setFormState} />
      ) : (
        <Register setFormState={setFormState} />
      )}
    </Container>
  );
};

export default LoginRegister;

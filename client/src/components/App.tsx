import { Stack } from '@chakra-ui/react';
import { Route, Routes, useRoutes } from 'react-router-dom';
import Chat from './pages/Chat';
import LoginRegister from './pages/LoginRegister';

const App: React.FC = () => {
  return (
    <Stack
      className='App'
      minW='100dvw'
      maxW='100dvw'
      minH='100dvh'
      maxH='100dvh'
      bgColor='Brand.Agate.99'
    >
      <Routes>
        <Route path='/' element={<LoginRegister />} />
        <Route path='/login' element={<LoginRegister />} />
        <Route path='/register' element={<LoginRegister />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </Stack>
  );
};

export default App;

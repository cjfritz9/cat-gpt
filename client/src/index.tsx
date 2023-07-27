import ReactDOM from 'react-dom/client';
import App from './components/App';
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/ThemeExtension';
import { BrowserRouter as Router } from 'react-router-dom';
import SiteProvider from './context/SiteContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLDivElement
);
root.render(
  <SiteProvider>
    <ChakraProvider theme={theme}>
      <Router>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Router>
    </ChakraProvider>
  </SiteProvider>
);

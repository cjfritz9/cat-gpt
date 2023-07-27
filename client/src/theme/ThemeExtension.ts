import { extendTheme } from '@chakra-ui/react';
import * as Theme from './StyleConfig';

const theme = extendTheme({
  components: {
    // TODO: Default component themes go here
    Button: Theme.button,
    Container: Theme.container,
    Heading: Theme.heading,
    Input: Theme.input,
    Link: Theme.link,
    Text: Theme.text
  },
  colors: {
    Brand: {
      Agate: {
        33: '#22577A33',
        66: '#22577A66',
        99: '#28668F',
        Reg: '#22577A'
      },
      Verdigris: {
        33: '#38A3A533',
        66: '#38A3A566',
        99: '#38A3A599',
        Reg: '#38A3A5'
      },
      Malachite: {
        33: '#57CC9933',
        66: '#57CC9966',
        99: '#57CC9999',
        Reg: '#57CC99'
      },
      AppleGreen: {
        33: '#80ED9933',
        66: '#80ED9966',
        99: '#80ED9999',
        Reg: '#80ED99'
      },
      Willow: {
        33: '#C7F9CC33',
        66: '#C7F9CC66',
        99: '#C7F9CC99',
        Reg: '#C7F9CC'
      }
    }
  }
});

export default theme;

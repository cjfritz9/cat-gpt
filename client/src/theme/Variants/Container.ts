import { defineStyle } from '@chakra-ui/react';

export const chatWindow = defineStyle({
  flexGrow: 1,
  minW: '50%',
  w: '100%',
  h: '100%',
  p: '4rem'
});

export const sentMessage = defineStyle({
  borderRadius: '10px',
  w: 'fit-content',
  minW: '0',
  maxW: '80%',
  mt: '.5rem !important',
  px: '1.25rem !important',
  py: '.5rem !important',
  bgColor: 'lightgrey',
  color: 'black',
  fontSize: '16px',
  fontWeight: 600,
  fontFamily: 'Montserrat',
  textAlign: 'left',
  textShadow: '0 0 10px #FFFFFF25',
  alignSelf: 'flex-end'
});

export const replyMessage = defineStyle({
  borderRadius: '10px',
  w: 'fit-content',
  minW: '0',
  maxW: '80%',
  mt: '1rem !important',
  px: '1.25rem !important',
  py: '.5rem !important',
  bgColor: 'Brand.Malachite.Reg',
  color: 'black',
  fontSize: '16px',
  fontWeight: 600,
  fontFamily: 'Montserrat',
  textAlign: 'left',
  textShadow: '0 0 10px #FFFFFF25',
  alignSelf: 'flex-start'
});

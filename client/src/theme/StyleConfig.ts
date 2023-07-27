import { defineStyle, defineStyleConfig } from '@chakra-ui/react';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { newChat, chatHistory } from './Variants/Link';
import { sidebarText, newChatLabel, authLabel } from './Variants/Text';
import { chatWindow, sentMessage, replyMessage } from './Variants/Container';
import { chatHeading, authHeading } from './Variants/Heading';
import { inputAnatomy } from '@chakra-ui/anatomy';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const buttonBase = defineStyle({
  _hover: {
    filter: 'brightness(1.1)',
    bgColor: 'white !important'
  },
  fontFamily: 'Inter, sans-serif',
  bgColor: 'Brand.Willow.Reg',
  color: 'Brand.Agate.Reg',
  w: '8rem'
});

const containerBase = defineStyle({
  display: 'flex',
  flexDir: 'row',
  minW: '100dvw',
  m: '0',
  p: '0'
});

const linkBase = defineStyle({
  _hover: {
    textDecor: 'none'
  },
  textAlign: 'center',
  fontSize: ['12px', '14px'],
  color: 'Brand.AppleGreen.Reg',
  textTransform: 'uppercase',
  fontFamily: 'Montserrat, sans-serif'
});

const inputBase = definePartsStyle({
  field: {
    _focus: {
      border: '1px solid #57CC99 !important',
      transition: 'border-color .2s ease-in-out'
    },
    _placeholder: { color: '#FFFFFF75' },
    fontFamily: 'Inter, sans-serif',
    color: '#FFFFFF'
  }
});

export const button = defineStyleConfig({
  baseStyle: buttonBase
});

export const container = defineStyleConfig({
  baseStyle: containerBase,
  variants: { chatWindow, sentMessage, replyMessage }
});

export const heading = defineStyleConfig({
  variants: { chatHeading, authHeading }
});

export const input = defineMultiStyleConfig({
  baseStyle: inputBase
});

export const link = defineStyleConfig({
  baseStyle: linkBase,
  variants: { newChat, chatHistory }
});

export const text = defineStyleConfig({
  variants: { sidebarText, newChatLabel, authLabel }
});

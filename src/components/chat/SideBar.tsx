import React from 'react';
import {
  Container,
  Divider,
  Flex,
  Stack,
  Link,
  Icon,
  Text
} from '@chakra-ui/react';
import {
  TbCoins,
  TbQuestionCircle,
  TbBrandHipchat,
  TbBrandWechat
} from 'react-icons/tb';
import { CgProfile } from 'react-icons/cg';

const SideBar: React.FC = () => {
  return (
    <Stack
      bgColor='Brand.Agate.Reg'
      h='100dvh'
      minW='320px'
      justify='space-between'
      align='left'
      py='2rem'
      boxShadow='2px 0 2px #22577A'
    >
      <Stack align='center' w='100%'>
        <Flex
          _hover={{ bgColor: 'Brand.Agate.99' }}
          px='1rem'
          py='.5rem'
          borderRadius='2px'
          as={Link}
          variant='newChat'
          justify='flex-start'
          w='90%'
          align='center'
        >
          <Icon mr='1rem' color='white' as={TbBrandHipchat} />
          <Text>New Chat</Text>
        </Flex>
        <Divider mb='1.5rem' w='90%' />
        <Text variant='sidebarText'>History</Text>
        <Flex
          _hover={{ bgColor: 'Brand.Agate.99' }}
          px='1rem'
          py='.5rem'
          borderRadius='2px'
          as={Link}
          variant='chatHistory'
          justify='flex-start'
          w='90%'
          align='center'
        >
          <Icon mr='1rem' color='white' as={TbBrandWechat} />
          <Text fontStyle='italic'>Coming soon...</Text>
        </Flex>
      </Stack>
      <Stack align='center' w='100%'>
        <Divider mb='1.5rem' w='90%' />
        <Stack w='90%'>
          <Flex
            as={Link}
            _hover={{ bgColor: 'Brand.Agate.99' }}
            px='1rem'
            py='.5rem'
            borderRadius='2px'
            justify='flex-start'
            w='100%'
            align='center'
          >
            <Icon mr='1rem' color='Brand.AppleGreen.Reg' as={TbCoins} />
            <Text>tokens: {10}</Text>
          </Flex>
          <Flex
            as={Link}
            _hover={{ bgColor: 'Brand.Agate.99' }}
            px='1rem'
            py='.5rem'
            borderRadius='2px'
            justify='flex-start'
            w='100%'
            align='center'
          >
            <Icon mr='1rem' color='Brand.AppleGreen.Reg' as={CgProfile} />
            <Text>account </Text>
          </Flex>
          <Flex
            as={Link}
            _hover={{ bgColor: 'Brand.Agate.99' }}
            px='1rem'
            py='.5rem'
            borderRadius='2px'
            justify='flex-start'
            w='100%'
            align='center'
          >
            <Icon
              mr='1rem'
              color='Brand.AppleGreen.Reg'
              as={TbQuestionCircle}
              fontSize='18px'
            />
            <Text>about</Text>
          </Flex>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SideBar;

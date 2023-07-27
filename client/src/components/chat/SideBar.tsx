import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  Divider,
  Flex,
  Stack,
  Link,
  Icon,
  Text,
  useMediaQuery
} from '@chakra-ui/react';
import {
  TbCoins,
  TbCoffee,
  TbBrandHipchat,
  TbBrandWechat,
  TbPlus,
  TbMenu2,
  TbX,
  TbRefresh
} from 'react-icons/tb';
import { CgProfile } from 'react-icons/cg';
import { SiteContext } from '../../context/SiteContext';
import { refreshTokensByUserId } from '../../api';
import { ChatWindowProps } from '../../models/props';

const SideBar: React.FC<ChatWindowProps> = ({ setWindowState }) => {
  const { userInfo, setUserInfo, setIsLoggedIn } = useContext<any>(SiteContext);
  const [tokenError, setTokenError] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [isLessThan600, isLessThan900] = useMediaQuery([
    '(max-width: 600px)',
    '(max-width: 900px)'
  ]);

  const attemptTokenRefresh = async () => {
    const response = await refreshTokensByUserId(userInfo.id);
    if (response.error) {
      setTokenError('Try Again Tomorrow');
      setTimeout(() => {
        setTokenError('');
      }, 2500);
    } else {
      if (response && response.user) {
        setUserInfo(response.user);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    setShowLogoutConfirmation(false);
    setIsLoggedIn(false);
  };

  return (
    <>
      {isLessThan600 ? (
        <Stack onMouseLeave={() => setShowMenu(false)}>
          <Flex
            w='100%'
            h='72px'
            bgColor='Brand.Malachite.Reg'
            justify='space-between'
            align='center'
            fontSize='40px'
            px='1rem'
            color='gray.700'
          >
            <Icon
              as={showMenu ? TbX : TbMenu2}
              onClick={() => setShowMenu((prev) => !prev)}
            ></Icon>
            <Icon
              as={TbPlus}
              onClick={() => setWindowState('start chat')}
            ></Icon>
          </Flex>
          {showMenu && (
            <Stack
              pos='absolute'
              zIndex={1}
              w='100%'
              h='fit-content'
              px='.5rem'
              py='1.5rem'
              top='72px'
              bgColor='Brand.Agate.Reg'
              m='0 !important'
            >
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
                  fontSize='20px'
                  onClick={
                    !showLogoutConfirmation
                      ? () => setShowLogoutConfirmation(true)
                      : undefined
                  }
                >
                  <Icon mr='1rem' color='Brand.AppleGreen.Reg' as={CgProfile} />
                  {showLogoutConfirmation ? (
                    <Flex w='100%' justifyContent='space-between'>
                      <Text>Log Out?</Text>
                      <Flex>
                        <Text mr='1rem' onClick={handleLogout}>
                          Yes
                        </Text>
                        <Text onClick={() => setShowLogoutConfirmation(false)}>
                          No
                        </Text>
                      </Flex>
                    </Flex>
                  ) : (
                    userInfo.email
                  )}
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
                  fontSize='20px'
                  onClick={attemptTokenRefresh}
                >
                  <Icon mr='1rem' color='Brand.AppleGreen.Reg' as={TbCoins} />
                  {tokenError.length ? (
                    <Text>{tokenError}</Text>
                  ) : (
                    <Flex
                      w='100%'
                      alignItems='center'
                      justifyContent='space-between'
                    >
                      <Text mr='.5rem'>tokens: {userInfo.tokens}</Text>
                      <TbRefresh color='white' />
                    </Flex>
                  )}
                </Flex>
                <Flex
                  as={Link}
                  isExternal
                  href='https://paypal.me/devcjfritz?country.x=US&locale.x=en_US'
                  _hover={{ bgColor: 'Brand.Agate.99' }}
                  px='1rem'
                  py='.5rem'
                  borderRadius='2px'
                  justify='flex-start'
                  w='100%'
                  align='center'
                  fontSize='20px'
                >
                  <Icon
                    mr='1rem'
                    color='Brand.AppleGreen.Reg'
                    as={TbCoffee}
                    fontSize='20px'
                  />
                  <Text>buy me a coffee</Text>
                </Flex>
              </Stack>
            </Stack>
          )}
        </Stack>
      ) : (
        <Stack
          bgColor='Brand.Agate.Reg'
          h='100dvh'
          // minW={isLessThan900 ? '240px' : '320px'}
          minW='fit-content'
          w='320px'
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
              onClick={() => setWindowState('start chat')}
            >
              <Icon mr='1rem' color='white' as={TbBrandHipchat} />
              <Text>New Request</Text>
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
            <Stack minW='fit-content' w='90%'>
              <Flex
                as={Link}
                _hover={{ bgColor: 'Brand.Agate.99' }}
                px='1rem'
                py='.5rem'
                borderRadius='2px'
                justify='flex-start'
                w='100%'
                align='center'
                fontSize='20px'
                onClick={
                  !showLogoutConfirmation
                    ? () => setShowLogoutConfirmation(true)
                    : undefined
                }
              >
                <Icon mr='1rem' color='Brand.AppleGreen.Reg' as={CgProfile} />
                {showLogoutConfirmation ? (
                  <Flex w='100%' justifyContent='space-between'>
                    <Text>Log Out?</Text>
                    <Flex>
                      <Text mr='1rem' onClick={handleLogout}>
                        Yes
                      </Text>
                      <Text onClick={() => setShowLogoutConfirmation(false)}>
                        No
                      </Text>
                    </Flex>
                  </Flex>
                ) : (
                  userInfo.email
                )}
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
                onClick={attemptTokenRefresh}
              >
                <Icon mr='1rem' color='Brand.AppleGreen.Reg' as={TbCoins} />
                {tokenError.length ? (
                  <Text>{tokenError}</Text>
                ) : (
                  <Flex
                    w='100%'
                    alignItems='center'
                    justifyContent='space-between'
                  >
                    <Text mr='.5rem'>tokens: {userInfo.tokens}</Text>
                    <TbRefresh color='white' />
                  </Flex>
                )}
              </Flex>
              <Flex
                as={Link}
                isExternal
                href='https://paypal.me/devcjfritz?country.x=US&locale.x=en_US'
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
                  as={TbCoffee}
                  fontSize='18px'
                />
                <Text>buy me a coffee</Text>
              </Flex>
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default SideBar;

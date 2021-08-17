import React from 'react'

import {
 Avatar,
 Badge,
 Box,
 Button,
 Center,
 Heading,
 Stack,
 Text,
 useColorModeValue,
} from '@chakra-ui/react'
import useStore from '../../zustand'

export default function SocialProfileSimple() {
  const  {email} = useStore(state =>state)
 return (
  <Center py={6}>
   <Box
    maxW={'320px'}
    w={'full'}
    bg={useColorModeValue('white', 'gray.900')}
    boxShadow={'2xl'}
    rounded={'lg'}
    p={6}
    textAlign={'center'}
   >
    <Avatar
     size={'xl'}
     src={
      'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
     }
     alt={'Avatar Alt'}
     mb={4}
     pos={'relative'}
     _after={{
      content: '""',
      w: 4,
      h: 4,
      bg: 'green.300',
      border: '2px solid white',
      rounded: 'full',
      pos: 'absolute',
      bottom: 0,
      right: 3,
     }}
    />
    <Heading pb={8} fontSize={'xl'} fontFamily={'body'}>
     Verify your email address 
    </Heading>

    <Text
     textAlign={'center'}
     color={useColorModeValue('gray.700', 'gray.400')}
     px={3}
    >
     We have sent a verification code to  {email}
    </Text>

    <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
     <Badge
      px={2}
      py={1}
      bg={useColorModeValue('gray.50', 'gray.800')}
      fontWeight={'400'}
     >
      #art
     </Badge>
     <Badge
      px={2}
      py={1}
      bg={useColorModeValue('gray.50', 'gray.800')}
      fontWeight={'400'}
     >
      #photography
     </Badge>
     <Badge
      px={2}
      py={1}
      bg={useColorModeValue('gray.50', 'gray.800')}
      fontWeight={'400'}
     >
      #music
     </Badge>
    </Stack>

    <Stack mt={8} direction={'row'} spacing={4}>
     <Button
      flex={1}
      fontSize={'sm'}
      rounded={'full'}
      variant="link"
      _focus={{
       bg: 'gray.200',
      }}
     >
      Resend Link
     </Button>
     <Button
      flex={1}
      fontSize={'sm'}
      rounded={'md'}
      bg={'blue.400'}
      color={'white'}
      boxShadow={
       '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
      }
      _hover={{
       bg: 'blue.500',
      }}
      _focus={{
       bg: 'blue.500',
      }}
     >
      Open Gmail App
     </Button>
    </Stack>
   </Box>
  </Center>
 )
}

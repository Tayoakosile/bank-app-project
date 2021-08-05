import { Button, ButtonGroup } from '@chakra-ui/button'
import { Box, Center, HStack, Text, VStack } from '@chakra-ui/layout'
import { chakra } from '@chakra-ui/system'
import React, { useEffect, useState } from 'react'
import useAuth from '../../auth/useAuth'
import useStore from '../../zustand'

const Stats = () => {
 const [state, setState] = useState('0.00')
 const {
  user: { getUserInfo },
 } = useStore(state => state)
 useEffect(() => {
  if (getUserInfo) {
   setState(getUserInfo.account.balance)
  }
 }, [getUserInfo])
 console.log(state)
 return (
  <Box w="90%" mx="auto" mt="12" bg="gray.300" h="32">
   <Center h="32">
    <VStack spacing="-1">
     <Text fontSize="1rem">Total balance</Text>
     <Text fontSize="2.4rem"> {state}</Text>
    </VStack>
   </Center>

   <HStack spacing={12} variant="outline" ml={4} mt={8}>
    <Button colorScheme="blue" variant="solid" bg ="blue.400" h={12} px={4} >
     Fund account
    </Button>
    <Button h={12}>Send money</Button>
   </HStack>
  </Box>
 )
}

export default Stats

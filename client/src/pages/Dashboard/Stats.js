import { Button, ButtonGroup } from '@chakra-ui/button'
import { Box, Center, HStack, Text, VStack } from '@chakra-ui/layout'
import { chakra } from '@chakra-ui/system'
import { Link as NavLink } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import useAuth from '../../auth/useAuth'
import useStore from '../../zustand'

const Stats = () => {
 const [userAccount, setUserAccount] = useState('0.00')
 const {
  user: { getUserInfo },
 } = useStore(state => state)
 useEffect(() => {
  if (getUserInfo) {
   setUserAccount(getUserInfo.account)
  }
 }, [getUserInfo])

 const { balance } = userAccount !== undefined && userAccount

 return (
  <Box w="90%" mx="auto" mt="12" bg="gray.300" h="32">
   <Center h="32">
    <VStack spacing="-1">
     <Text fontSize="1rem">Total balance</Text>
     <Text fontSize="2.4rem"> {balance}</Text>
    </VStack>
   </Center>

   <HStack spacing={12} mx="auto" variant="outline" ml={2} mt={8}>
    <Button
     as={NavLink}
     to = "/transactionform"
     colorScheme="blue"
     variant="solid"
     bg="blue.400"
     h={12}
     px={4}
    >
     Fund account
    </Button>
    <Button h={12}>Send money</Button>
   </HStack>
  </Box>
 )
}

export default Stats

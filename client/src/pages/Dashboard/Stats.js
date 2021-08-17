import { Button } from '@chakra-ui/button'
import { Box, Center, HStack, Text, VStack } from '@chakra-ui/layout'
import React from 'react'
import { Link as NavLink } from 'react-router-dom'
import useDashboard from '../../hooks/useDashboard'
const Stats = () => {
 const { balance,  } = useDashboard()
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
     /*  onClick={() => {
      initializePayment(onSuccess, onClose)
     }} */
     colorScheme="blue"
     variant="solid"
     bg="blue.400"
     h={12}
     as={NavLink}
     to="/account/fund-account"
     px={4}
    >
     Fund account
    </Button>

    <Button h={12} as={NavLink} to="/account/transfer/user">
     Transfer
    </Button>
   </HStack>
  </Box>
 )
}

export default Stats

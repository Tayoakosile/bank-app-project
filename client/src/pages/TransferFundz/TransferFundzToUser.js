import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { Box, Center, Text, VStack } from '@chakra-ui/layout'
import React from 'react'
import ProtectedComponent from '../../components/ProtectedComponent'
import ConfirmUserExit from './ConfirmUserExit'
import useTransferFundz from './useTransferFundz'

const TransferFundz = () => {
 const { isOpen, onOpen, onClose } = useDisclosure()
 const {
  firstname,
  lastname,
  account_number,
  Redirect,
  userPin,
  transferSum,
  handlePayment,
 } = useTransferFundz()
 return (
  <ProtectedComponent>
   <Box className="24">
    <ConfirmUserExit isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
   </Box>

   <Center mt="24">
    <VStack spacing="4">
     <Text>
      Transfer the sum of
      <Text as={'span'} pl="2" fontSize="lg">
       N{transferSum} to
      </Text>
     </Text>
     <Avatar name={`${firstname} ${lastname}`} size="lg" />
     <Text fontSize="sm">{`${firstname} ${lastname}`}</Text>
     <Text>{` ${account_number}`}</Text>
     <Button mt="md" onClick={onOpen}>
      Confirm
     </Button>
    </VStack>
   </Center>
  </ProtectedComponent>
 )
}

export default TransferFundz

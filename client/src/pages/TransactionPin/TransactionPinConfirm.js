import React from 'react'
import {
 HStack,
 PinInput,
 PinInputField,
 Heading,
 Center,
 VStack,
 Button,
 Text,
} from '@chakra-ui/react'
import ProtectedComponent from '../../components/ProtectedComponent'
import useTransactionPin from '../../hooks/useTransactionPin'
const TransactionPinConfirm = () => {
 const { NewPin, userDetail } = useTransactionPin()
 const { pin } = userDetail
 return (
  <ProtectedComponent>
   {pin === null ? (
    <Center mt="32">
     <VStack spacing="24">
      <Heading>Confirm your Pin </Heading>
      <HStack>
       <PinInput onComplete={NewPin} type="numeric" size="lg">
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
       </PinInput>
      </HStack>

      <Button colorScheme="blue" size="lg">
       Set Pin
      </Button>
     </VStack>
    </Center>
   ) : (
    <Text>Your password is validated</Text>
   )}
  </ProtectedComponent>
 )
}

export default TransactionPinConfirm

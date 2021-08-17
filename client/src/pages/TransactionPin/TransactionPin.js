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
const TransactionPin = () => {
 const { NewPin, userDetail, redirectToConfirmPassword } = useTransactionPin()
 const { pin } = userDetail
 return (
  <ProtectedComponent>
   {pin === null ? (
    <Center mt="32">
     <VStack spacing="24">
      <Heading>Set your Transaction Pin</Heading>
      <HStack>
       <PinInput
        onComplete={redirectToConfirmPassword}
        type="numeric"
        size="lg"
        mask
       >
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

export default TransactionPin

import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'
import { Center, VStack } from '@chakra-ui/layout'
import React from 'react'
import ProtectedComponent from '../../components/ProtectedComponent'
import useMakeTransaction from '../../hooks/useMakeTransaction'

const FundAccount = () => {
 const {
  handleSubmit,
  fundAccount,
  register,
  isValid,
  onClose,
  onSuccess,
  initializePayment,
 } = useMakeTransaction()
 return (
  <ProtectedComponent>
   <VStack spacing="8" alignItems="flex-start" w="80%" mx="auto" mt="12">
    <p>Fund your Kweeqfundz account</p>
    <FormControl as="form" id="email" onSubmit={handleSubmit(fundAccount)}>
     <FormLabel>Amount</FormLabel>
     <InputGroup>
      <InputLeftElement
       pointerEvents="none"
       color="gray.400"
       fontSize="1.2em"
       children="₦"
      />
      <Input
       variant="flushed"
       type="number"
       {...register('amount', {
        required: 'An amount is required',
        minLength: {
         value: 3,
         message:
          'Short Password are easy to guess, Try one with at least 6 characters ',
        },
        pattern: {
         value: /^[0-9]+$/,
         message: 'Password must include at least one number',
        },
       })}
       placeholder="Enter amount"
      />
     </InputGroup>

     <Center mt="12">
      <Button
       onClick={() => {
        if (isValid) {
         initializePayment(onSuccess, onClose)
        }
       }}
       isDisabled={!isValid}
       type="submit"
       w="70%"
       colorScheme="blue"
       h="16"
      >
       Next
      </Button>
     </Center>
    </FormControl>
   </VStack>
  </ProtectedComponent>
 )
}

export default FundAccount

import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
import {
 FormControl,
 FormErrorIcon,
 FormErrorMessage,
 FormHelperText,
 FormLabel,
} from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, Center, Text } from '@chakra-ui/layout'
import React from 'react'
import { postRequestToServer } from '../../api/api'
import ProtectedComponent from '../../components/ProtectedComponent'
import useSetAmountToTransfer from '../../hooks/useSetAmountToTransfer'

const SetAmounToTransfer = () => {
 const {
  firstname,
  errorState,
  account_number,
  userID,
  lastname,
  account,
  setError,
  isValid,
  _id,
  isSuccess,
  isLoading,
  register,
  errors,
  handleSubmit,
  handleValidation,
  handleUserTransfer,
 } = useSetAmountToTransfer()

 if (isLoading) {
  return <div>Is loading</div>
 }
 return (
  <ProtectedComponent>
   <Center mt="8">
    <Box d="flex" flexDir="column" alignItems="center">
     <Avatar name={`${firstname} ${lastname}`} size="lg" />
     <Text fontSize="xl">Make a Transfer </Text>
     <Text> to {`${firstname} ${lastname}`}</Text>
     <Text> {`${account_number} `}</Text>
    </Box>
   </Center>

   <FormControl
    as="form"
    id="number"
    w="90%"
    mx="auto"
    mt="12"
    onSubmit={handleSubmit(handleUserTransfer)}
    isInvalid={errors.transfer}
   >
    <FormLabel>Amount</FormLabel>
    <Input
     type="number"
     {...register('transfer', {
      required: 'Please Type in a amount',
      validate: amount => {
       const parsedNumber = Number(amount) > 10
       if (!parsedNumber) {
        return 'Value must be above 10 naira'
       }
       postRequestToServer('/validatebalance', { amount, userID})
        .then(res => {
         return true
        })
        .catch(err => {
         const error = `You have ${err.response.data.balance} left.`
         setError('transfer', { type: 'validate', message: error })

         console.log(err.response.data.balance)
         return 'Value must be '
        })
      },

      minLength: {
       value: 1,
       message: 'Please amount should more than 10 naira',
      },
     })}
     placeholder="Amount to transfer"
     variant="flushed"
    />
    <FormErrorMessage>
     {errors.transfer && errors.transfer.message}
    </FormErrorMessage>

    <Center mt="12">
     <Button isDisabled={!isValid} type="submit" size="lg">
      Next
     </Button>
    </Center>
   </FormControl>
  </ProtectedComponent>
 )
}

export default SetAmounToTransfer

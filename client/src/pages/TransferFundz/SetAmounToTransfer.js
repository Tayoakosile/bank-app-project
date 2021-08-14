import { Avatar } from '@chakra-ui/avatar'
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, Center, Text } from '@chakra-ui/layout'
import React from 'react'
import ProtectedComponent from '../../components/ProtectedComponent'
import useReactForm from '../../hooks/useReactForm'
import useSetAmountToTransfer from '../../hooks/useSetAmountToTransfer'

const SetAmounToTransfer = () => {
 const { register, errors, handleSubmit, setError, getValues } = useReactForm()
 const { firstname, account_number, lastname, account, isSuccess, isLoading } =
  useSetAmountToTransfer()

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

   <FormControl id="number" w="90%" mx="auto" mt="12">
    <FormLabel>Amount</FormLabel>
    <Input type="number" placeholder="Amount to transfer" variant="flushed" />
    <FormHelperText>We'll never share your email</FormHelperText>
   </FormControl>
  </ProtectedComponent>
 )
}

export default SetAmounToTransfer

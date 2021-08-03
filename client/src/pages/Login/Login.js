import {
 Box,
 Button,
 Checkbox,
 Flex,
 FormControl,
 FormErrorMessage,
 FormLabel,
 Heading,
 Link,
 Stack,
 Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Redirect, useHistory } from 'react-router'
import useAuth from '../../auth/useAuth'
import InputField from '../../components/Input'
import useLogin from '../../hooks/useLogin'
export default function SimpleCard() {
 const history = useHistory()
 const { handleSubmit, register, onSubmit, errors, isValid } = useLogin()
 const { isSuccess } = useAuth()
 if (isSuccess) {
  return <Redirect to="/dashboard"></Redirect>
 }
 return (
  <Flex minH={'100vh'} align={'center'} justify={'center'} bg="gray.50">
   <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
    <Stack align={'center'}>
     <Heading fontSize={'4xl'}>Sign in to your account</Heading>
     <Text fontSize={'lg'} color={'gray.600'}>
      to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
     </Text>
    </Stack>
    <Box rounded={'lg'} bg="white" boxShadow={'lg'} p={8}>
     <Stack spacing={4} as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl id="email" isInvalid={errors.email}>
       <FormLabel>Email address</FormLabel>
       <InputField
        type="email"
        name="email"
        {...register('email', {
         required: 'Your Email Address is Required',
         pattern: {
          value:
           /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/,
          message: 'Invalid Email Address, Please try again',
         },
         // validate: {
         //  email: email => handleValidateEmail(email, 'email'),
         // },
        })}
       />
       <FormErrorMessage>
        {errors.email && errors.email.message}
       </FormErrorMessage>
      </FormControl>
      <FormControl id="password" isInvalid={errors.password}>
       <FormLabel>Password</FormLabel>
       <InputField
        type="password"
        name="password"
        {...register('password', {
         required: 'Password Required',
         minLength: {
          value: 3,
          message: 'Too Short',
         },
        })}
       />
       <FormErrorMessage>
        {errors.password && errors.password.message}
       </FormErrorMessage>
      </FormControl>
      <Stack spacing={10}>
       <Stack
        direction={{ base: 'column', sm: 'row' }}
        align={'start'}
        justify={'space-between'}
       >
        <Checkbox>Remember me</Checkbox>
        <Link color={'blue.400'}>Forgot password?</Link>
       </Stack>
       <Button
        type="submit"
        bg={'blue.400'}
        isDisabled={!isValid}
        color={'white'}
        _hover={{
         bg: 'blue.500',
        }}
       >
        Sign in
       </Button>
      </Stack>
     </Stack>
    </Box>
   </Stack>
  </Flex>
 )
}

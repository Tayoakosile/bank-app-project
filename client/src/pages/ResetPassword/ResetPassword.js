import {
 Button,
 Checkbox,
 Flex,
 FormControl,
 FormLabel,
 Heading,
 Input,
 Link,
 Stack,
 Image,
 FormErrorMessage,
} from '@chakra-ui/react'
import useResetPassword from '../../hooks/useResendValidationCode'
import useValidateForm from '../../hooks/useValidateForm'

export default function SplitScreen() {
 const { register, errors, handleSubmit, RequestPasswordRequest, isValid } =
  useResetPassword()
 return (
  <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
   <Flex p={8} flex={1} align={'center'} justify={'center'}>
    <Stack
     as="form"
     onSubmit={handleSubmit(RequestPasswordRequest)}
     spacing={4}
     w={'full'}
     maxW={'md'}
    >
     <Heading fontSize={'2xl'} textAlign="center" pb="12">
      Lets help reset your password
     </Heading>
     <FormControl id="email" isInvalid={errors.email}>
      <FormLabel>Email address</FormLabel>
      <Input
       type="email"
       placeholder="Type in your email address"
       {...register('email', {
        required: 'Your Email Address is Required',
        pattern: {
         value:
          /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/,
         message: 'Invalid Email Address, Please try again',
        },
      
       })}
      />
      <FormErrorMessage>
       {errors.email && errors.email.message}
      </FormErrorMessage>
     </FormControl>

     <Stack spacing={6}>
      <Button
       type="submit"
       isDisabled={!isValid}
       colorScheme={'blue'}
       variant={'solid'}
      >
       Request Password Reset Link
      </Button>
     </Stack>
    </Stack>
   </Flex>
  </Stack>
 )
}

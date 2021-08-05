import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import useResetPassword from '../../hooks/useResetPassword'

export default function SimpleCard() {
 const {
  handleSubmit,
  register,
  show,
  handleClick,
  show2,
  handleClick2,
  errors,
  isValid,
  isPasswordSame,
  password,
  setShowPassword,
  resetPassword,
 } = useResetPassword()

 return (
  <Flex
   minH={'100vh'}
   align={'center'}
   justify={'center'}
   bg={useColorModeValue('gray.50', 'gray.800')}
  >
   <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
    <Stack align={'center'}>
     <Heading fontSize={'4xl'}>Reset Your Password</Heading>
     <Text fontSize={'lg'} color={'gray.600'}>
      to enjoy all of our cool features
     </Text>
    </Stack>
    <Box
     rounded={'lg'}
     bg={useColorModeValue('white', 'gray.700')}
     boxShadow={'lg'}
     p={8}
    >
     <Stack spacing={4} as="form" onSubmit={handleSubmit(resetPassword)}>
      <FormControl id="password" isInvalid={errors.password}>
       <FormLabel>Password</FormLabel>

       <InputGroup size="md">
        <Input
         pr="4.5rem"
         type={show ? 'text' : 'password'}
         placeholder="Enter new password"
         {...register('password', {
          required: 'Password Required',
          minLength: {
           value: 6,
           message:
            'Short Password are easy to guess, Try one with at least 6 characters ',
          },
          pattern: {
           value: /\d/,
           message: 'Password must include at least one number',
          },
         })}
        />
        <InputRightElement width="4.5rem">
         <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
         </Button>
        </InputRightElement>
       </InputGroup>

       <FormErrorMessage>
        {errors.password && errors.password.message}
       </FormErrorMessage>
      </FormControl>

      <FormControl id="confirmPassword" isInvalid={errors.confirmPassword}>
       <FormLabel>Confirm Password</FormLabel>

       <InputGroup size="md">
        <Input
         pr="4.5rem"
         type={show2 ? 'text' : 'password'}
         placeholder="Confirm password"
         {...register('confirmPassword', {
          required: 'Password required',
          validate: confirmPassword => isPasswordSame(confirmPassword),
         })}
        />
        <InputRightElement width="4.5rem">
         <Button h="1.75rem" size="sm" onClick={handleClick2}>
          {show2 ? 'Hide' : 'Show'}
         </Button>
        </InputRightElement>
       </InputGroup>
       <FormErrorMessage>
        {errors.confirmPassword && errors.confirmPassword.message}
       </FormErrorMessage>
       {errors.confirmPassword &&
        errors.confirmPassword.type === 'validate' && (
         <FormErrorMessage>Password doesnt match</FormErrorMessage>
        )}
      </FormControl>

      <Stack spacing={10}>
       <Stack
        direction={{ base: 'column', sm: 'row' }}
        align={'start'}
        justify={'space-between'}
       ></Stack>
       <Button
        bg={'blue.400'}
        color={'white'}
        _hover={{
         bg: 'blue.900',
        }}
        type="submit"
        isDisabled={!isValid}
       >
        Reset Password
       </Button>
      </Stack>
     </Stack>
    </Box>
   </Stack>
  </Flex>
 )
}

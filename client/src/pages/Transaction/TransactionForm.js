import {
 Box,
 Button,
 Checkbox,
 Flex,
 FormControl,
 FormErrorMessage,
 FormLabel,
 Input,
 Link,
 NumberDecrementStepper,
 NumberIncrementStepper,
 NumberInput,
 NumberInputField,
 NumberInputStepper,
 Stack,
 useColorModeValue,
} from '@chakra-ui/react'
import useTransaction from '../../hooks/useTransaction'

export default function SimpleCard() {
 const { register, errors, handleSubmit, makeTransaction } = useTransaction()
 return (
  <Flex
   minH={'100vh'}
   align={'center'}
   justify={'center'}
   bg={useColorModeValue('gray.50', 'gray.800')}
  >
   <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
    <Box
     rounded={'lg'}
     bg={useColorModeValue('white', 'gray.700')}
     boxShadow={'lg'}
     p={8}
    >
     <Stack spacing={4} as="form" onSubmit={handleSubmit(makeTransaction)}>
      <FormControl id="fullname" isInvalid={errors.fullname}>
       <FormLabel>Full name</FormLabel>
       <Input
        type="text"
        {...register('fullname', {
         required: 'Fullname Required',
         minLength: {
          value: 6,
          message:
           'fullname are easy to guess, Try one with at least 6 characters ',
         },
        })}
       />
       <FormErrorMessage>
        {errors.fullname && errors.fullname.message}
       </FormErrorMessage>
      </FormControl>

      <FormControl>
       <FormLabel>Amount</FormLabel>
       <NumberInput>
        <NumberInputField
         {...register('amount', {
          required: 'Password Required',
          minLength: {
           value: 3,
           message:
            'Short Password are easy to guess, Try one with at least 6 characters ',
          },
         
         })}
        />
        <NumberInputStepper>
         <NumberIncrementStepper />
         <NumberDecrementStepper />
        </NumberInputStepper>
       </NumberInput>
      </FormControl>

      <FormControl id="email">
       <FormLabel>Email Address</FormLabel>
       <Input
        type="text"
        {...register('email', {
         required: 'Password Required',
         minLength: {
          value: 6,
          message:
           'Short Password are easy to guess, Try one with at least 6 characters ',
         },
        
        })}
       />
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

import {
 Box,
 Button,
 Flex,
 FormControl,
 FormErrorMessage,
 FormLabel,
 Image,
 Stack,
} from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify'
import Header from '../../components/Heading'
import InputField from '../../components/Input'
import PGraph from '../../components/Text'
import useValidateForm from '../../hooks/useValidateForm'

export default function SplitScreen() {
 const {
  register,
  handleSubmit,
  onSubmit,
  isValid,
  errors,
  isSubmitting,
  handleValidateEmail,
 } = useValidateForm()

 return (
  <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
   <Box as={ToastContainer} />
   <Flex flex={1}>
    <Image
     alt={'Login Image'}
     objectFit={'cover'}
     src={
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
     }
    />
   </Flex>

   <Flex
    p={8}
    flex={1}
    align={'center'}
    justify={'center'}
    alignItems={{ base: null, md: null, lg: 'flex-start' }}
   >
    <Stack
     spacing={4}
     w={'full'}
     maxW={'md'}
     as="form"
     id="myForm"
     onSubmit={handleSubmit(onSubmit)}
    >
     <Header fontSize={'4xl'} text="Sign Up" />
     <PGraph
      text=" Create a Account so as to send and receive money to loved ones, also get a
      free account number"
     />
     {/* Full Name */}
     <Stack
      direction={{ base: 'column', md: 'column', lg: 'row' }}
      spacing="8"
      w="full"
     >
      <FormControl id="firstname" isInvalid={errors.firstname}>
       <FormLabel htmlFor="firstname">First Name</FormLabel>
       <InputField
        type="text"
        id="firstname"
        name="firstname"
        placeholder="eg John"
        {...register('firstname', {
         required: 'First Name is Required',
         minLength: {
          value: 4,
          message: 'First Name must be at least 5 characters long',
         },
        })}
       />
       <FormErrorMessage>
        {errors.firstname && errors.firstname.message}
       </FormErrorMessage>
      </FormControl>

      <FormControl id="lastname" isInvalid={errors.lastname}>
       <FormLabel htmlFor="lastname">Last Name</FormLabel>
       <InputField
        type="text"
        id="lastname"
        name="lastname"
        placeholder="eg Doe"
        {...register('lastname', {
         required: 'Last Name is Required',
         minLength: {
          value: 4,
          message: 'Last Name must be at least 5 characters long',
         },
        })}
       />
       <FormErrorMessage>
        {errors.lastname && errors.lastname.message}
       </FormErrorMessage>
      </FormControl>

      {/* Email address */}
     </Stack>
     {/* user Name */}
     <FormControl id="username" isInvalid={errors.username}>
      <FormLabel htmlFor="username">User Name</FormLabel>
      <InputField
       type="text"
       id="username"
       name="username"
       placeholder="eg Doe"
       {...register('username', {
        required: 'User  Name is Required',
        minLength: {
         value: 4,
         message: 'User Name must be at least 5 characters long',
        },
        maxLength: {
         value: 20,
         message: 'User Name too Long, Try another',
        },
        validate: {
         username: username => handleValidateEmail(username, 'username'),
        },
       })}
      />
      <FormErrorMessage>
       {errors.username && errors.username.message}
      </FormErrorMessage>
     </FormControl>

     {/* Email Address */}
     <FormControl id="email" isInvalid={errors.email}>
      <FormLabel htmlFor="email">Email address</FormLabel>
      <InputField
       type="email"
       id="email"
       name="email"
       placeholder="Any Valid Email Address "
       {...register('email', {
        required: 'Your Email Address is Required',
        pattern: {
         value:
          /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/,
         message: 'Invalid Email Address, Please try again',
        },
        validate: {
         email: email => handleValidateEmail(email, 'email'),
        },
       })}
       //  onChange={handleValidateEmail}
      />
      <FormErrorMessage>
       {errors.email && errors.email.message}
      </FormErrorMessage>
      {errors.email && errors.email.type === 'validate' && (
       <FormErrorMessage>This Email Already Exist</FormErrorMessage>
      )}
     </FormControl>

     {/* Password */}
     <FormControl id="password" isInvalid={errors.password}>
      <FormLabel htmlFor="password">Password</FormLabel>
      <InputField
       type="password"
       name="password"
       id="password"
       {...register('password', {
        required: 'Password Required',
        minLength: {
         value: 6,
         message:
          'Short Password are easy to guess, Try one with at least 6 characters ',
        },
        pattern: {
         value : /\d/,
         message :"Password must include at least one number"
        },
       })}
       id="password"
       placeholder="Password should include at least one number"
      />
      <FormErrorMessage>
       {errors.password && errors.password.message}
      </FormErrorMessage>
     </FormControl>
     <Stack spacing={6}>
      <Button
       isDisabled={!isValid}
       isLoading={false}
       type="submit"
       textTransform="capitalize"
       size="lg"
       w="60%"
       colorScheme={'blue'}
       variant={'solid'}
      >
       Sign Up
      </Button>
     </Stack>
    </Stack>
   </Flex>
  </Stack>
 )
}

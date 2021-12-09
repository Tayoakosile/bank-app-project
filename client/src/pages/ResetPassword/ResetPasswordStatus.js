import {
 Box,
 Button,
 FormControl,
 FormErrorMessage,
 FormLabel,
 Heading,
 Input,
 InputGroup,
 InputRightElement,
 Stack,
 Text,
} from '@chakra-ui/react'
import React from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import FulLogo from '../../assets/img/logo/FulLogo'
import useResetPassword from '../../hooks/useResetPassword'
import useValidateForm from '../../hooks/useValidateForm'
import PasswordLinkExpired from './PasswordLinkExpired'
import ResetPasswordSuccess from './ResetPasswordSuccess'

export default function SimpleCard() {
 const {
  handleSubmit,
  register,
  isSuccess,
  show,
  show2,
  handleClick2,
  errors,
  isValid,
  isPasswordSame,
  password,
  setShowPassword,
  resetPassword,
  formSuccess,
  isPasswordExpired,
 } = useResetPassword()
 const {
  isPasswordActive,
  isEmailActive,
  handleShowPassword,
  handlePasswordChange,
  handleEmailChange,
  showPassword,
 } = useValidateForm()
 if (isPasswordExpired) {
  return <PasswordLinkExpired />
  console.log(isPasswordExpired, 'expired')
 }
 console.log(isPasswordExpired, 'expired')
 if (formSuccess) {
  return <ResetPasswordSuccess />
 }
 return (
  <Box minH={'100vh'} pl="7" bg="blackAlpha.100">
   <Box pt="7">
    <FulLogo
     w={'8'}
     h={'8'}
     fs="xl"
     fill="brand.600"
     spacing={1}
     color="brand.600"
    />
   </Box>

   <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12}>
    <Stack align={'flex-start'}>
     <Heading fontSize={'2xl'} color="brand.900">
      Reset Password
     </Heading>
     <Text fontSize={'md'} fontWeight={'semibold'} color="gray.500">
      to enjoy all of our cool features
     </Text>
    </Stack>
    <Box pr="7">
     <Stack spacing={4} as="form" onSubmit={handleSubmit(resetPassword)}>
      <FormControl
       id="password"
       className="monsecure-form"
       h="20"
       isInvalid={errors.password}
       color={errors.confirmPassword ? '#a12000' : 'brand.600'}
      >
       <FormLabel
        color={errors.password ? '#a12000' : 'brand.600'}
        fontSize="sm"
        className={isPasswordActive ? 'Active' : ''}
        opacity={errors.password ? '1' : '.80'}
        fontWeight={errors.password ? 'bold' : 'bold'}
       >
        Password
       </FormLabel>
       <InputGroup>
        <Input
         type={showPassword ? 'password' : 'text'}
         name="password"
         variant="flushed"
         name="password"
         {...register('password', {
          required: 'A valid password is required',
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
         onChange={e => {
          handlePasswordChange(e.target.value)
         }}
        />
        <InputRightElement
         onClick={() => {
          handleShowPassword()
          console.log('clicked')
         }}
         children={
          showPassword ? (
           <AiOutlineEye h={7} w={7} />
          ) : (
           <AiOutlineEyeInvisible h={7} w={7} />
          )
         }
        />
       </InputGroup>

       <FormErrorMessage className="monsecure_error">
        {errors.password && errors.password.message}
       </FormErrorMessage>
      </FormControl>

      <FormControl
       id="confirmPassword"
       h="20"
       isInvalid={errors.confirmPassword}
       color={errors.confirmPassword ? '#a12000' : 'brand.600'}
       className="monsecure-form"
      >
       <FormLabel
        className={isEmailActive ? 'Active' : ''}
        opacity={errors.confirmPassword ? '1' : '.80'}
        fontWeight={errors.confirmPassword ? 'bold' : 'bold'}
        fontSize="sm"
       >
        Confirm Password
       </FormLabel>

       <InputGroup size="md">
        <Input
         variant="flushed"
         type={show2 ? 'text' : 'password'}
         {...register('confirmPassword', {
          required: 'Password required',
          validate: confirmPassword => isPasswordSame(confirmPassword),
         })}
         onChange={e => handleEmailChange(e.target.value)}
        />

        {/* input */}
        <InputRightElement
         onClick={() => {
          handleClick2()
         }}
         children={
          !show2 ? (
           <AiOutlineEye color="brand.200" />
          ) : (
           <AiOutlineEyeInvisible color="brand.200" />
          )
         }
        />
        {/* input */}
       </InputGroup>
       <FormErrorMessage className="monsecure_error">
        {errors.confirmPassword && errors.confirmPassword.message}
       </FormErrorMessage>
       {errors.confirmPassword &&
        errors.confirmPassword.type === 'validate' && (
         <FormErrorMessage className="monsecure_error">
          Password doesnt match
         </FormErrorMessage>
        )}
      </FormControl>

      <Stack spacing={10}>
       <Button
        w="97%"
        h="16"
        bg="brand.500"
        type="submit"
        fontSize="sm"
        variant={'solid'}
        textTransform="capitalize"
       >
        Reset Password
       </Button>
      </Stack>
     </Stack>
    </Box>
   </Stack>
  </Box>
 )
}

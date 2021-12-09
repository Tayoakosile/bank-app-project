import { Button } from '@chakra-ui/button'
import { Box, Heading, Text, VStack } from '@chakra-ui/layout'
import React from 'react'
import useResendValidationCode from '../../hooks/useResendValidationCode'

const ResetPasswordCodeSent = () => {
 const { history } = useResendValidationCode()
 return (
  <Box minH={'100vh'} bg="brand.500" px={7} pt="10">
   <VStack align="flex-start" spacing="2" pb="7">
    <Heading color="white">Yooo</Heading>
    <Text color="brand.100" fontSize="md">
     A password reset link has been sent to your email address,
     Please check your mail and click the link to reset your password.
    </Text>
   </VStack>

   <Button
    type="submit"
    bg={'white'}
    loadingText="Sending Reset Link"
    size="lg"
    fontSize="sm"
    textTransform="uppercase"
    w="98%"
    mx="auto"
    onClick={e => history.push('/login')}
    h="16"
    color={'brand.500'}
    variant={'solid'}
   >
    Proceed to log in
   </Button>
  </Box>
 )
}

export default ResetPasswordCodeSent

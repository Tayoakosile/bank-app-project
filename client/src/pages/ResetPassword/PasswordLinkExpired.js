import { Button } from '@chakra-ui/button'
import { Box, Heading, Text, VStack } from '@chakra-ui/layout'
import React from 'react'
import { useHistory } from 'react-router-dom'
import FulLogo from '../../assets/img/logo/FulLogo'

const PasswordLinkExpired = () => {
 const history = useHistory()
 return (
  <Box>
   <Box py="7" pl="7">
    <FulLogo
     w={'8'}
     h={'8'}
     fs="xl"
     fill="brand.600"
     spacing={1}
     color="brand.600"
    />
   </Box>
   <VStack py="8" spacing={4}>
    <VStack spacing={0}>
     <Heading fontSize={'3xl'} color="brand.900">
      Error
     </Heading>
     <Text
      fontSize={'md'}
    
      w ='100%'
      fontWeight={'semibold'}
      color="gray.500"
      textAlign="center"
     >
      This Link is expired or invalid, <br/>  Login to continue
     </Text>
    </VStack>

    <Button
     h="16"
     size="lg"
     bg="brand.500"
     fontSize="sm"
     onClick={() => history.push('/login')}
    >
     Log in
    </Button>
   </VStack>
  </Box>
 )
}
export default PasswordLinkExpired

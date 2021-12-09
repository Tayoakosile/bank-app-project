import React from 'react'
import Icon from '@chakra-ui/icon'
import { Center, Heading, Text, VStack } from '@chakra-ui/layout'
import { ReactComponent as Logo } from '../../assets/img/logo/logo.svg'

const Intro = () => {
 return (
  <VStack className="home-intro" position="relative">
   <Center pt="48">
    <Icon as={Logo} w="24" h="24" color="white" />
   </Center>
   <VStack position="absolute" bottom="6" spacing="1" color="white">
    <Heading fontWeight="600" letterSpacing=".9px" fontSize="xl">
     monsecure
    </Heading>
    <Text fontWeight="300" fontSize="12px">
     Safe Transfer you can trust 
    </Text>
   </VStack>
  </VStack>
 )
}

export default Intro

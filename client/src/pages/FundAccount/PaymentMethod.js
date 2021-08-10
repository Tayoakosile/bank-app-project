import { Box, Heading, LinkBox, LinkOverlay, Text } from '@chakra-ui/layout'
import React from 'react'
import { Link } from 'react-router-dom'

const PaymentMethod = ({ methodOfPayment }) => {
 const newMethod = methodOfPayment.replace('_', ' ')
 return (
  <LinkBox as="article" maxW="sm" p="5" borderWidth="1px" rounded="md">
   <Text>
    <LinkOverlay href="#" as={Link} to = {`fund-account/method/${methodOfPayment}`}>
     Fund account with {newMethod}
    </LinkOverlay>
   </Text>
  </LinkBox>
 )
}

export default PaymentMethod

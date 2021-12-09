import { Input } from '@chakra-ui/input'
import React from 'react'

const InputField = ({ ...rest }) => {
 return (
  <Input
   color="brand.600"
   fontWeight="semibold"
   fontFamily="inherit"
   {...rest}
  />
 )
}

export default InputField

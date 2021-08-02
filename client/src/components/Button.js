import React from 'react'
import { Button } from '@chakra-ui/react'
const Btn = ({ text, ...rest }) => {
 return (
  <>
   <Button {...rest}>{text}</Button>
  </>
 )
}

export default Btn

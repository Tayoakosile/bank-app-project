import { Heading } from '@chakra-ui/layout'
import React from 'react'

const Header = ({ text, ...rest }) => {
 return <Heading {...rest}>{text}</Heading>
}

export default Header

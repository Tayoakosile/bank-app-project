import { Text } from '@chakra-ui/layout'
import React from 'react'

const PGraph = ({ text, ...rest }) => {
 return <Text {...rest}>{text}</Text>
}

export default PGraph

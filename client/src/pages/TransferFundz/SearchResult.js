import { Box } from '@chakra-ui/layout'
import { SkeletonCircle, SkeletonText } from '@chakra-ui/skeleton'
import React from 'react'

const SearchResult = () => {
 return (
  <Box p="6" w = "full" boxShadow="lg" bg="white">
   <SkeletonCircle size="10" />
   <SkeletonText mt="4" noOfLines={4} spacing="4" />
  </Box>
 )
}

export default SearchResult

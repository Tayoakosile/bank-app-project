import { Box } from '@chakra-ui/layout'
import { SkeletonCircle, SkeletonText, Skeleton } from '@chakra-ui/skeleton'
import React from 'react'
import ProtectedComponent from '../../components/ProtectedComponent'
import useSearchUserToTransfer from '../../hooks/useSearchUSerToTransfer'

const SearchResult = ({ user, isLoading, inputVal }) => {
 const { handleIntraTransfer, data, isSuccess } = useSearchUserToTransfer()
 const {
  firstname,
  lastname,
  account: { account_number },
  username,
 } = user
 return (
  <ProtectedComponent>
   <Box
    w="90%"
    mx="auto"
    bg="gray.100"
    p="4"
    onClick={e => handleIntraTransfer(user)}
   >
    <p>{`${firstname} ${lastname}  `}</p>
    <p>{`${account_number}`}</p>
    <p>{`${username}   `}</p>
   </Box>
  </ProtectedComponent>
 )
}

export default SearchResult

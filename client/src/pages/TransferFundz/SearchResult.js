import { Box } from '@chakra-ui/layout'
import { SkeletonCircle, SkeletonText, Skeleton } from '@chakra-ui/skeleton'
import React from 'react'
import useSearchUserToTransfer from '../../hooks/useSearchUSerToTransfer'

const SearchResult = ({ user, isLoading, inputVal }) => {
 const { handleIntraTransfer } = useSearchUserToTransfer()
 const {
  firstname,
  lastname,
  account: { account_number },
  username,
 } = user
 return (
  <>
   {isLoading && (
    <Box w="90%" mx="auto">
     <SkeletonCircle size="10" />
     <SkeletonText mt="4" noOfLines={3} spacing="4" />
    </Box>
   )}

   {/* If users were found, then show user */}

   {user && (
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
   )}
  </>
 )
}

export default SearchResult

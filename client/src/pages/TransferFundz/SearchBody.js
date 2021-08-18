import { Box } from '@chakra-ui/layout'
import randomatic from 'randomatic'
import React from 'react'
import SearchResult from './SearchResult'

const SearchBody = ({
 data,
 isLoading,
 handleIntraTransfer,
 isError,
 inputVal,
 isSuccess,
}) => {
 if (isLoading) {
  return <div>isLoading</div>
 }
 if (isError) {
  return <div>User not found</div>
 }

 return (
  <div>
   {isSuccess &&
    data.data.message.map(user => {
     const {
      firstname,
      lastname,
      username,
      account: { account_number },
     } = user
     return (
      <React.Fragment key={randomatic('01', 12)}>
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
      </React.Fragment>
     )
    })}
  </div>
 )

 return <div>Hello</div>
}

export default SearchBody

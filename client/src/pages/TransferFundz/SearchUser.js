import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'
import { VStack } from '@chakra-ui/layout'
import randomatic from 'randomatic'
import React from 'react'
import ProtectedComponent from '../../components/ProtectedComponent'
import useSearchUserToTransfer from '../../hooks/useSearchUSerToTransfer'
import useStore from '../../zustand'
import SearchBody from './SearchBody'
import SearchResult from './SearchResult'

const SearchUser = () => {
 const { searchUsersResult } = useStore(state => state)
 const {
  handleSearchUserAccountNumber,
  inputVal,
  isError,
  isLoading,
  isSuccess,
 } = useSearchUserToTransfer()
 console.log(searchUsersResult)
 return (
  <ProtectedComponent>
   <VStack w="90%" mt="8" mx="auto">
    <InputGroup>
     <InputLeftElement color="gray.400" fontSize="1em" children="KW" />
     <Input
      type="number"
      onChange={handleSearchUserAccountNumber}
      placeholder="Search by users account number"
      val={inputVal}
     />
    </InputGroup>
    <SearchBody
     data={searchUsersResult}
     isError={isError}
     isLoading={isLoading}
     isSuccess={isSuccess}
     inputVal={inputVal}
    />
   </VStack>
  </ProtectedComponent>
 )
}

export default SearchUser

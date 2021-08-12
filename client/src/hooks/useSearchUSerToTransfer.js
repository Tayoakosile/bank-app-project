import { useCallback, useState } from 'react'
import { useMutation } from 'react-query'
import { postRequestToServer, axios } from '../api/api'
import useStore from '../zustand'

const useSearchUserToTransfer = () => {
 const [inputVal, setInputVal] = useState('')
 const { setTransferToUserDetails } = useStore(state => state)
 const { isLoading, mutate, data, error, isError, isSuccess } = useMutation(
  ({ url, acctNumber }) => {
   const res = axios.get(url, { params: { acctNumber } })
   console.log(res)
   return res
  }
 )

 const handleSearchUserAccountNumber = useCallback(
  e => {
   const userAccountNumber = e.target.value
   setInputVal(userAccountNumber)
   if (userAccountNumber.trim().length <= 0) {
    return
   }
   const request = {
    url: '/search',
    acctNumber: userAccountNumber,
   }
   mutate(request)
  },
  [inputVal, mutate]
 )
 const handleIntraTransfer = data => {
  setTransferToUserDetails(data)
 }
 return {
  setInputVal,
  inputVal,
  handleSearchUserAccountNumber,
  isLoading,
  data,
  error,
  isError,
  isSuccess,
  handleIntraTransfer,
 }
}

export default useSearchUserToTransfer

import { useState } from 'react'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router'
import { axios } from '../api/api'
import useStore from '../zustand'

const useSearchUserToTransfer = () => {
 const { user, setSearchUsersResult ,searchUsersResult} = useStore(state => state)
 const [inputVal, setInputVal] = useState('')
 const history = useHistory()
 const { isLoading, mutate, data, error, isError, isSuccess } = useMutation(
  async ({ url, acctNumber, loggedInUserID }) => {
   const res = await axios.get(url, { params: { acctNumber, loggedInUserID } })
   return res
  },
  {
   refetchOnWindowFocus: false,
   refetchOnmount: false,
   refetchOnReconnect: false,
   retry: false,
   staleTime: 400000,
   onSuccess: () => {
    return
   },
  }
 )

 /* Search for account number */
 const handleSearchUserAccountNumber = async e => {
  const userAccountNumber = e.target.value
  setInputVal(userAccountNumber)
  /* If user typed in atleast a value then run code */
  if (userAccountNumber.trim().length <= 0) {
   return
  }
  /* If user typed in atleast a value then run code */

  const request = {
   url: '/search',
   acctNumber: userAccountNumber,
   loggedInUserID: user._id,
  }
  const { url, loggedInUserID, acctNumber } = request
  const res = await axios.get(url, { params: { acctNumber, loggedInUserID } })
  if (res) {
   setSearchUsersResult(res)
  }
  mutate(request)
 }

 const handleIntraTransfer = data => {
  if (data) {
   history.push(`/account/transfer/user/set-amount/${data._id}`)
  }
 }

 return {
  setInputVal,
  inputVal,
  handleSearchUserAccountNumber,
  isLoading,
  data,
  isSuccess,
  error,
  isError,
  handleIntraTransfer,
 }
}

export default useSearchUserToTransfer

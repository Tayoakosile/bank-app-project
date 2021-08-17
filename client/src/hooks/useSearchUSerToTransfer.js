import { useCallback, useState } from 'react'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router'
import { axios } from '../api/api'

const useSearchUserToTransfer = () => {
 const [inputVal, setInputVal] = useState('')
 const history = useHistory()
 const { isLoading, mutate, data, error, isError, isSuccess } = useMutation(
  ({ url, acctNumber }) => {
   const res = axios.get(url, { params: { acctNumber } })
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
  error,
  isError,
  isSuccess,
  handleIntraTransfer,
 }
}

export default useSearchUserToTransfer

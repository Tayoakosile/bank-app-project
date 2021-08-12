import { useCallback, useState } from 'react'
import { useMutation } from 'react-query'
import { postRequestToServer, axios } from '../api/api'

const useSearchUserToTransfer = () => {
 const [inputVal, setInputVal] = useState('')
 const { isLoading, mutate, data, error, isError } = useMutation(
  ({ url, data }) => {
   const res = axios.get(url, axios)
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
    url: '/users/search',
    data: userAccountNumber,
   }
   mutate(request)
   console.log(inputVal)
  },
  [inputVal, mutate]
 )

 const people = [
  { name: 'Dan Abramov', image: 'https://bit.ly/dan-abramov' },
  { name: 'Kent Dodds', image: 'https://bit.ly/kent-c-dodds' },
  { name: 'Segun Adebayo', image: 'https://bit.ly/sage-adebayo' },
  { name: 'Prosper Otemuyiwa', image: 'https://bit.ly/prosper-baba' },
  { name: 'Ryan Florence', image: 'https://bit.ly/ryan-florence' },
 ]

 return { people, setInputVal, inputVal, handleSearchUserAccountNumber }
}

export default useSearchUserToTransfer

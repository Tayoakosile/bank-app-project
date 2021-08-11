import { useCallback, useState } from 'react'

const useSearchUserToTransfer = () => {
 const [inputVal, setInputVal] = useState('')

 const handleSearchUserAccountNumber = useCallback(
  e => {
   const userAccountNumber = e.target.value
   setInputVal(e.target.value)
   console.log(inputVal)
  },
  [inputVal]
 )
 const people = [
  { name: 'Dan Abramov', image: 'https://bit.ly/dan-abramov' },
  { name: 'Kent Dodds', image: 'https://bit.ly/kent-c-dodds' },
  { name: 'Segun Adebayo', image: 'https://bit.ly/sage-adebayo' },
  { name: 'Prosper Otemuyiwa', image: 'https://bit.ly/prosper-baba' },
  { name: 'Ryan Florence', image: 'https://bit.ly/ryan-florence' },
 ]

 return { people, setInputVal, inputVal ,handleSearchUserAccountNumber}
}

export default useSearchUserToTransfer

import { useToast } from '@chakra-ui/react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { reactLocalStorage } from 'reactjs-localstorage'
import { postRequestToServer } from '../api/api'
import useStore from '../zustand'

const useLogin = () => {
 const history = useHistory()
 const { setUser } = useStore(state => state)
 const toast = useToast()
 const {
  register,
  handleSubmit,
  formState: { errors, isValid },
 } = useForm({ mode: 'all' })

 //  Rerenders app

 //  Rerenders app
 //  If no errors,
 const onSubmit = useCallback(
  async data => {
   try {
    const form = await postRequestToServer('/login', data)
    if (form) {
     const {
      data: { token },
     } = form
     /* Make user details available throughout the app*/
     /* Make user details available throughout the app*/

     toast({
      position: 'top-right',
      status: 'success',
      duration: 3000,
      title: 'Login Successful',
      description: 'Redirecting to Dashboard',
      isClosable: true,
      onCloseComplete: () => {
       history.push('/dashboard')
      },
     })
     reactLocalStorage.set('userToken', token)
    }
   } catch (err) {
    console.log(err)
   }
  },
  [toast, history, ]
 )
 return { register, isValid, handleSubmit, onSubmit, errors }
}

export default useLogin

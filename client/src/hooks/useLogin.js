import { useToast } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { reactLocalStorage } from 'reactjs-localstorage'
import { axios, logUserIn } from '../api/api'
import useStore from '../zustand'
import useForceUpdate from './useFocreUpdate'

const useLogin = () => {
 const history = useHistory()
 const { setUser } = useStore(state => state)
 const toast = useToast()
 const {
  register,
  handleSubmit,
  setError,
  setValue,
  clearErrors,
  reset,
  isSubmitting,
  formState: { errors, isValid },
 } = useForm({ mode: 'all' })

 //  Rerenders app

 //  Rerenders app
 //  If no errors,
 const onSubmit = useCallback(
  async data => {
   try {
    const form = await logUserIn('/login', data)

    if (form) {
     const {
      data: { token },
     } = form
     setUser(form)
     /* Make user details available throughout the app*/

     console.log(form)
     toast({
      position: 'top-right',
      status: 'success',
      duration: 3000,
      title: 'Login Successful',
      description: 'Redirecting to Dashboard',
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
  [logUserIn, toast, history, setUser]
 )
 return { register, isValid, handleSubmit, onSubmit, errors }
}

export default useLogin

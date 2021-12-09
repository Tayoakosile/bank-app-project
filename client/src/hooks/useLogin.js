import { useToast } from '@chakra-ui/react'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router'
import { reactLocalStorage } from 'reactjs-localstorage'
import { postRequestToServer } from '../api/api'
import useStore from '../zustand'

const useLogin = () => {
 const history = useHistory()
 const toast = useToast()
 const {
  register,
  handleSubmit,
  setError,
  formState: { errors, isValid },
 } = useForm({ mode: 'onBlur' })

 const { mutate, isLoading, isError, isSuccess, data, error } = useMutation(
  formDetails => {
   const form = postRequestToServer('/login', formDetails)
   return form
  }
 )

 const onSubmit = data => {
  mutate(data)
 }

 useEffect(() => {
  console.log(isLoading, isError, isSuccess, data)
  /* If there was an error returned from the form */
  if (isSuccess) {
   const { data: usersDetails } = data
   reactLocalStorage.set('userToken', usersDetails.token)
   history.push('dashboard')
  }

  if (isError) {
   const { data } = error.response
   data.err == 'IncorrectEmailError' &&
    setError('email', {
     type: 'required',
     message: `This Email Isnt Registered,Please Sign Up to continue`,
    })
   data.err == 'IncorrectPasswordError' &&
    setError('password', {
     type: 'required',
     message: `Oops, Password is incorrect`,
    })
   console.log(data)
  }
 }, [isLoading, isError, isSuccess, data, error])

 return { register, isValid, handleSubmit, onSubmit, errors, isLoading }
}

export default useLogin

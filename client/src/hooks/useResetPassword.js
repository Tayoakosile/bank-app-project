import { useEffect, useState } from 'react'
import { postRequestToServer } from '../api/api'
import useReactForm from './useReactForm'

const useResetPassword = () => {
 const {
  register,
  errors,
  isValid,
  handleSubmit,
  setError,
  getValues,
  clearErrors,
 } = useReactForm()
 const [show, setShow] = useState(false)
 const [password, setShowPassword] = useState('')
 const [show2, setShow2] = useState(false)
 const handleClick = () => setShow(!show)
 const handleClick2 = () => setShow2(!show2)

 const resetPassword = password => {
  postRequestToServer('/reset-password/reset', password.password)
  console.log(password)
 }

 console.log(getValues('password'), getValues('confirmPassword'))

 const isPasswordSame = password => {
  if (getValues('confirmPassword') !== getValues('password')) {
   console.log('not equal', password)

   return false
  } else {
   console.log('equal')
   clearErrors('confirmPassword')
   return true
  }
 }

 return {
  register,
  errors,
  handleSubmit,
  show,
  handleClick,
  show2,
  handleClick2,
  isValid,
  password,
  setShowPassword,
  isPasswordSame,
  resetPassword,
 }
}

export default useResetPassword

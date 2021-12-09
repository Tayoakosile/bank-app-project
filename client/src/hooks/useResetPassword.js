import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useParams } from 'react-router'
import { postRequestToServer } from '../api/api'
import useReactForm from './useReactForm'

const useResetPassword = () => {
 const { register, errors, isValid, handleSubmit, getValues, clearErrors } =
  useReactForm()
 const [formSuccess, setFormSuccess] = useState(false)
 const [password, setShowPassword] = useState('')
 const [show2, setShow2] = useState(false)
 const [isPasswordExpired, setIsPasswordExpired] = useState(false)
 const handleClick2 = () => setShow2(!show2)
 const { _id, secretCode } = useParams()

 const { isLoading, isError, error, data, isSuccess, mutate } = useMutation(
  newPassword => {
   const sendResetRequest = postRequestToServer('/reset-password/reset', {
    _id,
    password: newPassword,
   })
   return sendResetRequest
  }
 )

 useEffect(() => {
  console.log(isLoading, isError, error, data, isSuccess)
  isSuccess && setFormSuccess(true)
  if (isError) {
  }
 }, [isLoading, isError, error, data, isSuccess])

 /* Sends a request to reset users password */
 const resetPassword = async password => {
  const { password: newPassword } = password
  mutate(newPassword)
 }

 /* Checks if password is same as confirm password */
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

 /* Check if password link is valid  */
 useEffect(() => {
  async function isUserResetPasswordLinkValid() {
   try {
    const isUserLinkStillValid = await postRequestToServer(
     `/reset-password/reset/${_id}/${secretCode}`
    )
    if (isUserLinkStillValid) {
     console.log(`valid code`, isUserLinkStillValid)
    }
   } catch (err) {
    setIsPasswordExpired(true)
    console.log(err)
   }
  }
  isUserResetPasswordLinkValid()
 }, [_id, secretCode, setIsPasswordExpired])

 /* Resets users password */

 /* Resets users password */
 return {
  register,
  errors,
  handleSubmit,
  show2,
  handleClick2,
  isValid,
  isSuccess,
  isError,
  password,
  setShowPassword,
  isPasswordSame,
  resetPassword,
  isPasswordExpired,
  formSuccess,
 }
}

export default useResetPassword

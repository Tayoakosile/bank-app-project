import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { postRequestToServer } from '../api/api'
import useReactForm from './useReactForm'

const useResetPassword = () => {
 const {
  register,
  errors,
  isValid,
  handleSubmit,
  getValues,
  clearErrors,
 } = useReactForm()
 const [show, setShow] = useState(false)
 const [password, setShowPassword] = useState('')
 const [show2, setShow2] = useState(false)
 const handleClick = () => setShow(!show)
 const handleClick2 = () => setShow2(!show2)
 const { _id, secretCode } = useParams()
 console.log(secretCode)

 /* Sends a request to reset users password */
 const resetPassword = async password => {
  const { password: newPassword } = password
  console.log('newPassword', newPassword)

  try {
   const sendResetRequest = postRequestToServer('/reset-password/reset', {
    _id,
    password: newPassword,
   })
   if (sendResetRequest) {
   }
  } catch (err) {
   console.log(err)
  }
 }
 /* Sends a request to reset users password */

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
    console.log(err)
   }
  }
  isUserResetPasswordLinkValid()
 }, [_id, secretCode])
 /* Check if password link is valid  */

 /* Resets users password */
 
 /* Resets users password */
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

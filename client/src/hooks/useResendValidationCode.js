import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { postRequestToServer } from '../api/api'

const useResendValidationCode = () => {
 const {
  register,
  handleSubmit,
  formState: { errors, isValid, isSubmitting },
  reset,
 } = useForm({ mode: 'onTouched' })

 const RequestPasswordRequest = useCallback(
  data => {
   console.log(data)
   async function fetchData() {
    try {
     const resetPassword = await postRequestToServer('/reset-password', data)
     if (resetPassword) {
      console.log(resetPassword)
      await document.getElementById('resetpasswordform').reset()
     }
    } catch (err) {
     if (err) {
      console.log(err.response)
     }
    }
   }
   fetchData()
  },
  [document]
 )

 return { handleSubmit, register, errors, isValid, RequestPasswordRequest }
}

export default useResendValidationCode

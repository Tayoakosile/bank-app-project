import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import api, { postRequestToServer } from '../api/api'

const useResendValidationCode = () => {
 const {
  register,
  handleSubmit,
  formState: { errors, isValid, isSubmitting },
  reset,
 } = useForm({ mode: 'all' })

 const RequestPasswordRequest = useCallback(data => {
  async function findEmail() {
   try {
    const resetPassword = await postRequestToServer('/reset-password', data)
    if (resetPassword) {
     console.log(resetPassword)
     console.log(data)
     reset({ data })
    }
   } catch (err) {
    console.log(err.response)
   }
  }
  findEmail()
 }, [])

 return { handleSubmit, register, errors, isValid, RequestPasswordRequest }
}

export default useResendValidationCode

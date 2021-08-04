import React from 'react'
import { useForm } from 'react-hook-form'

const useReactForm = () => {
 const {
  register,
  clearErrors,
  handleSubmit,
  reset,
  setError,
  formState: { errors, isValid, isSubmitting },
 } = useForm()
 return {
  register,
  clearErrors,
  handleSubmit,
  reset,
  setError,
  errors,
  isValid,
  isSubmitting,
 }
}

export default useReactForm

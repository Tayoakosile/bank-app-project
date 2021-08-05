import { useForm } from 'react-hook-form'

const useReactForm = () => {
 const {
  register,
  clearErrors,
  handleSubmit,
  reset,
  getValues,
  setError,
  formState: { errors, isValid, isSubmitting },
 } = useForm({ mode: 'all' })
 return {
  register,
  clearErrors,
  handleSubmit,
  reset,
  setError,
  errors,
  isValid,
  isSubmitting,
  getValues,
 }
}

export default useReactForm

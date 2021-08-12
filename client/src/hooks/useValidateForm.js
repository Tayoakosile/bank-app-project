import { useToast } from '@chakra-ui/react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { isUserEmailUnique, postRequestToServer } from '../api/api'
import useStore from '../zustand/index'

const useValidateForm = () => {
 // This will either send a success or error toast depending on user form validation
 const toast = useToast()
 const history = useHistory()
 //   Global State Manager
 const { setData } = useStore(state => state)
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

 // Checks if user password contains a number
 console.log(errors)

 const handleValidateEmail = useCallback(
  (verify, mode) => {
   isUserEmailUnique('/validate', mode, verify)
    .then(res => {
     return true
    })
    .catch(err => {
     setError(`${mode}`, {
      type: 'required',
      message: `This ${mode} is already registered, Try using a different ${mode} or login to our account`,
     })
     return false
    })
  },

  [setError]
 )

 // Submit form
 const onSubmit = form => {
  if (form) {
   postRequestToServer('/', form)
    .then(res => {
     toast({
      title: 'Account Successfully created.',
      position: 'top-right',
      description: 'Your account has been successfully created',
      status: 'success',
      duration: 3000,
      isClosable: true,
      onCloseComplete: () => {
       setData(form.email)
       history.push('/verifyaccount')
      },
     })
     document.getElementById('myForm').reset()
     reset({ form })
     return res
    })
    .catch(err => {
     console.log(err)
     return err
    })
  }
 }
 // Submit form
 return {
  register,
  handleSubmit,
  onSubmit,
  isSubmitting,
  handleValidateEmail,
  errors,
  isValid,
  clearErrors,
  setValue,
 }
}

export default useValidateForm

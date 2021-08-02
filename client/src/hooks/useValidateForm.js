import { useToast } from '@chakra-ui/react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { axios, isUserEmailUnique, createNewUser } from '../api/api'
import useStore from '../zustand/index'

const useValidateForm = () => {
 // This will either send a success or error toast depending on user form validation
 const toast = useToast()
 const history = useHistory()
 //   Global State Manager
 const newZustandUser = useStore(state => state.setData)
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
   createNewUser("/",form)
    .then(res => {
     newZustandUser(form.email)
     document.getElementById('myForm').reset()
     reset({ form })
     clearErrors()
     toast({
      title: 'Account Successfully created.',
      position: 'top-right',
      description: 'Your account has been successfully created',
      status: 'success',
      duration: 4000,
      isClosable: true,
      onCloseComplete: () => {
       history.push('/verifyaccount')
       console.log('completed')
      },
     })

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

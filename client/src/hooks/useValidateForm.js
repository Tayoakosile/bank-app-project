import { useToast } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { isUserEmailUnique, postRequestToServer } from '../api/api'
import useStore from '../zustand/index'

const useValidateForm = () => {
 /* Labels */
 const [isFirstNameActive, setIsFirstNameActive] = useState(false)
 const [isLastNameActive, setIsLastNameActive] = useState(false)
 const [isUserNameActive, setIsUserNameActive] = useState(false)
 const [isEmailActive, setIsEmailActive] = useState(false)
 const [isPasswordActive, setIsPasswordActive] = useState(false)
 const [showPassword, setShowPassword] = useState(true)

 /* Toggles password visibility */
 const handleShowPassword = () => setShowPassword(!showPassword)
 /* Toggles password visibility */

 /* Make label stay on top if user has inputed a value */

 /* First name check */
 const handleFirstNameChange = text =>
  text !== '' ? setIsFirstNameActive(true) : setIsFirstNameActive(false)

 /* Last name check */
 const handleLastNameChange = text =>
  text !== '' ? setIsLastNameActive(true) : setIsLastNameActive(false)

 /* Username check */
 const handleUserNameChange = text =>
  text !== '' ? setIsUserNameActive(true) : setIsUserNameActive(false)

 /* Email check */
 const handleEmailChange = text =>
  text !== '' ? setIsEmailActive(true) : setIsEmailActive(false)

 /* Email check */
 const handlePasswordChange = text =>
  text !== '' ? setIsPasswordActive(true) : setIsPasswordActive(false)

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
 } = useForm({ mode: 'all', shouldFocusError: true })

 /* Checks if user is already registered in database, throws error if registered */
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

 return {
  register,
  handleSubmit,
  onSubmit,
  errors,
  clearErrors,
  setValue,
  showPassword,
  handleValidateEmail,
  handleFirstNameChange,
  handleLastNameChange,
  handleUserNameChange,
  handleEmailChange,
  handlePasswordChange,
  handleShowPassword,
  isFirstNameActive,
  isSubmitting,
  isLastNameActive,
  isEmailActive,
  isUserNameActive,
  isValid,
  isPasswordActive,
 }
}

export default useValidateForm

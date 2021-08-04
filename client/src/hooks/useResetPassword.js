import { useState } from 'react'
import useReactForm from './useReactForm'

const useResetPassword = () => {
 const { register, errors, isValid, handleSubmit } = useReactForm()
 const [show, setShow] = useState(false)
 const [show2, setShow2] = useState(false)
 const handleClick = () => setShow(!show)
 const handleClick2 = () => setShow2(!show2)

 const resetPassword = password => {
  console.log(password)
 }
 return { register, errors, handleSubmit, show, handleClick, show2, handleClick2 }
}

export default useResetPassword

import { useDisclosure } from '@chakra-ui/hooks'
import { useEffect } from 'react'
import { useMutation } from 'react-query'
import { Redirect, useHistory } from 'react-router-dom'
import { reactLocalStorage } from 'reactjs-localstorage'
import { axios } from '../../api/api'

const useTransferFundz = () => {
 /* Post request */
 const history = useHistory()
 const { isOpen, onToggle } = useDisclosure()
 /* Get User Transaction details from the local storage */
 const transferToUserDetailFromLocalStorage =
  reactLocalStorage.getObject('transactionUser')
 const { mutate, isLoading, isSuccess, isError, data, error } = useMutation(
  async pin => {
   const checkPin = await axios.post('/transaction/validatepin', pin)
   return checkPin
  }
 )

 useEffect(() => {
  if (isSuccess) {
   history.push('/account/transfer/user/transfer-success')
  }
 }, [isSuccess])
 /* Post request */

 const {
  transferSum,
  receiverInfo: {
   firstname,
   lastname,
   account: { account_number },
  },
 } = transferToUserDetailFromLocalStorage

 const handlePayment = () => {
  onToggle()
 }

 /* Validate pin on server */
 const handlePinValidation = pin => {
  const {
   loggedInUserID,
   transferSum,
   receiverInfo: { _id },
  } = transferToUserDetailFromLocalStorage
  if (pin) {
   mutate({
    pin: Number(pin),
    _id: loggedInUserID,
    transferSum,
    receiverID: _id,
   })
  }
 }

 console.log(isError, error)

 return {
  firstname,
  lastname,
  account_number,
  transferSum,
  Redirect,
  handlePinValidation,
  handlePayment,
  isError,
  isLoading,
  isOpen,
  transferToUserDetailFromLocalStorage,
  history
 }
}

export default useTransferFundz

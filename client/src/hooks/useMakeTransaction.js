import useStore from '../zustand'
import useReactForm from './useReactForm'

import { usePaystackPayment } from 'react-paystack'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { axios } from '../api/api'
import useAuth from '../auth/useAuth'
import randomatic from 'randomatic'

const useMakeTransaction = () => {
 const { isSuccess } = useAuth()
 const { method } = useParams()
 const [userDetails, setUserDetails] = useState('')
 const { register, handleSubmit, errors, isValid, getValues } = useReactForm()
 const { user } = useStore(state => state)
 const payStackRef = randomatic('0A', 18)

 const fundAccount = data => {}

 useEffect(() => {
  if (user) {
   setUserDetails(user)
  }
 }, [user])


 const { email, _id, account } = userDetails !== undefined && userDetails
 const { _id: accountId } = account !== undefined && account
 const amountConvertedToKobo = getValues('amount') * 100
 const config = {
  email: email,
  amount: amountConvertedToKobo,
  reference: payStackRef,
  publicKey: 'pk_test_694a577e5f90d7aa51e008eb96a6349436c0744a',
  label: 'Fund your Account',
  channels: [method],
  metadata: {
   userId: _id,
   accountId,
   transactionType: 'credit',
   narration: 'Wallet funding',
  },
 }

 const onSuccess = reference => {
  const { reference: ref, trxref } = reference
  console.log(payStackRef)
  axios
   .get('/transaction/verify', {
    params: {
     reference: ref,
     trxref,
    },
   })
   .then(res => {
    console.log(res)
   })
   .catch(err => console.log(err))

  console.log(reference)
 }

 const onClose = reference => {
  console.log('closed', reference, payStackRef)

  axios.get('/transaction/verify', {
   params: {
    reference: payStackRef,
   },
  })
 }

 const initializePayment = usePaystackPayment(config)
 return {
  register,
  handleSubmit,
  fundAccount,
  isValid,
  initializePayment,
  onSuccess,
  onClose,
 }
}

export default useMakeTransaction

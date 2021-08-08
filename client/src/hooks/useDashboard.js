import { useEffect, useState } from 'react'
import useStore from '../zustand'
import randomize from 'randomatic'
import { usePaystackPayment } from 'react-paystack'

const useDashboard = () => {
 const [userDetails, setUserDetails] = useState('***')

 const {
  user: { getUserInfo },
 } = useStore(state => state)
 console.log(getUserInfo)
 useEffect(() => {
  if (getUserInfo) {
   setUserDetails(getUserInfo)
  }
 }, [getUserInfo])

 const { balance } = userDetails.account !== undefined && userDetails.account

 console.log(process.env.PAYSTACK_API_KEY_PUBLIC)
 /* initialize paystack transaction */
 const config = {
  reference: randomize(`0A1`,14),
  email: `oluwatayocodes@gmail.com`,
  amount: 20000,
  publicKey: `pk_test_694a577e5f90d7aa51e008eb96a6349436c0744a`,
  channels: ['card'],
  label: 'Fund your account',
  metadata: {
   name: 'tayo',
  },
 }
 const onSuccess = reference => {
  console.log(reference)
 }
 
 const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log('closed')
 }
 /* initialize paystack transaction */
 const initializePayment = usePaystackPayment(config)
 return { balance, initializePayment, onSuccess, onClose }
}

export default useDashboard

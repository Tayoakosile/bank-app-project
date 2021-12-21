import { useEffect, useState } from 'react'
import useStore from '../zustand'
import randomize from 'randomatic'
import { usePaystackPayment } from 'react-paystack'

const useDashboard = () => {
 const [userDetails, setUserDetails] = useState('***')

 const {
  user 
 } = useStore(state => state)
 useEffect(() => {
  if (user) {
   setUserDetails(user)
  }
 }, [user])

 const { balance } = userDetails.account !== undefined && userDetails.account

 /* initialize paystack transaction */
 const config = {
  reference: randomize(`0A1`,14),
  email: `oluwatayocodes@gmail.com`,
  amount: 20000,
  publicKey: `pk_test_694a577e5f90d7aa51e008eb96a6349436c0744a`,
  channels: ['card'],
  label: 'Fund youssr account',
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

import { Box } from '@chakra-ui/layout'
import React from 'react'
import ProtectedComponent from '../../components/ProtectedComponent'
import PaymentMethod from './PaymentMethod'

const FundAccount= () => {
 const paymentMethod = [
  'card',
  'bank',
  'ussd',
  'qr',
  'mobile_money',
  'bank_transfer',
 ]
 return (
  <ProtectedComponent>
   {paymentMethod.map(payWith => (
    <PaymentMethod method={payWith} />
   ))}
  </ProtectedComponent>
 )
}

export default FundAccount

import randomatic from 'randomatic'
import React from 'react'
import ProtectedComponent from '../../components/ProtectedComponent'
import PaymentMethod from './PaymentMethod'

const FundAccount = () => {
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
   {paymentMethod.map(method => (
    <PaymentMethod key={randomatic('0a',12)} methodOfPayment={method} />
   ))}
  </ProtectedComponent>
 )
}

export default FundAccount

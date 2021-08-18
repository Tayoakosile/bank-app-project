import { Button } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import ProtectedComponent from '../../components/ProtectedComponent'
import useTransferFundz from './useTransferFundz'

const TransferSuccess = () => {
 const [redirect, setRedirect] = useState(false)
 const { transferToUserDetailFromLocalStorage, history } = useTransferFundz()
 console.log(transferToUserDetailFromLocalStorage)
 const {
  transferSum,
  receiverInfo: {
   firstname,
   lastname,
   account: { account_number },
  },
 } = transferToUserDetailFromLocalStorage
 return (
  <ProtectedComponent>
   {`You successfully transferred the sum of ${transferSum} to ${firstname} ${lastname} ${account_number}`}
   <Button
    onClick={() => {
     history.push(`/dashboard`)
     setRedirect(true)
    }}
   >
    Complete
   </Button>
   {redirect && <Redirect to="/dashboard"></Redirect>}
  </ProtectedComponent>
 )
}

export default TransferSuccess

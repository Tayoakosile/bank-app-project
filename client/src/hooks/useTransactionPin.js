import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router'
import { axios } from '../api/api'
import useAuth from '../auth/useAuth'
import useStore from '../zustand'

const useTransactionPin = () => {
 const { user } = useStore(state => state)
 const history = useHistory()

 const [userDetail, setUserDetail] = useState({ pin: null, _id: null })
 useEffect(() => {
  if (user) {
   setUserDetail({ _id: user._id, pin: user.transaction_pin })
  }
 }, [user, userDetail._id, userDetail.pin])
 console.log(userDetail)

 const NewPin = async pin => {
  const setTransPin = await axios.put('/transaction/set-pin', {
   _id: userDetail._id,
   pin,
  })
 }
 const redirectToConfirmPassword = (userPin) => {
     if(userPin){
         history.push('/account/transaction-pin/confirm')
     }
 }
 return { NewPin, userDetail, redirectToConfirmPassword }
}

export default useTransactionPin
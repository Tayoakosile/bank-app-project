import React, { useEffect, useState } from 'react'
import useStore from '../zustand/index'
import axios, { postRequestToServer } from '../api/api'
import { useParams, useHistory } from 'react-router-dom'

const useVerifyAccount = () => {
 const [userStatus, setUserStatus] = useState('')
 // get users details from url parameter
 const { _id, secretCode } = useParams()
 const history = useHistory()
 // get users details from url parameter
 // set User email address
 const email = useStore(state => state.email)
 // set User email address
 useEffect(() => {
  console.log('Zustand email', email)
 }, [email])

 //  Send request to  User details
 useEffect(async () => {
  try {
   const verifyAccount = await postRequestToServer(
    `/verification/verify-account/${_id}/${secretCode}`
   )
   await setUserStatus(verifyAccount)
   console.log(verifyAccount)
  } catch (err) {
   console.log(err)
  }
 }, [postRequestToServer, secretCode, _id])

 return { email, userStatus }
}

export default useVerifyAccount

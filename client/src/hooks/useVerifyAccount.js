import React, { useEffect } from 'react'
import useStore from '../zustand/index'
import axios, { postRequestToServer } from '../api/api'
import { useParams, useHistory } from 'react-router-dom'

const useVerifyAccount = () => {
 // get users details from url parameter
 const { _id, secretCode } = useParams()
 const history = useHistory()
 const userDetails = { _id, secretCode }
 // get users details from url parameter
 // set User email address
 const email = useStore(state => state.email)
 // set User email address
 useEffect(() => {
  console.log('Zustand email', email)
 }, [email])

 //  Send request to  User details
 useEffect(() => {
  postRequestToServer(`
  /verification/verify-account/${_id}/${secretCode}`)
 })
 
 return { email }
}

export default useVerifyAccount

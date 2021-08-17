import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { postRequestToServer } from '../api/api'
import useStore from '../zustand/index'

const useVerifyAccount = () => {
 const [userStatus, setUserStatus] = useState('')
 // get users details from url parameter
 const { _id, secretCode } = useParams()
 // get users details from url parameter
 // set User email address
 const email = useStore(state => state.email)

 //  Send request to  User
 useEffect(() => {
  async function fetchData() {
   try {
    const verifyAccount = await postRequestToServer(
     `/verification/verify-account/${_id}/${secretCode}`
    )
    await setUserStatus(verifyAccount)
    console.log(verifyAccount)
   } catch (err) {
    console.log(err)
   }
  }
  fetchData()
 }, [secretCode, _id])

 return { email, userStatus }
}

export default useVerifyAccount

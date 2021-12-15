import { useEffect, useState } from 'react'
import { QueryClient, useQuery } from 'react-query'
import { useHistory, useParams } from 'react-router-dom'
import { reactLocalStorage } from 'reactjs-localstorage'
import { axios } from '../api/api'
import useStore from '../zustand'
import useReactForm from './useReactForm'

const useIntraTransferTransfer = () => {
 const { _id } = useParams()
 const { user } = useStore(state => state)
 const userID = user._id

 console.log('Zustand user', user)
 const history = useHistory()
 const queryClient = new QueryClient()
 const [userInfo, setUserInfo] = useState('')
 const { register, errors, handleSubmit, setError, isValid } = useReactForm()

 /*get users _id in the url params and fetch the users information  */

 const { isLoading, data, isSuccess } = useQuery(
  'fetchSingleUser',
  async () => {
   const { data } = await axios.get('/fetch', { params: { _id } })
   return data
  },
  {
   refetchOnMount: true,
   staleTime: 1,
   cacheTime: 1,
   onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries('fetchSingleUser')
   },
  }
 )

 /*get users _id in the url params and fetch the users information  */
 /* Wait for the data to be fetched frm the server then make it shareable to other component */
 useEffect(() => {
  if (isSuccess) {
   console.log(data)
   setUserInfo(data.user)
  }
 }, [isSuccess])

 const { firstname, lastname, account } = userInfo !== undefined && userInfo
 const { account_number } = account !== undefined && account
 /* Wait for the data to be fetched frm the server then make it shareable to other component */

 console.log(errors)
 /* User Details */

 const handleUserTransfer = amount => {
  const receiverInfo = userInfo
  const loggedInUserID = user._id
  const transferSum = Number(amount.transfer)
  const transferBetweenUser = { transferSum, receiverInfo, loggedInUserID }
  console.log(user._id, receiverInfo._id)
  reactLocalStorage.setObject('transactionUser', transferBetweenUser)
  history.push('/account/transfer/user/transfer-confirmation')
 }

 return {
  data,
  isLoading,
  userID,
  errors,
  firstname,
  account_number,
  lastname,
  account,
  _id,
  isSuccess,
  setError,
  register,
  handleSubmit,
  isValid,
  handleUserTransfer,
 }
}

export default useIntraTransferTransfer

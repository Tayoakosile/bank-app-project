import { useEffect, useState } from 'react'
import { useMutation, useQuery, QueryClient } from 'react-query'
import { useParams } from 'react-router'
import { axios } from '../api/api'
import useReactForm from './useReactForm'

const useSetAmountToTransfer = () => {
 const queryClient = new QueryClient()
 const [userInfo, setUserInfo] = useState('')
 const { _id } = useParams()
 const { register, errors, handleSubmit, setError, getValues } = useReactForm()

 const { isLoading, data, error, isSuccess } = useQuery(
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

 useEffect(() => {
  if (isSuccess) {
   console.log(data)
   setUserInfo(data.user)
  }
 }, [isSuccess])

 const { email, firstname, lastname, account } =
  userInfo !== undefined && userInfo
 const { account_number } = account !== undefined && account

 return {
  data,
  isLoading,
  error,
  firstname,
  account_number,
  lastname,
  account,
  isSuccess,
 }
}

export default useSetAmountToTransfer

import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { reactLocalStorage } from 'reactjs-localstorage'
import { axios } from '../api/api'
import useStore from '../zustand/index'

const useAuth = url => {
 const { setUserId, userId, setData, email } = useStore(state => state)
 const token = reactLocalStorage.get('userToken', true)
 const { error, isLoading, isSuccess, data, isError } = useQuery(
  url,
  async () => {
   const { data } = await axios.get('/authorize', {
    headers: {
     'Access-Control-Allow-Origin': '*',
     'Content-type': 'Application/json',
     Authorization: `Bearer ${token}`,
    },
   })

   return await data
  }
 )
 useEffect(() => {
  if (isSuccess) {
   setUserId(data.authorizedData.userId)
   setData(data.authorizedData.email)
   console.log(data.authorizedData.userId)
  }
 }, [isSuccess, setUserId, setData])
 console.log(data)

 return { error, isLoading, isSuccess, data, isError, userId, email }
}

export default useAuth

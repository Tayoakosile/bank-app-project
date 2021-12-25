import queryString from 'query-string'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { axios } from '../api/api'

const useVerifyTransaction = () => {
 const location = queryString.parse(useLocation().search)
 useEffect(() => {
  async function VerifyTransaction() {
   const transactionRef = axios.get('/transaction/verify', {
    params: location,
   })
  }
  VerifyTransaction()
 }, [location])

 return { location }
}

export default useVerifyTransaction

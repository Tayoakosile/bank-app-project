import { useEffect, useState } from 'react'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import { getDataFromServer, axios } from '../api/api'

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

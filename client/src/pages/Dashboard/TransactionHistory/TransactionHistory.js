import { Box, Text } from '@chakra-ui/layout'
import randomatic from 'randomatic'
import React, { useEffect, useState } from 'react'
import useAuth from '../../../auth/useAuth'

const TransactionHistory = () => {
 const { data } = useAuth()
 const [transactions, setTransactions] = useState('')

 useEffect(() => {
  if (data) {
   setTransactions(data.authorizedData.transactions)
  }
 }, [data])

 console.log(transactions)

 return (
  <Box pl={{ base: '20px' }}>
   {Array.from(transactions).map(({ amount, narration, status }) => (
    <React.Fragment key={randomatic('0a', 12)}>
     <Text>{amount}</Text>
     <Text>{narration}</Text>
     <Text>{status}</Text>
    </React.Fragment>
   ))}
  </Box>
 )
}

export default TransactionHistory

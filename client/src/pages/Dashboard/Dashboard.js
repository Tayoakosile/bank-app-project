import { Box, Heading } from '@chakra-ui/layout'
import React from 'react'
import ProtectedComponent from '../../components/ProtectedComponent'
import useStore from '../../zustand'
import BasicStatistics from './Stats'
import TransactionHistory from './TransactionHistory/TransactionHistory'
const Dashboard = () => {
 const { user } = useStore(state => state)

 return (
  <ProtectedComponent>
   <BasicStatistics />
   <Box mt="7rem">
    <TransactionHistory />
   </Box>
  </ProtectedComponent>
 )
}

export default Dashboard

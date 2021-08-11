import { Box, Heading } from '@chakra-ui/layout'
import React from 'react'
import ProtectedComponent from '../../components/ProtectedComponent'
import useStore from '../../zustand'
import BasicStatistics from './Stats'
const Dashboard = () => {
 const { user } = useStore(state => state)

 return (
  <ProtectedComponent>
   <BasicStatistics />
   <Box mt ='7rem'>
    <Heading>Things to do</Heading>
   </Box>
  </ProtectedComponent>
 )
}

export default Dashboard

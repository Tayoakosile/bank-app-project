import React from 'react'
import ProtectedComponent from '../../components/ProtectedComponent'
import useStore from '../../zustand'
import BasicStatistics from './Stats'
const Dashboard = () => {
 const { user } = useStore(state => state)

 return (
  <ProtectedComponent>
   <BasicStatistics />
  </ProtectedComponent>
 )
}

export default Dashboard

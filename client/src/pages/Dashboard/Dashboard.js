import React from 'react'
import useAuth from '../../auth/useAuth'

const Dashboard = () => {
    const { isSuccess, isLoading, data, isError } = useAuth()
 console.log(data, isSuccess)

 if (isLoading) {
  return <div>Loading</div>
 }

 return (
   <div>Dashborad</div>
 )
}

export default Dashboard

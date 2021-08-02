import React from 'react'
import { Redirect } from 'react-router'
import useAuth from '../../auth/useAuth'

const Dashboard = () => {
 const { isSuccess, isLoading, data, isError, userStatus } = useAuth()
 console.log(data, isSuccess, isError, data, userStatus)

 if (isLoading) {
  return <div>Loading</div>
 }
 if (isError) {
  return <Redirect to="/login"></Redirect>
 }
 return (
  <>
   {userStatus === 'active' ? (
    <div>Dashborad</div>
   ) : (
    <Redirect to="/verifyaccount"></Redirect>
   )}
  </>
 )
}

export default Dashboard

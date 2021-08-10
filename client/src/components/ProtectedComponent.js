import React, { useState } from 'react'
import { Redirect } from 'react-router'
import useAuth from '../auth/useAuth'

const ProtectedComponent = ({ children ,...rest}) => {
 const { isSuccess, isLoading, data, isError } = useAuth()
 if (isLoading) {
  return <div>Loading</div>
 }
 if (isError) {
  return <Redirect to="/login"></Redirect>
 }
 console.log(data)
 if (isSuccess) {
  const { authorizedData: result } = data
  const { status: UserStatus } = result

  return (
   <>
    {UserStatus === 'active' ? (
     <>{children}</>
    ) : (
     <Redirect to="/verifyaccount"></Redirect>
    )}
   </>
  )
 }
}

export default ProtectedComponent

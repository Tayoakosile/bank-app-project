import React, { useState } from 'react'
import { Redirect } from 'react-router'
import useAuth from '../auth/useAuth'

const ProtectedComponent = ({ children }) => {
 const { isSuccess, isLoading, data, isError } = useAuth()
 if (isLoading) {
  return <div>Loading</div>
 }
 if (isError) {
  return <Redirect to="/login"></Redirect>
 }
 if (isSuccess) {
  const { getUserInfo: result } = data.authorizedData
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

import React from 'react'
import { Route, Switch } from 'react-router-dom'
import {
 Dashboard,
 FundAccount,
 Login,
 ResetPassword,
 ResetPasswordStatus,
 SignUp,
 VerifiedStatus,
 VerifyAccount,
 VerifyError,
 VerifySuccess,
 VerifyTransaction,
} from './pages'

const App = () => {
 return (
  <Switch>
   <Route exact path="/signup">
    <SignUp />
   </Route>

   <Route exact path="/login">
    <Login />
   </Route>

   <Route path="/verifyaccount">
    <VerifyAccount />
   </Route>

   <Route exact path="/verification/verify-account/:_id/:secretCode">
    <VerifiedStatus />
   </Route>

   <Route exact path="/verification/verify-account/verify-error">
    <VerifyError />
   </Route>

   <Route exact path="/verification/verify-account/verify-success">
    <VerifySuccess />
   </Route>

   <Route exact path="/reset-password">
    <ResetPassword />
   </Route>

   <Route exact path="/reset-password/:_id/:secretCode">
    <ResetPasswordStatus />
   </Route>

   <Route exact path="/dashboard">
    <Dashboard />
   </Route>

   <Route exact path="/paystack/callback">
    <VerifyTransaction />
   </Route>
   
   {/* Fund account */}
   <Route exact path="/account/fund-account">
    <FundAccount />
   </Route>
   {/* Fund account */}
   <Route exact path="/">
    Welcome
   </Route>
  </Switch>
 )
}

export default App

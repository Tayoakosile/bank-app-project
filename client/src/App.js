import React from 'react'
import { Route, Switch } from 'react-router-dom'
import {
 Dashboard,
 Login,
 ResetPassword,
 ResetPasswordStatus,
 SignUp,
 VerifiedStatus,
 VerifyAccount,
 VerifyError,
 VerifySuccess,
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
    <Dashboard title="title" stat="sta" />
   </Route>

   <Route exact path="/">
    Welcome
   </Route>
  </Switch>
 )
}

export default App

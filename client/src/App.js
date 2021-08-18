import React from 'react'
import { Route, Switch } from 'react-router-dom'
import {
 SignUp,
 Login,
 ResetPassword,
 ResetPasswordStatus,
 VerifiedStatus,
 VerifyAccount,
 VerifyError,
 VerifySuccess,
 VerifyTransaction,
 Dashboard,
 FundAccount,
 FundAccountMethod,
 TransactionPin,
 TransactionPinConfirm,
 SearchRegisteredUser,
 SetAmountToTransfer,
 TransferFundzToUser,
 TransferSuccess,
 Profile,
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
   <Route exact path="/account/fund-account/method/:method">
    <FundAccountMethod />
   </Route>
   {/* Fund account */}
   {/* Transaction pin */}
   <Route exact path="/account/transaction-pin/set">
    <TransactionPin />
   </Route>
   <Route exact path="/account/transaction-pin/confirm">
    <TransactionPinConfirm />
   </Route>
   {/* Transaction pin */}

   {/* Transfer between users */}

   <Route exact path="/account/transfer/user">
    <SearchRegisteredUser />
   </Route>

   <Route exact path="/account/transfer/user/set-amount/:_id">
    <SetAmountToTransfer />
   </Route>
   <Route exact path="/account/transfer/user/transfer-confirmation">
    <TransferFundzToUser />
   </Route>
   <Route exact path="/account/transfer/user/transfer-success">
    <TransferSuccess />
   </Route>
   {/* Transfer between users */}

   {/* Users Profile */}
   <Route exact path="/account/profile">
    <Profile />
   </Route>
   {/* Users Profile */}

   <Route exact path="/">
    Welcome
   </Route>
  </Switch>
 )
}

export default App

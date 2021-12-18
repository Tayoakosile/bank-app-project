import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  SignUp,
  Login,
  ResetPassword,
  ResetPasswordStatus,
  ResetPasswordCodeSent,
  VerifiedStatus,
  Home,
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
  IntraTransferTransfer,
  TransferFundzToUser,
  TransferSuccess,
  Profile,
  Navigation,
  ConfirmUserTransfer,
  TransferInfo,
  TransactionSuccessful,
} from "./pages";

const App = () => {
  return (
    <React.Fragment>
      <Navigation />

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
        {/* Reset password */}
        <Route exact path="/reset-password">
          <ResetPassword />
        </Route>
        <Route exact path="/reset-confirm">
          <ResetPasswordCodeSent />
        </Route>
        <Route exact path="/reset-password/:_id/:secretCode">
          <ResetPasswordStatus />
        </Route>
        {/* Reset password */}
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
        <Route exact path="/account/transfer/monsecure">
          <IntraTransferTransfer />
        </Route>
        <Route exact path="/account/transfer/monsecure/confirm">
          <ConfirmUserTransfer />
        </Route>

        <Route exact path="/account/transfer/monsecure/confirm/pin">
          <TransferInfo />
        </Route>

        <Route exact path="/account/transfer/monsecure-success">
          <TransactionSuccessful />
        </Route>

        <Route exact path="/account/transfer/bank">
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
          <Home />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default App;

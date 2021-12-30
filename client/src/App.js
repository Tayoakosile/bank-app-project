import { AnimatePresence } from "framer-motion";
import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import {
  AllTransactions,
  Setting,
  ConfirmUserTransfer,
  Dashboard,
  FundAccount,
  FundSuccess,
  Home,
  IntraTransferTransfer,
  Login,
  Navigation,
  Notification,
  Profile,
  ResetPassword,
  ResetPasswordCodeSent,
  ResetPasswordStatus,
  SearchRegisteredUser,
  SignUp,
  TransactionPin,
  TransactionPinConfirm,
  TransactionSuccessful,
  TransferFundzToUser,
  TransferInfo,
  TransferSuccess,
  VerifiedStatus,
  VerifyAccount,
  VerifyError,
  VerifySuccess,
} from "./pages";

const App = () => {
  const location = useLocation();
  return (
    <React.Fragment>
      <Navigation />
      <AnimatePresence exitBeforeEnter >
        <Switch location={location} key={location.key}>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/notifications/:userId">
            <Notification />
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
          {/* <Route exact path="/paystack/callback">
          <VerifyTransaction />
        </Route>
         */}
          {/* Fund account */}
          <Route exact path="/account/fund-account">
            <FundAccount />
          </Route>

          <Route exact path="/account/fund-success/:ref">
            <FundSuccess />
          </Route>

          {/* <Route exact path="/account/fund-account/method/:method">
          <FundAccountMethod />
        </Route> */}
          {/* Fund account */}
          {/* Transaction pin */}
          <Route exact path="/transactionhistory/:userId">
            <AllTransactions />
          </Route>

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
          <Route exact path="/account/transfer/moneydais">
            <IntraTransferTransfer />
          </Route>
          <Route exact path="/account/transfer/moneydais/confirm">
            <ConfirmUserTransfer />
          </Route>

          <Route exact path="/account/transfer/moneydais/confirm/pin">
            <TransferInfo />
          </Route>

          <Route exact path="/account/transfer/moneydais-success">
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

          {/* Users Settings */}
          <Route exact path="/account/setting">
            <Setting />
          </Route>
          {/* Users Settings*/}

          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </AnimatePresence>
    </React.Fragment>
  );
};

export default App;

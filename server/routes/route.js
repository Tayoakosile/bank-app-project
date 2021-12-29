import express from "express";
import { AuthorizeUser, checkToken } from "../controller/Auth/Auth.js";
import {
  isUserLoginsUnique,
  VerifyUserEmail,
} from "../controller/controller.js";
import Login from "../controller/Login.js";
import { StoreUserID } from "../controller/Profile/Profile.js";
import isPasswordLinkStillValid from "../controller/resetPassword/isPasswordLinkStillValid.js";
import Setting from "../controller/Setting/Setting.js";
import RequestPasswordReset from "../controller/resetPassword/RequestPasswordReset.js";
import RequestPasswordResetLink from "../controller/resetPassword/RequestPasswordResetLink.js";
import { SearchUsers } from "../controller/SearchUsers/SearchUsers.js";
import NewUser from "../controller/signUp/NewUser.js";
import { AllNotifications } from "../controller/Notifications/Notification.js";
import { AllTransaction } from "../controller/TransactionHistory/TransactionHistory.js";
import {
  TransactionPin,
  ValidatePin,
} from "../controller/Transactions/TransactionPin.js";

import ValidateBalance from "../controller/Transactions/ValidateBalance.js";

const route = express.Router();

/* Resend resend  code */
route.post("/", NewUser);
route.post("/login", Login);
route.post("/validate", isUserLoginsUnique);

/*  Reset password*/
route.post("/reset-password", RequestPasswordResetLink);
route.post("/reset-password/reset/:_id/:secretCode", isPasswordLinkStillValid);
route.post("/reset-password/reset/", RequestPasswordReset);
/*  Reset password*/

//verify Email address
route.post("/verification/verify-account/:_id/:secretCode", VerifyUserEmail);

/* Authorize users */
route.get("/authorize", checkToken, AuthorizeUser);
/* Authorize users */

/* 
route.post('/verification/get-activation-email', checkToken, ResendCode) */
/* Resend token */

/* Transaction pin */
route.post("/transaction/set-pin", TransactionPin);
route.post("/transaction/validatepin", ValidatePin);
/* Transaction pin */

// Users setting
route.post("/account/setting/:id", Setting);

// Users setting
/* Search for user in the database */
route.post("/search", SearchUsers);
/* Search for user in the database */

/* Get all Transaction */
route.post("/transaction-history", AllTransaction);
/* Get all Transaction */

/* Search for user in the database */
route.post("/notification", AllNotifications);
/* Search for user in the database */

/* Validate user account balance (Check if amount in database is greater than amount user selected) */
route.post("/validatebalance", ValidateBalance);
/* Validate user account balance */
route.post("/profile/upload/:id", StoreUserID);

export default route;

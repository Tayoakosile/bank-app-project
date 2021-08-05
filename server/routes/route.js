import express from 'express'

import NewUser from '../controller/signUp/NewUser.js'
import Login from '../controller/Login.js'
import {
 isUserLoginsUnique,
 VerifyUserEmail,
} from '../controller/controller.js'
import { AuthorizeUser, checkToken } from '../controller/Auth/Auth.js'
import RequestPasswordResetLink from '../controller/resetPassword/RequestPasswordResetLink.js'
import isPasswordLinkStillValid from '../controller/resetPassword/isPasswordLinkStillValid.js'
import RequestPasswordReset from '../controller/resetPassword/RequestPasswordReset.js'

const route = express.Router()

/* Resend resend  code */
route.post('/', NewUser)
route.post('/login', Login)
route.post('/validate', isUserLoginsUnique)

/*  Reset password*/
route.post('/reset-password', RequestPasswordResetLink)
route.post('/reset-password/reset/:_id/:secretCode', isPasswordLinkStillValid)
route.post('/reset-password/reset/', RequestPasswordReset)
/*  Reset password*/

//verify Email address
route.post('/verification/verify-account/:_id/:secretCode', VerifyUserEmail)

/* Authorize users */
route.get('/authorize', checkToken, AuthorizeUser)
/* Authorize users */

/* Resend token */
/* 
route.post('/verification/get-activation-email', checkToken, ResendCode) */
/* Resend token */

export default route

import express from 'express'

import NewUser from '../controller/NewUser.js'

import Login from '../controller/Login.js'
const route = express.Router()
import {
 isUserLoginsUnique,
 VerifyUserEmail,
} from '../controller/controller.js'
import { AuthorizeUser, checkToken } from '../controller/Auth.js'
/* Resend resend  code */

import ResetPassword from '../controller/ResetPassword.js'
/* Resend resend  code */
route.post('/', NewUser)
route.post('/login', Login)
route.post('/validate', isUserLoginsUnique)
route.post('/reset-password', ResetPassword)

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

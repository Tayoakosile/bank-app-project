import express from 'express'

import NewUser from '../controller/NewUser.js'

import Login from '../controller/Login.js'
const route = express.Router()
import {
 isUserLoginsUnique,
 VerifyUserEmail,
} from '../controller/controller.js'
import { AuthorizeUser, checkToken } from '../controller/Auth.js'
import { ResendCode } from '../controller/ResendCode.js'
route.post('/', NewUser)
route.post('/login', Login)
route.post('/validate', isUserLoginsUnique)

//verify Email address
route.post('/verification/verify-account/:_id/:secretCode', VerifyUserEmail)

/* Authorize users */
route.get('/authorize', checkToken, AuthorizeUser)
/* Authorize users */

/* Resend token */
route.post('/verification/get-activation-email', checkToken, ResendCode)
/* Resend token */

export default route

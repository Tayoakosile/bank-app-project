/* Transactions */
import express from 'express'
import {
 MakeTransaction,
 VerifyTransaction,
} from '../controller/Transactions/Transaction.js'

const route = express.Router()

route.post('/transaction/pay', MakeTransaction)
route.get('/transaction/verify', VerifyTransaction)

/* Transactions */
export default route

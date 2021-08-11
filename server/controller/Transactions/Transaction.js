import mongoose from 'mongoose'
import {
 initializePayment,
 verifyPayment,
} from '../../config/Paystack.config.js'
import Account from '../../models/Account.js'
import User from '../../models/SignUp.js'

export const MakeTransaction = (req, res) => {
 const { amount, email, full_name } = req.body
 const form = { amount, email, full_name }
 form.metadata = {
  full_name: form.full_name,
 }
 form.amount *= 100
 initializePayment(form, (error, body) => {
  if (error) {
   //handle errors
   console.log(error)
   return
  }
  const response = JSON.parse(body)
  res.status(200).json({ success: true, response })
  console.log(body)
 })
}

export const VerifyTransaction = (req, res) => {
 const { reference, trxref } = req.query
 console.log('error', reference)

 verifyPayment(reference, (error, body) => {
  if (error) {
   console.log('error', error)
  }

  const { data } = JSON.parse(body)
  const {
   metadata: { userId, transactionType, narration, accountId },
   amount,
   status,
   created_at,
  } = data

  const amountConvertedToNaira = Number(amount / 100)

  const transaction = {
   source_account_id: accountId,
   amount: amountConvertedToNaira,
   status,
   created_at,
   transactionType,
   narration,
  }

  /* Update user account balance */

  User.findOneAndUpdate(
   { _id: mongoose.Types.ObjectId(userId) },
   {
    $push: { transactions: transaction },
   }
  )
   .then(res => {
    if (status === 'success') {
     Account.findByIdAndUpdate(
      mongoose.Types.ObjectId(accountId),
      {
       $inc: { balance: amountConvertedToNaira },
      },
      { new: true },
      (err, doc) => {
       // console.log(doc, err)
       /* if successful  */

       if (doc) {
         console.log(doc)
       }
      }
     )
    }
   })
   .catch(err => console.log(err))
 })
}
/* Update user account balance */

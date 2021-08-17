import User from '../../models/SignUp.js'
import mongoose from 'mongoose'
import Account from '../../models/Account.js'
import { NewTransaction } from '../../utils/utils.js'

export const TransactionPin = async (req, res) => {
 const { _id, pin } = req.body

 const updateUserPin = await User.findByIdAndUpdate(
  mongoose.Types.ObjectId(_id),
  {
   transaction_pin: parseInt(pin),
  },
  { new: true }
 )
 console.log(updateUserPin)
}

export const ValidatePin = async (req, res) => {
 const { _id, pin, receiverID, transferSum } = req.body
 console.log(req.body)
 User.findOne({ _id: mongoose.Types.ObjectId(_id) }, async (err, doc) => {
  if (doc) {
   const { account, transaction_pin } = doc
   const isUserPin = Number(pin) === transaction_pin
   /* If pin is not valid then send error */
   if (!isUserPin) {
    res.status(400).json({ success: false, message: 'User pin is not valid' })
   }
   /* If pin is not valid then send error */

   /* Else make transaction*/
   const debitSenderAccount = await Account.findByIdAndUpdate(
    mongoose.Types.ObjectId(account),
    {
     $inc: { balance: -transferSum },
    },
    { new: true }
   ).populate('account')

   if (debitSenderAccount) {
    await User.findById(
     mongoose.Types.ObjectId(receiverID),
     async (err, receiverInfo) => {
      console.log(err, receiverInfo)
      if (receiverInfo) {
       const creditReceiverAccount = await Account.findByIdAndUpdate(
        mongoose.Types.ObjectId(receiverInfo.account),
        {
         $inc: { balance: transferSum },
        },
        { new: true }
       ).populate('account')

       if (creditReceiverAccount) {
        const transactionFromSender = {
         source_account_id: _id,
         destination_account_id: receiverID,
         amount: Number(transferSum),
         status: 'success',
         transaction_type: 'debit',
         narration: `Transfer N${transferSum} to ${creditReceiverAccount.account_number} `,
         destination_account_number: `KweeqFundz ${creditReceiverAccount.account_number}`,
        }
        const transactionToReceiver = {
         source_account_id: receiverID,
         destination_account_id: _id,
         amount: Number(transferSum),
         status: 'success',
         transaction_type: 'credit',
         narration: `Transfer of N${transferSum} from ${debitSenderAccount.account_number} `,
         destination_account_number: `KweeqFundz ${debitSenderAccount.account_number}`,
        }
        NewTransaction(User, _id, transactionFromSender)
        NewTransaction(User, receiverID, transactionToReceiver)
        res.status(200).json({ success: true, message: 'successfully created' })

        console.log(creditReceiverAccount, debitSenderAccount)
       }
      }
     }
    )
   }

   /* Else Make transaction */

   console.log(doc.transaction_pin, isUserPin, pin, debitSenderAccount)
  }
 })
 console.log(req.body)
}

import mongoose from 'mongoose'

const { Schema } = mongoose

const transactionSchema = new Schema({
 transactions: [
  {
   source_account_id: String,
   destination_account_id: String,
   destination_account_id: String,
   amount: { type: Number, required: true },
   created_on: { type: Date, default: Date.now() },
   narration: String,
   transaction_type: { type: String, required: true },
  },
 ],
})
const Transaction = mongoose.model('Transaction', transactionSchema)

export default Transaction

import mongoose from 'mongoose'

const { Schema } = mongoose

const transactionSchema = new Schema({
 full_name: {
  type: String,
  required: true,
 },
 email: {
  type: String,
  required: true,
 },
 amount: {
  type: Number,
  required: true,
 },

 reference: {
  type: String,
  required: true,
 },
})
const Transaction = mongoose.model('Transaction', transactionSchema)

export default Transaction

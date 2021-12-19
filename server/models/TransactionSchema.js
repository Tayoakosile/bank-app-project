import mongoose from "mongoose";

const { Schema } = mongoose;

const transactionSchema = new Schema({
  transactions: [
    {
      source_account_id: { type: String, default: null },
      destination_account_id: { type: String, default: null },
      destination_account_number: { type: String, default: null },
      amount: { type: Number, required: true },
      created_on: { type: Date, default: Date.now() },
      narration: String,
      status: String,
      transaction_type: { type: String, required: true },
      transactionRef: String,
    },
  ],
});
const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;

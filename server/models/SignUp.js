import mongoose from "mongoose";
const { Schema } = mongoose;
import passportLocalMongoose from "passport-local-mongoose";

const transaction = new Schema({
  source_account_id: String,
  destination_account_id: String,
  destination_bank: String,
  receiver_name: String,
  sender_name: String,
  destination_account_number: String,
  amount: { type: Number, required: true },
  created_at: { type: Date, default: Date.now() },
  status: String,
  narration: String,
  ref: String,
  transaction_type: String,
});

const NewUser = new Schema({
  firstname: String,
  lastname: String,
  profileImg: { type: String, default: null },
  username: { type: String, unique: true, required: true, index: true },
  email: { type: String, unique: true, required: true, index: true },
  deleted_on: String,
  deleted_by: String,
  created_on: { type: Date, default: Date.now() },
  verified_on: { type: Date, default: null },
  status: {
    type: String,
    default: "Pending",
  },
  account: {
    type: mongoose.Types.ObjectId,
    ref: "Account",
  },
  transaction_pin: { type: Number, default: null },
  transactions: [transaction],
});
NewUser.plugin(passportLocalMongoose, { usernameField: "email" });
const User = mongoose.model("User", NewUser);

export default User;

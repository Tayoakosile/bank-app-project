import mongoose from 'mongoose'
const { Schema } = mongoose
import passportLocalMongoose from 'passport-local-mongoose'

const NewUser = new Schema({
 firstname: String,
 lastname: String,
 username: { type: String, unique: true, required: true, index: true },
 email: { type: String, unique: true, required: true, index: true },
 deleted_on: String,
 deleted_by: String,
 created_on: { type: Date, default: Date.now() },
 verified_on: { type: Date, default: null },
 status: {
  type: String,
  default: 'Pending',
 },
 account: {
  type: mongoose.Types.ObjectId,
  ref: 'Account',
 },
})
NewUser.plugin(passportLocalMongoose, { usernameField: 'email' })
const User = mongoose.model('User', NewUser)

export default User

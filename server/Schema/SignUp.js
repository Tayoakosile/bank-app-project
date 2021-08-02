import mongoose from 'mongoose'
const { Schema } = mongoose
import passportLocalMongoose from 'passport-local-mongoose'

const NewUser = new Schema({
 firstname: String,
 lastname: String,
 username: String,
 email: { type: String, unique: true, required: true },
 deleted_on: String,
 deleted_by: String,
 created_on: { type: Date, default: Date.now() },
 verified_on: { type: Date, default: null },
 status: {
  type: String,
  enum: ['Pending', 'Active'],
  default: 'Pending',
 },
 dateCreated: {
  type: Date,
  default: Date.now(),
 },
})
NewUser.plugin(passportLocalMongoose, { usernameField: 'email' })
const User = mongoose.model('User', NewUser)

export default User

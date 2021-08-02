import mongoose from 'mongoose'

const { Schema } = mongoose

const AccountSchema = new Schema({
 account_number: { type: String, unique: true, required: true },
 balance: { type: Number, default: 0 },
 last_updated: { type: Date, default: Date.now() },
 created_on: { type: Date, default: Date.now() },
})

const Account = mongoose.model('Account', AccountSchema)
export default Account

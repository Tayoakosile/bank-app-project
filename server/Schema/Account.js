import mongoose from 'mongoose'

const { Schema } = mongoose

const AccountSchema = new Schema({
 account_number: String,
 balance: { type: Number, default: 0 },
 
},{timestamps:true})

const Account = mongoose.model('Account', AccountSchema)
export default Account

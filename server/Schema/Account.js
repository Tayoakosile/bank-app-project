import mongoose from 'mongoose'

const { Schema } = mongoose

const Account = new Schema({
 account_number: { type: String, unique: true, required: true },
})

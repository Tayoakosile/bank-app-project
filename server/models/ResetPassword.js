import mongoose from 'mongoose'
const { Schema } = mongoose

const ResetPassword = new Schema({
 email: { type: String, required: true, unique: true },
 secretCode: { type: String, required: true, unique: true },
 createdAt: { type: Date, default: Date.now() },
})
ResetPassword.index({ createdAt: 1 }, { expireAfterSeconds: 540 })

const NewPassword = mongoose.model('ResetPassword', ResetPassword)
export default NewPassword

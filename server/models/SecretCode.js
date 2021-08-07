import mongoose from 'mongoose'
const { Schema } = mongoose

const SecretCode = new Schema({
 email: { type: String, required: true, unique: true },
 secretCode: { type: String, required: true, unique: true },
 createdAt: { type: Date, default: Date.now() },
})
SecretCode.index({ createdAt: 1 }, { expireAfterSeconds: 540})


const Code = mongoose.model('Code', SecretCode)
export default Code

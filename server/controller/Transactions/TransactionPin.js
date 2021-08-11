import User from '../../models/SignUp.js'
import mongoose from 'mongoose'

const TransactionPin = async (req, res) => {
 const { _id, pin } = req.body

 const updateUserPin = await User.findByIdAndUpdate(
  mongoose.Types.ObjectId(_id),
  {
   transaction_pin: parseInt(pin),
  },
  { new: true }
 )
 console.log(updateUserPin)
}

export default TransactionPin

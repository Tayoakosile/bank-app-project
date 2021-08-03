import mongoose from 'mongoose'
import Account from '../Schema/Account.js'
import Code from '../Schema/SecretCode.js'
import User from '../Schema/SignUp.js'
import { SecretCodeToUser } from '../utils/utils.js'
export const isUserLoginsUnique = async (req, res) => {
 const query = req.query
 console.log(query)
 const userExists = await User.exists(query)

 userExists
  ? res
     .status(400)
     .json({ success: true, message: 'Email address Already Exist' })
  : res.status(200).json({ success: false, message: 'Doesnt exist' })
 console.log(userExists, query)
}

// Verify User Email Address

export const VerifyUserEmail = async (req, res) => {
 const { _id, secretCode } = req.params
 console.log(_id, secretCode)

 try {
  const findUser = await User.findById(mongoose.Types.ObjectId(`${_id}`))

  if (findUser) {
   const { email } = findUser
   console.log('true', findUser.email)
   await Code.deleteMany({
    email,
   })
  } else {
   res.status(400).json({ success: false, err: 'User not found' })
  }
 } catch (err) {
  res.status(400).json({ success: false, err })
  console.log('err', err)
 }
}

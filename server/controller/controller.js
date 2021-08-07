import mongoose from 'mongoose'
import Account from '../models/Account.js'
import Code from '../models/SecretCode.js'
import User from '../models/SignUp.js'
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
   const { email, account } = findUser
   console.log('true', findUser.email)

   const GetCode = await Code.findOne({
    email,
   })
   if (GetCode) {
    //  If verification code is still valid
    console.log(GetCode)
    const updateUserStatus = await User.updateOne({
     email,
     status: 'active',
     verified_on: Date.now(),
    })

    const updateAccount = await Account.updateOne({
     _id: mongoose.Types.ObjectId(`${account}`),
     account_number: `KW${SecretCodeToUser('0', 8)}`,
    })

    console.log(updateUserStatus, updateAccount)

    await Code.deleteMany({ email })
   } else {
    res.status(400).json({ success: false, err: 'code not found' })
   }
   //  If verification code is still valid
  } else {
   res.status(400).json({ success: false, err: 'User not found' })
  }
 } catch (err) {
  res.status(400).json({ success: false, err })
  console.log('err', err)
 }
}

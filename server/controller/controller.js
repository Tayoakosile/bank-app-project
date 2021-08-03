import Mongoose from 'mongoose'
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
 try {
  const user = await User.findById(Mongoose.Types.ObjectId(_id))

  if (user.status === 'Pending') {
   const VerifyCode = await Code.findOne({
    email: user.email,
    secretCode,
   })

   if (!user) {
    res.status(400).json({ success: false, message: 'User could not be found' })
   } else {
    // If User was found
    console.log('valid user', user)
    /* 
    If User (_Id) was found
      Then verify code  */
    if (VerifyCode) {
     /* If code was successful then update user Status to active  */

     await User.updateOne({
      email: user.email,
      status: 'active',
     })

     await Code.deleteOne({
      email: user.email,
     })


     /* Create a new account number*/
     const userAccount = new Account({
       account_number: `KW${SecretCodeToUser('0', 9)}`,
      })
      await userAccount.save()
      /* Create a new account number*/



     res.status(200).json({ success: true, message: 'Code still Valid' })
     console.log('Code still Valid', VerifyCode)
    } else {
     res
      .status(400)
      .json({ success: false, message: 'Verification code expired' })
     console.log('Verification code expires')
    }
   }
  } else {
   res
    .status(400)
    .json({ success: false, message: 'Your account has been verified' })
  }
 } catch {
  console.log('error')
  res.status(500).json({ success: false, err: 'errorr in verification' })
 }
}

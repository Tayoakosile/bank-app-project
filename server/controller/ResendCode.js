import mongoose from 'mongoose'
import passport from 'passport'
import User from '../Schema/SignUp.js'
import ResetUserPassport from '../Schema/ResetPassword.js'
import {
 NewSecretCode,
 SecretCodeToUser,
 sendMailToUser,
} from '../utils/utils.js'

const ResetPassword = async (req, res) => {
 try {
  const userEmail = req.body
  const isUserRegistered = await User.find(userEmail)
  console.log(req.body, isUserRegistered)
  if (!isUserRegistered) {
   res.status(400).json({ success: false, err: 'USer not found' })
  }
  const { email, firstname, lastname, _id } = isUserRegistered[0]

  await ResetUserPassport.deleteMany({ email: email })

  const newCode = new ResetUserPassport({
   email: email,
   secretCode: SecretCodeToUser('0as', 12),
  })
  await newCode.save()

  if (newCode) {
   const { secretCode } = newCode
   const verification = `
      Hi ${firstname}
      <h2> Please <a href = 'http://localhost:3000/reset-password/${_id}/${secretCode}'> Reset<a/> your password<h2/> 
      `
   const sendResetPasswordCode = await sendMailToUser(
    firstname,
    lastname,
    email,
    verification
   )
  console.log(newCode)

   if (sendResetPasswordCode) {
    console.log('Sent')
   } else {
    console.log('Not sent')
    res.status(400).json({ success: false })
    console.log(sendResetPasswordCode)
   }
  }
 } catch (err) {
  console.log(err)

  res.status(400).json({ success: false, err: 'USer not found in database' })
 }
}
export default ResetPassword

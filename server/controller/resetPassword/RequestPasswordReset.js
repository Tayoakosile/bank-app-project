import User from '../../Schema/SignUp.js'
import mongoose from 'mongoose'

const RequestPasswordReset = async (req, res) => {
 try {
  const { _id, password } = req.body
  await User.findById(mongoose.Types.ObjectId(`${_id}`), (err, user) => {
   if (err) {
    console.log('User not found')
    res.status(400).json({ success: false, message: 'User not found' })
   }

   /* Reset users password */
   user.setPassword(password.trim(), (err, user) => {
    if (err) {
     console.log(err)
     return res.status(400).json({ success: false, message: 'User not found' })
    }
    user.save(err => {
     if (err) {
      console.log(err)
     }
     res
      .status(200)
      .json({ success: true, message: 'Password successfully changed' })
    })
   })
  })
  /* Reset users password */
 } catch (err) {
  console.log(err)
  res.status(400).json({ success: false, message: 'User not found' })
 }
}

export default RequestPasswordReset

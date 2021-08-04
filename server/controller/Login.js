import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import passport from 'passport'
import Code from '../Schema/SecretCode.js'
import User from '../Schema/SignUp.js'
import {
 NewSecretCode,
 SecretCodeToUser,
 sendMailToUser,
} from '../utils/utils.js'

export const Login = (req, res) => {
 if (!req.body.email) {
  res.status(404).json({ success: false, message: 'Username was not given' })
  console.log('Username not given')
 } else {
  if (!req.body.password) {
   res.status(404).json({ success: false, message: 'Password was not given' })
   console.log('Password not given')
  } else {
   passport.authenticate('local', function (err, user, info) {
    if (err) {
     res.json({ success: false, message: err })
     console.log('Error:', err)
    } else {
     if (!user) {
      console.log('Error:', info)
      res.status(404).send('Incorrect username or Password')
     } else {
      req.login(user, function (err) {
       if (err) {
        console.log('Error:', 'One more error', err)
        res.status(404).json({ success: false, message: err })
       } else {
        User.find({ _id: mongoose.Types.ObjectId(`${user._id}`) })
         .populate('account')
         .then(result => {
          // Send a token touser
          const token = jwt.sign({ result }, process.env.JWT_SECRET, {
           expiresIn: process.env.JWT_EXPIRES_IN,
          })
          // Send a token touser

          res.status(200).json({
           success: true,
           user: result,
           message: `Authentication successful`,
           token: `kkdkdkdkdkdkd${token}`,
          })
          /* 
          console.log('Sign in successful', token)

          console.log('result', result) */
         })
         .catch(err => console.log(err))

        /* if user status is pending */
        if (user.status === 'Pending') {
         User.findById({
          _id: mongoose.Types.ObjectId(`${user._id}`),
         })
          .then(res => {
           console.log(res.email)
           const checkCode =    Code.exists({ email: 'sss' })
           if(checkCode ){
             console.log('User found', checkCode )
            }
            else{
             console.log('User not found' )

           }
          })

          .catch(err => {
           console.log('code not found', err)
          })
        }
       }
      })
     }
    }
   })(req, res)
  }
 }
}
export default Login

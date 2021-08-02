import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import passport from 'passport'
import Code from '../Schema/SecretCode.js'
import User from '../Schema/SignUp.js'
import { SecretCodeToUser, sendMailToUser } from '../utils/utils.js'

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
       console.log(user)
       if (err) {
        console.log('Error:', 'One more error', err)
        res.status(404).json({ success: false, message: err })
       } else {
        /* if user status is pending */
        if (user.status === 'Pending') {
         User.findById({
          _id: mongoose.Types.ObjectId(`${user._id}`),
         })
          .then(res => Code.deleteOne({ email: res.email }))
          .then(res => {
           const newSecretCode = new Code({
            email: user.email,
            secretCode: SecretCodeToUser(),
           })

           newSecretCode.save().then(result => {
            const verification = `<h3>Dear ${user.firstname}, Please Verify your account <a href='http://localhost:3000/verify/${user._id}/${result.secretCode}'>Mailjet</a>!</h3><br />May the delivery force be with you!`

            sendMailToUser(user.firstname, user.lastname, user.email, verification)
             .then(res => console.log('success', res))
             .catch(res.status(400).json({ success: false, err: err }))
           })
          })
        }

        // Send a token touser
        const token = jwt.sign(
         { email: user.email, userId: user._id, userStatus: user.status },
         process.env.JWT_SECRET,
         {
          expiresIn: process.env.JWT_EXPIRES_IN,
         }
        )
        // Send a token touser

        res.status(200).json({
         success: true,
         user: user,
         message: `Authentication successful`,
         token: token,
        })

        console.log('Sign in successful', token)
       }
      })
     }
    }
   })(req, res)
  }
 }
}
export default Login

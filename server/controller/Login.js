import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import passport from 'passport'
import Code from '../models/SecretCode.js'
import User from '../models/SignUp.js'
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
      console.log('Error:', info.name)
      /* If users password is incorrect */
      if (info.name === 'IncorrectUsernameError') {
       console.log('Incorrect Username')
       res.status(404).json({
        err: 'IncorrectEmailError',
        message: 'This Email Doesnt Exist',
       })
      }
      /* If users password is incorrect */
      if (info.name === 'IncorrectPasswordError') {
       console.log('Incorrect password')
       res.status(404).json({
        err: 'IncorrectPasswordError',
        message: 'Incorrect Password  ',
       })
      }
     } else {
      req.login(user, async function (err) {
       try {
        if (err) {
         console.log('Error:', 'One more error', err)
         res.status(404).json({ success: false, message: err })
        } else {
         const getUserInfo = await User.findOne({
          _id: mongoose.Types.ObjectId(`${user._id}`),
         }).populate('account')

         if (getUserInfo) {
          const token = jwt.sign({ getUserInfo }, process.env.JWT_SECRET, {
           expiresIn: process.env.JWT_EXPIRES_IN,
          })
          // Send a token touser

          res.status(200).json({
           success: true,
           user: user._id,
           message: `Authentication successful`,
           token: `${token}`,
          })
         }

         /* if user status is pending */
         if (user.status === 'Pending') {
          const isUserRegistered = await User.findById({
           _id: mongoose.Types.ObjectId(`${user._id}`),
          })

          /* If user is found in database */
          if (isUserRegistered) {
           const { email, firstname, lastname, _id } = isUserRegistered
           /* then check if verification code has expired (10 mins max) */
           const checkCode = await Code.exists({
            email: isUserRegistered.email,
           })
           /* If it has expired then create new verification one and send to users email account */
           if (!checkCode) {
            const generateSecretCode = await NewSecretCode(Code, email)
            console.log(generateSecretCode)
            if (generateSecretCode) {
             const verification = `
             <h2>Hi, ${firstname.toUpperCase()}</h2>,
        <p>Welcome to Kweeqfundz Bank app</p>
             <p>
             Please  <a href ='http://localhost:3000/verification/verify-account/${_id}/${
              generateSecretCode.secretCode
             }'>Verify</a>
             your email address
             </p>`

             await sendMailToUser(firstname, lastname, email, verification)
            }
           }
          }
         }
        }
       } catch (err) {
        console.log('err', err)
       }
      })
     }
    }
   })(req, res)
  }
 }
}
export default Login

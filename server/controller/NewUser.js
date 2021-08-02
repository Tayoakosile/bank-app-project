// Internal
import User from '../Schema/SignUp.js'
import uniqid from 'uniqid'
import mailJet from 'node-mailjet'
import passportLocal from 'passport-local'
// External
import passport from 'passport'
import Code from '../Schema/SecretCode.js'
import { SendMail } from '../utils/SendMail.js'
// Config

const LocalStrategy = passportLocal.Strategy
passport.use(
 new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  User.authenticate()
 )
)

const createNewUser = (req, res) => {
 const secretCode = uniqid()
 // Get the major detials from  user then stores it
 console.log(req.body, 'form here')
 const { firstname, lastname, username, email, password } = req.body
 const deleted_on = ''
 const deleted_by = ''

 //Verification code initialization

 //Verification code initialization

 // USer details
 const form = {
  firstname,
  lastname,
  username,
  email,
  deleted_by,
  deleted_on,
  secretCode,
 }
 // User details

 User.register(form, password, (err, user) => {
  if (err) {
   res.status(400).json({
    success: false,
    message: `Your Account could not be created.  ${err}`,
   })
   console.log(err)
  } else {
   const { email, firstname, _id } = user
   console.log(email, secretCode, firstname, _id)

   const newSecretCode = new Code({
    email,
    secretCode,
   })

   //Creates a verification code
   newSecretCode
    .save()
    .then(() => {
     SendMail()
      .then(result => {
       console.log(result.body)
       res.status(200).json({ body: `Success ${result}` })
      })
      .catch(err => {
       res.status(400).json({ err: `${err}` })
       console.log(err)
      })
    })
    .catch(err => res.status(400).json({ success: false, err: err }))
  }
 })
}
//Creates a verification code

export default createNewUser

// Internal
import User from '../Schema/SignUp.js'
import uniqid from 'uniqid'
import mailJet from 'node-mailjet'
import passportLocal from 'passport-local'
// External
import passport from 'passport'
import Code from '../Schema/SecretCode.js'
import { sendMailToUser, SecretCodeToUser } from '../utils/utils.js'
// Config

const LocalStrategy = passportLocal.Strategy
passport.use(
 new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  User.authenticate()
 )
)

const createNewUser = (req, res) => {
 // Get the major details from  user then stores it
 console.log(req.body, 'form here')
 const { firstname, lastname, username, email, password } = req.body
 const deleted_on = ''
 const deleted_by = ''

 // USer details
 const form = {
  firstname,
  lastname,
  username,
  email,
  deleted_by,
  deleted_on,
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
   console.log(email, SecretCodeToUser('00Aa', 12), firstname, _id)

   const newSecretCode = new Code({
    email,
    secretCode: SecretCodeToUser('00Aa', 12),
   })

   //Creates a verification code and saves it
   newSecretCode
    .save()
    .then(data => {
     const { secretCode } = data
     const verification = `
Please <a href ='http://localhost:3000/verification/verify-account/${user._id}/${secretCode}' >Verify</a> your account      
      `

     setTimeout(() => {
      sendMailToUser(user.firstname, user.lastname, user.email, verification)
       .then(result => {
        console.log(result.body)
        res.status(200).json({ body: `Success ${result}` })
       })
       .catch(err => {
        res.status(400).json({ err: `${err}` })
        console.log(err)
       })
     })
    }, 10000)

    .catch(err => res.status(400).json({ success: false, err: err }))
  }
 })
}
//Creates a verification code

export default createNewUser

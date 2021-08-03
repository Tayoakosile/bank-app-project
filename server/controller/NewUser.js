// Internal
// External
import passport from 'passport'
import passportLocal from 'passport-local'
import Account from '../Schema/Account.js'
import Code from '../Schema/SecretCode.js'
import User from '../Schema/SignUp.js'
import {
 NewSecretCode,
 SecretCodeToUser,
 sendMailToUser,
} from '../utils/utils.js'
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

 // User details
 const newAccountNumber = new Account({ account_number: '' })

 newAccountNumber
  .save()
  .then(account => {
   const { _id } = account
   const form = {
    firstname,
    lastname,
    username,
    email,
    account: _id,
    deleted_by,
    deleted_on,
   }
   console.log(account)

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

     //Creates a verification code and saves it
     NewSecretCode()
      .save()
      .then(data => {
       const { secretCode } = data
       const verification = `
Please <a href ='http://localhost:3000/verification/verify-account/${user._id}/${secretCode}' >Verify</a> your account      
      `

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
      .catch(err => res.status(400).json({ success: false, err: err }))
    }
   })
  })
  .catch(err => {
   console.log(err)
   res.status(400).json({ err })
  })
}
//Creates a verification code

export default createNewUser

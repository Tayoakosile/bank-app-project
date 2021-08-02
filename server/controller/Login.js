import jwt from 'jsonwebtoken'
import passport from 'passport'

export const Login = (req, res) => {
 console.log(req.body)
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
        /* Send token to user to use*/
        const token = jwt.sign(
         { email: user.email, userId: user._id, userStatus: user.status },
         process.env.JWT_SECRET,
         {
          expiresIn: process.env.JWT_EXPIRES_IN,
         }
        )

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

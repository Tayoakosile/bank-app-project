import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import User from '../../models/SignUp.js'

export const checkToken = (req, res, next) => {
 const header = req.headers['authorization']
 if (typeof header !== 'undefined') {
  const bearer = header.split(' ')
  const token = bearer[1]
  req.token = token
  next()
 } else {
  //If header is undefined return Forbidden (403)
  console.log('login required')
  res.status(403).json({ success: false, message: 'login required' })
 }
}

export const AuthorizeUser = (req, res) => {
 jwt.verify(req.token, process.env.JWT_SECRET, async (err, userDetails) => {
  if (err) {
   console.log('ERROR: Could not connect to the protected route')
   res.sendStatus(403)
  } else {
   const {
    getUserInfo: { _id },
   } = userDetails

   //If token is successfully verified, we can send the authorized data
   const getUserInfo = await User.findOne({
    _id: mongoose.Types.ObjectId(`${_id}`),
   }).populate('account')
   const authorizedData = getUserInfo
   console.log(authorizedData)

   res.json({
    message: 'Successful log in',
    authorizedData,
   })
   console.log('SUCCESS: Connected to protected route')
  }
 })
}

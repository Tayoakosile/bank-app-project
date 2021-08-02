import jwt from 'jsonwebtoken'

export const checkToken = (req, res, next) => {
 const header = req.headers['authorization']
 console.log(req.headers)
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
 jwt.verify(req.token, process.env.JWT_SECRET, (err, authorizedData) => {
  if (err) {
   console.log('ERROR: Could not connect to the protected route')
   res.sendStatus(403)
  } else {
   //If token is successfully verified, we can send the authorized data
   res.json({
    message: 'Successful log in',
    authorizedData,
   })
   console.log('SUCCESS: Connected to protected route')
  }
 })
}

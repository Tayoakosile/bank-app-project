import Account from '../../models/Account.js'
import User from '../../models/SignUp.js'
import mongoose from 'mongoose'

const SearchUsers = (req, res) => {
 const { acctNumber } = req.query
 /* Search for all users with an account number  */
 Account.find(
  {
   account_number: { $regex: `KW${acctNumber}`, $options: 'i' },
  },
  (err, doc) => {
   console.log(err, doc.length)
   /* If no user was found, return error */
   if (doc.length === 0 || err) {
    res.status(400).json({ success: false, message: 'No user found' })
   } else {
    const getAllUserInSearchId = doc.map(({ _id }) => _id)

    /* Else search for the doc id and populate the account then send to the user*/
    User.find({ account: { $in: getAllUserInSearchId } })
     .populate('account')
     .exec((err, result) => {
         console.log(' response here', res)
      return res.status(200).json({ success: true, message: result })
     })
   }
  }
 )
}

export default SearchUsers

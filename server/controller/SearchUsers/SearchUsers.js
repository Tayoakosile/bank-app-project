import Account from '../../models/Account.js'
import User from '../../models/SignUp.js'
import mongoose from 'mongoose'

export const SearchUsers = (req, res) => {
 const { acctNumber, loggedInUserID } = req.query
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
      if (result) {
       /* This ensures current logged in user account  is not also sent when user searches  */
       const updatedResult = result.filter(({ _id }) => _id != loggedInUserID)
       console.log(updatedResult.length,loggedInUserID)
       return res.status(200).json({ success: true, message: updatedResult })
      }
     })
   }
  }
 )
}

export const fetchSingleUser = async (req, res) => {
 const { _id } = req.query
 const findUsers = await User.findById(mongoose.Types.ObjectId(_id)).populate(
  'account'
 )
 console.log(findUsers)

 if (!findUsers) {
  return res
   .status(400)
   .json({ success: false, message: 'Error:User not found' })
 }
 res.status(200).json({ success: true, user: findUsers })
}

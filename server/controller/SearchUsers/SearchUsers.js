import Account from "../../models/Account.js";
import User from "../../models/SignUp.js";

export const SearchUsers = (req, res) => {
  const { acctNumber, loggedInUserID } = req.body;
  console.log("gotten from frontend", req.body, loggedInUserID);

  /* Search for all users with an account number  */
  Account.find(
    {
      account_number: { $regex: `MS${acctNumber}`, $options: "i" },
    },
    (err, doc) => {
      console.log(err, doc.length, doc);
      /* If no user was found, return error */
      if (doc.length === 0 || err) {
        res.status(400).json({ success: false, message: "No user found" });
      } else {
        const getAllUserInSearchId = doc.map(({ _id }) => _id);
        /* Else search for the doc id and populate the account then send to the user*/
        User.findOne(
          { account: { $in: getAllUserInSearchId } },
          (err, result) => {
            if (result) {
              const updatedResult = result;

              if (updatedResult._id == loggedInUserID) {
                return res
                  .status(400)
                  .json({ success: false, message: "No user found" });
              }
              return res
                .status(200)
                .json({ success: true, message: updatedResult });
            }
          }
        );
      }
    }
  );
};

import mongoose from "mongoose";
import Account from "../models/Account.js";
import Code from "../models/SecretCode.js";
import User from "../models/SignUp.js";
import { SecretCodeToUser } from "../utils/utils.js";
export const isUserLoginsUnique = async (req, res) => {
  const query = req.query;
  console.log(query);
  const userExists = await User.exists(query);
  console.log();
  userExists
    ? res
        .status(400)
        .json({ success: true, message: "Email address Already Exist" })
    : res.status(200).json({ success: false, message: "Doesnt exist" });
  console.log(userExists, req.body,'user exist');
};

// Verify User Email Address
export const VerifyUserEmail = async (req, res) => {
  const { _id, secretCode } = req.params;
  console.log(_id, secretCode);

  try {
    const findUser = await User.findById(mongoose.Types.ObjectId(`${_id}`));

    //   Check if user is registered first
    if (findUser) {
      const { email, account } = findUser;
      console.log("users is a valid member, details :", findUser);

      // Check if code is stil in database
      const GetCode = await Code.findOne({
        email,
      });
      console.log("true user is a registered member", GetCode);

      //  If verification code is still valid (not expired), update users status
      if (GetCode) {
        const updateUserStatus = await User.updateOne(
          { email },
          {
            status: "active",
            verified_on: Date.now(),
          }
        );

        const updateAccount = await Account.updateOne(
          {
            _id: mongoose.Types.ObjectId(`${account}`),
          },
          { account_number: `MS1${SecretCodeToUser("0", 9)}` }
        );
        console.log(
          "user acccount successfully updated",
          updateUserStatus,
          "Hurray, user has been given a personal account number",
          updateAccount
        );

        await Code.deleteMany({ email });
        res.status(200).json({ success: true, data: "User verified" });
      } else {
        console.log("Verification code has expired");
        res.status(400).json({ success: false, err: "code not found" });
      }
      //  If verification code is still valid
    }
    //   Check if user is registered first
    else {
      res.status(400).json({ success: false, err: "User not found" });
    }
  } catch (err) {
    res.status(400).json({ success: false, err });
    console.log("err", err);
  }
};

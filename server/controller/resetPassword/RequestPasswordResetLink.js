import mongoose from "mongoose";
import passport from "passport";
import User from "../../models/SignUp.js";
import ResetUserPassport from "../../models/ResetPassword.js";
import {
  NewSecretCode,
  SecretCodeToUser,
  sendMailToUser,
} from "../../utils/utils.js";

const ResetPassword = async (req, res) => {
  try {
    const userEmail = req.body;
    console.log("userEmail here", userEmail);
    const isUserRegistered = await User.findOne(userEmail);
    console.log(
      "Is user email registered",
      isUserRegistered
        ? "yes, user email is registered"
        : "no, user email is not registered"
    );

    // If user's email address is not found
    if (!isUserRegistered) {
      return res.status(400).json({
        success: false,
        err: "This email address is not registered",
        isUserRegistered,
      });
    }

    const { email, firstname, lastname, _id } = isUserRegistered;

    const isUserPasswordResetCodeValid = await ResetUserPassport.findOne({
      email: email,
    });

    // If reset code has expired then send a new one
    //   else do nothing

    if (!isUserPasswordResetCodeValid) {
      const newCode = await NewSecretCode(ResetUserPassport, email);

      if (newCode) {
        const { secretCode } = newCode;
        const verification = `
         Hi ${firstname}
         <h2> Please <a href = '${process.env.EMAIL_LINK}/reset-password/${_id}/${secretCode}'> Reset<a/> your password<h2/> 
         `;
        const sendResetPasswordCode = await sendMailToUser(
          firstname,
          lastname,
          email,
          verification
        );
        console.log(newCode);

        // If reset password has been sent to user email address
        if (sendResetPasswordCode) {
          console.log("email address has been Sent successfully");
        } else {
          // else If reset password has not been sent to user email address
          console.log("email address has not been Sent");
          res.status(400).json({ success: false });
          console.log(sendResetPasswordCode);
        }
      }
    }

    res.status(200).json({
      success: true,
      message: "A reset code has been sent to your email account",
    });
  } catch (err) {
    return res.status(400).json({ success: false, err: err });
  }
};
export default ResetPassword;

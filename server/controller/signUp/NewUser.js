// Internal
// External
import passport from "passport";
import passportLocal from "passport-local";
import Account from "../../models/Account.js";
import Notifications from "../../models/Notifications.js";
import SecretCodeThatLastForTenMinutes from "../../models/SecretCode.js";
import User from "../../models/SignUp.js";
import {
  NewSecretCode,
  SecretCodeToUser,
  sendMailToUser,
} from "../../utils/utils.js";
// Config

const LocalStrategy = passportLocal.Strategy;
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    User.authenticate()
  )
);

const createNewUser = async (req, res) => {
  console.log(req.body, "form here");

  // Get the major details from  user then stores it
  try {
    const { firstname, lastname, username, email, password } = await req.body;
    const deleted_on = "";
    const deleted_by = "";

    // Create  a new account number
    const createUserAccountNumber = await new Account({
      account_number: "",
    }).save();

    const createNewNotification = await new Notifications({
      account_number: "",
    }).save();

    /* If Notification was successfully created */
    if (createNewNotification) {
      const { _id: notificationId } = createNewNotification;
      console.log(createNewNotification);
      /* If account number was successfully created */
      if (createUserAccountNumber) {
        //   Get ser unique id
        const { _id } = createUserAccountNumber;
        console.log(createUserAccountNumber);
        const form = {
          firstname,
          lastname,
          username,
          email,
          account: _id,
          notifications: notificationId,
          deleted_by,
          deleted_on,
        };
        await User.register(form, password, async (err, user) => {
          if (user) {
            const { email, firstname, _id } = user;
            console.log(user);
            /* Creates a new secret code to verify users */
            const createVerificationCode = await NewSecretCode(
              SecretCodeThatLastForTenMinutes,
              email
            );

            if (createVerificationCode) {
              const { secretCode } = createVerificationCode;
              /* Send the verification code to users email account */
              const verification = `
     <h2>Hi, ${firstname.toUpperCase()}</h2>,
<p>Welcome to Kweeqfundz Bank app</p>
     <p>
     Please 
     <a href ='http://localhost:3000/verification/verify-account/${_id}/${secretCode}'>Verify</a>
     your email address
     </p>`;

              /* Send verification code to user */
              const sendVerificationCodeToUsers = await sendMailToUser(
                firstname,
                lastname,
                email,
                verification
              );

              if (sendVerificationCodeToUsers) {
                res.status(200).json({
                  success: true,
                  message: `Your account has been created`,
                });
              }

              /* Send the verification code to users account */
            } else {
              res
                .status(400)
                .json({ success: false, message: "Could not send email" });
            }
          } else {
            /* Creates a new secret code to verify users */
            res.status(400).json({
              success: false,
              message: `Your Account could not be created.  ${err}`,
            });
          }
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err });
  }
};

export default createNewUser;

import mongoose from "mongoose";
import randomatic from "randomatic";
import {
  initializePayment,
  verifyPayment,
} from "../../config/Paystack.config.js";
import Account from "../../models/Account.js";
import Notifications from "../../models/Notifications.js";
import User from "../../models/SignUp.js";

export const VerifyReferenceInTransaction = (req, res) => {
  // Get transaction reference
  const { ref } = req.body;
  console.log(ref, "reference", req.body, req.query);
  User.findOne(
    { "transactions.ref": ref },
    {
      "transactions.$": 1,
    },
    (err, userProfile) => {
      console.log(err, userProfile);
      // IF ref was found in transaction array, send a ok response to the server
      if (!userProfile || err || userProfile === null) {
        res
          .status(404)
          .json({ success: false, message: "Ref not found in database" });
      }
      if (userProfile) {
        User.findById(mongoose.Types.ObjectId(userProfile._id))
          .select(
            "-status -email -profileImg  -created_on -verified_on -transaction_pin -username -deleted_by -transactions -deleted_by"
          )
          .populate("account", "-_id -balance -__v")
          .exec((err, doc) => {
            if (doc) {
              const { transactions } = userProfile;
              console.log(transactions[0], doc);
              res
                .status(200)
                .json({ success: true, data: { transactions, doc } });
            }
          });
      }
    }
  );
};

// After user funds account, verify and store it in the backend here
export const VerifyTransaction = (req, res) => {
  const ref = randomatic("0A", 10);
  const { reference, trxref } = req.body;
  console.log(req.body, trxref);
  verifyPayment(reference, (error, body) => {
    if (error) {
      console.log("error", error);
      res.status(403).json({ success: false, message: `Error ${error}` });
    }
    // Data gotten from Paystack
    const { data } = JSON.parse(body);
    console.log("user body from paystck", body);
    if (data) {
      console.log("user transaction", data);
      const {
        metadata: { userId, transactionType, narration, accountId },
        amount,
        status,
        created_at,
      } = data;

      const amountConvertedToNaira = Number(amount / 100);

      const transaction = {
        source_account_id: accountId,
        amount: amountConvertedToNaira,
        status,
        created_at,
        transactionType,
        narration,
        transaction_type: "Fund",
        ref,
      };

      /* Update user account balance */
      User.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(userId) },
        {
          $push: { transactions: transaction },
        }
      )
        .then((transaction) => {
          if (status === "success") {
            Account.findByIdAndUpdate(
              mongoose.Types.ObjectId(accountId),
              {
                $inc: { balance: amountConvertedToNaira },
              },
              { new: true },
              (err, doc) => {
                // console.log(doc, err)
                /* if successful  */

                if (doc) {
                  const notification = {
                    amount: amountConvertedToNaira,
                    message: "Success",
                    user_id: userId,
                    receiver: "",
                    transaction_type: "Fund",
                    ref,
                    payment_method: "Moneydais App",
                  };
                  const { notifications: notificationId } = transaction;
                  // Update Notifications
                  Notifications.findOneAndUpdate(
                    {
                      _id: mongoose.Types.ObjectId(`${notificationId}`),
                    },
                    {
                      $push: { notifications: notification },
                    },
                    (err, doc) => {
                      console.log(err, doc, "Notification update");
                      doc && res.status(200).json({ success: true, ref });
                    }
                  );
                }
              }
            );
          }
        })
        .catch((err) => {
          res.status(403).json({ success: false, message: err });
          console.log(err);
        });
    }
  });
};
/* Update user account balance */

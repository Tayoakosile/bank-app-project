import mongoose from "mongoose";
import randomatic from "randomatic";
import {
  initializePayment,
  verifyPayment,
} from "../../config/Paystack.config.js";
import Account from "../../models/Account.js";
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
      userProfile && res.status(200).json({ success: true, data: userProfile });
    }
  );
};

// After user funds account, verify and store it in the backend here
export const VerifyTransaction = (req, res) => {
  const { reference, trxref } = req.body;

  verifyPayment(reference, (error, body) => {
    if (error) {
      console.log("error", error);
    }
    const { data } = JSON.parse(body);
    console.log(data);
    if (data) {
      console.log(data);
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
        transaction_type: "credit",
        ref: randomatic("0A", 10),
      };

      /* Update user account balance */

      User.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(userId) },
        {
          $push: { transactions: transaction },
        }
      )
        .then((transaction) => {
          // Get the reference used to recognize transaction
          const { ref } = transaction.transactions.slice(-1)[0];
          // if paystack callback Freturn success
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
                  console.log(doc);
                  res.status(200).json({ success: true, ref });
                }
              }
            );
          }
        })
        .catch((err) => console.log(err));
    }
  });
};
/* Update user account balance */

import User from "../../models/SignUp.js";
import mongoose from "mongoose";
import Account from "../../models/Account.js";
import randomatic from "randomatic";
import {
  NewTransaction,
  MSAppNotificationToServer,
} from "../../utils/utils.js";
import MonsecureNotifications from "../../models/Notifications.js";

export const TransactionPin = async (req, res) => {
  const { _id, pin } = req.body;

  await User.findByIdAndUpdate(
    mongoose.Types.ObjectId(_id),
    {
      transaction_pin: parseInt(pin),
    },
    { new: true },
    (err, doc) => {
      if (doc) {
        return res
          .status(200)
          .json({ success: true, message: "pin successfully update" });
      }
      err &&
        res
          .status(400)
          .json({ success: false, message: "failed in setting pin" });
      console.log(err, doc);
    }
  );
};

export const ValidatePin = async (req, res) => {
  const ref = randomatic("0", 10);
  const { _id, pin, receiverID, transferSum, narration, destination_bank } =
    req.body;
  console.log(destination_bank);
  await User.findOne(
    { _id: mongoose.Types.ObjectId(_id) },
    async (err, doc) => {
      if (doc) {
        const {
          account,
          transaction_pin,
          firstname,
          notifications: MSAppNotification,
        } = doc;
        const isUserPin = Number(pin) === Number(transaction_pin);
        /* If pin is not valid then send error */
        if (!isUserPin) {
          res.status(400).json({ success: false, message: "Invalid Pin" });
        } else {
          /* If pin is not valid then send error */

          /* Else make transaction*/
          const debitSenderAccount = await Account.findByIdAndUpdate(
            mongoose.Types.ObjectId(account),
            {
              $inc: { balance: -transferSum },
            },
            { new: true }
          ).populate("account");

          /* If transaction was successful */
          if (debitSenderAccount) {
            // Credit receiver account with account number
            await User.findById(
              mongoose.Types.ObjectId(receiverID),
              async (err, receiverInfo) => {
                console.log(err, receiverInfo, "Big bro");
                if (receiverInfo) {
                  // Credit receiver account with account number

                  MSAppNotificationToServer(MSAppNotification, {
                    message: "success",
                    amount: transferSum,
                    ref: `MS11${ref}`,
                    transaction_type: "debit",
                    receiver: `${receiverInfo.firstname} ${receiverInfo.lastname}`,
                    payment_method: "Monsecure Balance ",
                    user_id: _id,
                  });

                  // If notification was successfully stored in database
                  const creditReceiverAccount = await Account.findByIdAndUpdate(
                    mongoose.Types.ObjectId(receiverInfo.account),
                    {
                      $inc: { balance: transferSum },
                    },
                    { new: true }
                  ).populate("account");

                  if (creditReceiverAccount) {
                    // Debit alert details from sender

                    /* Record transaction in the server */
                    NewTransaction(_id, {
                      source_account_id: receiverID,
                      destination_account_id: _id,
                      sender_name: `${doc.firstname} ${doc.lastname}`,
                      amount: Number(transferSum),
                      status: "success",
                      transaction_type: "credit",
                      narration,
                      destination_account_number: ` ${debitSenderAccount.account_number}`,
                      destination_bank,
                      ref: `MS11${ref}`,
                    });
                    NewTransaction(receiverID, {
                      source_account_id: _id,
                      destination_account_id: receiverID,
                      destination_bank,
                      receiver_name: `${receiverInfo.firstname} ${receiverInfo.lastname}`,
                      amount: Number(transferSum),
                      status: "success",
                      transaction_type: "debit",
                      narration,
                      ref: `MS11${ref}`,
                      destination_account_number: ` ${creditReceiverAccount.account_number}`,
                    });

                    // Send notification
                    MSAppNotificationToServer(receiverInfo.notifications, {
                      message: "success",
                      amount: transferSum,
                      sender: `${doc.firstname} ${doc.lastname}`,
                      ref: `MS11${ref}`,
                      transaction_type: "credit",
                      payment_method: "Monsecure Balance ",
                      user_id: receiverInfo._id,
                    });
                    // Send notification

                    /* Send ref to Frontend */
                    res.status(200).json({
                      success: true,
                      message: `MS11${ref}`,
                    });
                  }
                }
              }
            );
          }
        }

        /* Else Make transaction */
      }
    }
  );
};

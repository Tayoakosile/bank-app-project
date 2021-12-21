import User from "../../models/SignUp.js";
import mongoose from "mongoose";
import Account from "../../models/Account.js";
import { NewTransaction } from "../../utils/utils.js";
import randomatic from "randomatic";

export const TransactionPin = async (req, res) => {
  const { _id, pin } = req.body;

  const updateUserPin = await User.findByIdAndUpdate(
    mongoose.Types.ObjectId(_id),
    {
      transaction_pin: parseInt(pin),
    },
    { new: true }
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
        const { account, transaction_pin, firstname } = doc;
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
            await User.findById(
              mongoose.Types.ObjectId(receiverID),
              async (err, receiverInfo) => {
                console.log(err, receiverInfo, "Big bro");
                if (receiverInfo) {
                  // Credit reveiver account with such number
                  const creditReceiverAccount = await Account.findByIdAndUpdate(
                    mongoose.Types.ObjectId(receiverInfo.account),
                    {
                      $inc: { balance: transferSum },
                    },
                    { new: true }
                  ).populate("account");

                  if (creditReceiverAccount) {
                    // Debit alert details from sender
                    const transactionFromSender = {
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
                    };

                    // Credit alert details to receiver
                    const transactionToReceiver = {
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
                    };

                    /* Record transaction in the server */
                    NewTransaction(User, _id, transactionFromSender);
                    NewTransaction(User, receiverID, transactionToReceiver);

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

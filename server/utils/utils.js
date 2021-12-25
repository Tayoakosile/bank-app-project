import crypto from "crypto";
import mongoose from "mongoose";
import GridFsStorage from "multer-gridfs-storage";
import mailJet from "node-mailjet";
import randomize from "randomatic";
import MoneydaisNotifications from "../models/Notifications.js";
import User from "../models/SignUp.js";

export const sendMailToUser = (firstname, lastname, email, verification) => {
  const sendEmail = mailJet.connect(
    process.env.EMAIL_API_KEY_PUBLIC,
    process.env.EMAIL_API_KEY_PRIVATE
  );

  const request = sendEmail.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "oluwatayocodes@gmail.com",
          Name: "Akosile from KweeqFundz",
        },
        To: [
          {
            Email: email,
            Name: firstname + "" + lastname,
          },
        ],
        Subject: `Hi ${firstname} ${lastname}`,
        TextPart: "My first Mailjet email",
        HTMLPart: verification,
        CustomID: "AppGettingStartedTest",
      },
    ],
  });
  return request;
};
/* Generate random codes */
export const SecretCodeToUser = (random, length) => {
  return randomize(random, length);
};
// Creates a random code that lasts for 10 minutes for each user
export const NewSecretCode = (model, email) => {
  const newSecretCode = new model({
    email,
    secretCode: SecretCodeToUser("0as", 13),
  });
  console.log("new secret code", newSecretCode);

  return newSecretCode.save();
};

// Sends new notification to database
export const MSAppNotificationToServer = async (userId, notification) => {
  const newNotification = await MoneydaisNotifications.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(userId) },

    {
      $push: { notifications: notification },
    }
  );
};

export const NewTransaction = async (userId, transaction) => {
  const transactionMadeByUser = await User.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(userId) },
    {
      $push: { transactions: transaction },
    }
  );
  return transactionMadeByUser;
};
const fileStorage = (promise) => {
  const storage = new GridFsStorage({
    db: promise,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename =
            buf.toString("hex") + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: "AllRecordLabelSongsAndImages",
          };
          resolve(fileInfo);
        });
      });
    },
  });
  return storage;
};

export const upload = (promise) => {
  const multerImage = promise;
  return multerImage;
};

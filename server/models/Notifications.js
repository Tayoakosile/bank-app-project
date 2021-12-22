import mongoose from "mongoose";
const { Schema } = mongoose;

// FOr each transaction users make
const transaction = new Schema({
  message: String,
  created_at: { type: Date, default: Date.now() },
  deleted_on: Date,
  status: { type: String, default: "pending" },
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "Account",
  },
});

const message = new Schema({
  message: String,
  created_at: { type: Date, default: Date.now() },
  deleted_on: Date,
  status: { type: String, default: "pending" },
  user_id: {
    type: mongoose.Types.ObjectId,
  },
});

const AppNotifications = new Schema({
  transactions: [transaction],
  messages: [message],
});
const MonsecureNotifications = mongoose.model(
  "Notifications",
  AppNotifications
);
export default MonsecureNotifications;

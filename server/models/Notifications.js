import mongoose from "mongoose";
const { Schema } = mongoose;

// FOr each notification users make
const notification = new Schema({
  message: String,
  created_at: { type: Date, default: Date.now() },
  deleted_on: { type: Date, default: null },
  status: { type: String, default: "pending" },
  ref: String,
  transaction_type: String,
  payment_method: String,
  receiver: { type: String, default: null },
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "Account",
  },
});

const AppNotifications = new Schema({
  notifications: [notification],
});

const MonsecureNotifications = mongoose.model(
  "Notifications",
  AppNotifications
);
export default MonsecureNotifications;

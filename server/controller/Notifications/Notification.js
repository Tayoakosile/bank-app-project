import User from "../../models/SignUp.js";
import mongoose from "mongoose";

export const AllNotifications = async (req, res) => {
  const { _id } = req.body;
  //   Find all notifications
  await User.findById(mongoose.Types.ObjectId(_id), (err, doc) => {})
    .populate("notifications", "-account -status -firstname")
    .exec((err, doc) => {
      doc &&
        res.status(200).json({ success: true, message: doc.notifications });

      err && res.status(400).json({ success: false, message: "not found" });
    });
};

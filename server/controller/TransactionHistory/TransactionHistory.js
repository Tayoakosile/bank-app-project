import mongoose from "mongoose";
import User from "../../models/SignUp.js";

export const AllTransaction = (req, res) => {
  const { _id } = req.body;
  User.findById(mongoose.Types.ObjectId(_id), (err, doc) => {
    err ||
      (!doc &&
        res.status(200).json({ success: false, message: "User not found" }));
        // if successfull send all transactions back
    doc && res.status(200).json({ success: true, message: doc.transactions });
  });
};

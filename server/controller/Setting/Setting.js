import User from "../../models/SignUp.js";
import mongoose from "mongoose";
const Setting = (req, res) => {
  const { id } = req.params;
  const newProfile = req.body;
  console.log(newProfile, id);

  User.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(id) },
    req.body,
    (err, doc) => {
      err && res.status(400).json({ success: false });
      doc && res.status(200).json({ success: true });
    }
  );
};
export default Setting;

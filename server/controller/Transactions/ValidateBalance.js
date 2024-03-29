import Mongoose from "mongoose";
import User from "../../models/SignUp.js";

const ValidateBalance = async (req, res) => {
  const { userId, amount } = req.body;
  console.log(req.body);
  /* Search for users then validate if amount typed in is lesser than balance  */
  const { account } = await User.findById(
    Mongoose.Types.ObjectId(userId)
  ).populate("account");
  console.log(account);

  if (!account || account == null) {
    res
      .status(400)
      .json({ success: false, message: "Specified user not found" });
  }
  const isUserAmountGreaterThanAccountBalance =
    Number(account.balance) >= Number(amount);
  if (!isUserAmountGreaterThanAccountBalance) {
    res.status(400).json({
      success: false,
      message: `You have only ${Number(account.balance)} left`,
      balance: Number(account.balance),
    });
  } else {
    res
      .status(200)
      .json({ success: true, message: "User have enough in his account " });
  }
};

export default ValidateBalance;

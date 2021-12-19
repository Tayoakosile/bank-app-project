/* Transactions */
import express from "express";
import {
  VerifyReferenceInTransaction,
  VerifyTransaction,
} from "../controller/Transactions/Transaction.js";

const route = express.Router();

// Verify reference in transaction
route.post("/transaction/verifyRef", VerifyReferenceInTransaction);
// Verify reference in transaction

route.post("/transaction/verify", VerifyTransaction);

/* Transactions */
export default route;

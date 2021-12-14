import React from "react";
import useTransactionHistory from "../../../hooks/useTransactionHistory";
import EmptyTransactionBoard from "./EmptyTransactionBoard";
import LastTransaction from "./LastTransaction";
const TransactionHistory = () => {
  const {
    daysSelection,
    storeUserSelection,
    setStoreUseSelection,
    transactions,
  } = useTransactionHistory();
  console.log(transactions);
  return (
    <React.Fragment>
      {transactions ? <EmptyTransactionBoard /> : <LastTransaction />}
    </React.Fragment>
  );
};

export default TransactionHistory;

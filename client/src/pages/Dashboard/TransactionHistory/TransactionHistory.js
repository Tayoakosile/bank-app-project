import React, { useEffect } from "react";
import useTransactionHistory from "../../../hooks/useTransactionHistory";
import EmptyTransactionBoard from "./EmptyTransactionBoard";
import LastTransaction from "./LastTransaction";
const TransactionHistory = () => {
  const { transactions, isLoading } = useTransactionHistory();
  if (isLoading) {
    return <div>running </div>;
  }
  return (
    <React.Fragment>
      {transactions === [] || transactions <= 0 ? (
        <EmptyTransactionBoard />
      ) : (
        <LastTransaction />
      )}
    </React.Fragment>
  );
};

export default TransactionHistory;

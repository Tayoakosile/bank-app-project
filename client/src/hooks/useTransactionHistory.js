import React, { useEffect, useState } from "react";
import useAuth from "../auth/useAuth";

const useTransactionHistory = () => {
  const { data } = useAuth();

  const daysSelection = ["Today", "Yesterday", "This Week"];
  const [storeUserSelection, setStoreUseSelection] = useState("Today");
  const [transactions, setTransactions] = useState("");

  useEffect(() => {
    if (data) {
      setTransactions(data.authorizedData.transactions);
    }
  }, [data]);

  console.log(transactions);

  return {
    daysSelection,
    storeUserSelection,
    setStoreUseSelection,
    transactions,
  };
};

export default useTransactionHistory;

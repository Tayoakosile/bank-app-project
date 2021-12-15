import React, { useEffect, useState } from "react";
import useAuth from "../auth/useAuth";

const useTransactionHistory = () => {
  const { data, isLoading } = useAuth();

  const daysSelection = ["Today", "Yesterday", "This Week"];
  const [storeUserSelection, setStoreUseSelection] = useState("Today");
  const [transactions, setTransactions] = useState("");

  useEffect(() => {
    if (data) {
      setTransactions(data.authorizedData.transactions);
    }
  }, [data]);


  return {
    daysSelection,
    storeUserSelection,
    setStoreUseSelection,
    isLoading ,
    transactions,
  };
};

export default useTransactionHistory;

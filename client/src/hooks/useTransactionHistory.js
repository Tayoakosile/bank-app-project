import React from "react";

const useTransactionHistory = () => {
  const daySelection = ["Today", "Yesterday", "This Week"];
  return { daySelection };
};

export default useTransactionHistory;

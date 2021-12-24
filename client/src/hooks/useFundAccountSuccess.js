import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { postRequestToServer } from "../api/api";

const useFundAccountSuccess = () => {
  const { ref } = useParams();

  const [transactionDetails, setTransactionDetails] = useState({
    created_at: "2021-12-18T21:53:09.000Z",
    account_number: "2020",
    amount: 202,
  });

  const [transactionUserDetails, setTransactionUserDetails] = useState({
    firstname: "monsecure",
    lastname: "monsecure",
    account: { account_number: "92jsj" },
  });

  // Send the ref gotten from to backend

  const {
    isError,
    isLoading,
    isSuccess,
    data: verifiedTransaction,
  } = useQuery(
    "verify-ref",
    () => {
      return postRequestToServer("/transaction/verifyRef", { ref });
    },
    {
      refetchOnMount: true,
      retry: 2,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    }
  );

  useEffect(() => {
    if (!isLoading) {
      if (isSuccess) {
        if (verifiedTransaction) {
          setTransactionDetails(verifiedTransaction.data.data.transactions[0]);
          setTransactionUserDetails(verifiedTransaction.data.data.doc);
        }
      }
    }
  }, [isError, isSuccess, verifiedTransaction, isLoading, ref]);
  console.log(
    transactionDetails,
    "transaction details",
    transactionUserDetails,
  );

  return {
    ref,
    isError,
    isSuccess,
    isLoading,
    verifiedTransaction,
    transactionDetails,
    transactionUserDetails,
  };
};

export default useFundAccountSuccess;

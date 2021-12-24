import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { postRequestToServer } from "../api/api";

const useAllTransactions = () => {
  const { userId } = useParams();
  const { isLoading, isError, isSuccess, data } = useQuery(
    "transaction-history",
    () => {
      return postRequestToServer("/transaction-history", {
        _id: userId,
      });
    }
  );
  useEffect(() => {
    console.log(isLoading, isError, isSuccess, data);
  }, [isLoading, isError, isSuccess, data]);
  return { isLoading, isError, isSuccess, data };
};

export default useAllTransactions;

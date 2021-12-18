import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import { postRequestToServer } from "../api/api";

const useConfirmTransaction = () => {
  const history = useHistory();
  // TO send transaction details to user
  const { isLoading, isSuccess, error, data, isError, mutate } = useMutation(
    (transactionDetails) => {
      return postRequestToServer(
        "/transaction/validatepin",
        transactionDetails
      );
    }
  );
  const [userTransactions, setUserTransaction] = useState({
    hi: "Hi",
    msg: "Message",
  });
  // Set show transaction password
  const [showTransactionPassword, setShowTransactionPassword] = useState(false);
  // Set show transaction password

  useEffect(() => {
    setUserTransaction(reactLocalStorage.getObject("transactionDetails"));
  }, [reactLocalStorage]);

  console.log(userTransactions);

  const finishTransaction = () => {
    setShowTransactionPassword(true);
    console.log("clicked", showTransactionPassword);
  };
  //   Verifies users ,if pin is valid,it then continues with the transfer
  const handleVerifyPin = (userPin) => {
    const pin = Number(userPin);
    const { _id, receiverID, amount: transferSum } = userTransactions;
    mutate({ _id, pin, receiverID, transferSum });
    // _id, pin, receiverID, transferSum;
  }; //   Verifies users pin

  // Response from server about errors
  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      history.push("/account/transfer/monsecure-success");
    }
  }, [isError, error, data, isSuccess]);
  // Response from server about errors
  return {
    userTransactions,
    showTransactionPassword,
    setShowTransactionPassword,
    finishTransaction,
    handleVerifyPin,
    isError,
    error,
    data,
    isSuccess,
  };
};

export default useConfirmTransaction;

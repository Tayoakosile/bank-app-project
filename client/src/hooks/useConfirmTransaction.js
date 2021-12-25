import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import { postRequestToServer } from "../api/api";

const useConfirmTransaction = () => {
  const history = useHistory();
  // TO send transaction details to user
  const { isSuccess, error, data, isError, mutate } = useMutation(
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
  }, []);


  const finishTransaction = () => {
    setShowTransactionPassword(true);
  };
  //   Verifies users ,if pin is valid,it then continues with the transfer
  const handleVerifyPin = (userPin) => {
    const pin = Number(userPin);
    const {
      _id,
      receiverID,
      destination_bank,
      amount: transferSum,
      remarks: narration,
    } = userTransactions;
    mutate({ _id, pin, receiverID, transferSum, narration, destination_bank });
    // _id, pin, receiverID, transferSum;
  }; //   Verifies users pin

  // Response from server about errors
  useEffect(() => {
    if (isSuccess) {
      console.log(data.data.message);
      data.data &&
        history.replace(`/account/fund-success/${data.data.message}`);
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

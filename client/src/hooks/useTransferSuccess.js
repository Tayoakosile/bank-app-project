import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { reactLocalStorage } from "reactjs-localstorage";

const useTransferSuccess = () => {
  const history = useHistory();
  const [
    retrieveUserDetailsFromLocalStorage,
    setRetrieveUserDetailsFromLocalStorage,
  ] = useState({ amount: 200, firstname: "tayo" });

  useEffect(() => {
    setRetrieveUserDetailsFromLocalStorage(
      reactLocalStorage.getObject("transactionDetails")
    );
  }, []);

  const completeTransaction = () => {
    reactLocalStorage.remove("transactionDetails");
    history.push("/dashboard");
  };

  console.log(retrieveUserDetailsFromLocalStorage);

  return { retrieveUserDetailsFromLocalStorage, completeTransaction };
};

export default useTransferSuccess;

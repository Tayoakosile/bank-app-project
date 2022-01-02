import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router";
import { reactLocalStorage } from "reactjs-localstorage";
import { postRequestToServer } from "../api/api";
import useStore from "../zustand";

const useTransactionPin = () => {
  const { user } = useStore((state) => state);
  const cancelRef = React.useRef();
  const history = useHistory();
  //   Get user id from global state
  const [userDetail, setUserDetail] = useState({ pin: null, _id: null });

  //   Get user id from global state
  const [isSamePinCode, setIsSamePinCode] = useState(true);

  // Send pin to backend
  const { mutate, isSuccess, isLoading, isError, data } = useMutation((pin) => {
    return postRequestToServer("/transaction/set-pin", pin);
  });
  // Send pin to backend
  useEffect(() => {
    if (user) {
      setUserDetail({ _id: user._id, pin: user.transaction_pin });
    }
  }, [user, userDetail._id, userDetail.pin]);

  /* Redirect to a new site to confirm pin */
  const redirectToConfirmPassword = (userPin) => {
    if (userPin) {
      reactLocalStorage.set("userPin", userPin);
      history.push("/account/transaction-pin/confirm");
    }
    /* Redirect to a new site to confirm pin */
  };

  // Checks if the pin are the same
  const NewPin = (userPin) => {
    const PinCode = reactLocalStorage.get("userPin");
    setIsSamePinCode(Number(userPin) === Number(PinCode));
  };
  // Checks if the pin are the same

  //submit Pin to Backend
  // const UpdateUserPin = () => {
  //   const userPin = reactLocalStorage.get("userPin");
  //   mutate({ pin: userPin, _id: user._id });
  // };

  // useEffect(() => {
  //   if (isSuccess) {
  //     reactLocalStorage.remove("userPin");
  //   }
  // }, [isSuccess, isLoading]);


  //submit Pin to Backend

  return {
    NewPin,
    userDetail,
    redirectToConfirmPassword,
    isSamePinCode,
    // UpdateUserPin,
    isSuccess,
    isLoading,
    isError,
  };
};

export default useTransactionPin;

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { postRequestToServer } from "../api/api";
import useAuth from "../auth/useAuth";

const useTransferFund = () => {
  const [userToCreditDetails, setCreditUserDetails] = React.useState({
    profile: null,
    firstname: "To",
    lastname: "Account",
  });
  // Keeps the label floating
  const [isAccountNumber, setisAccountNumber] = useState(false);
  const [isAmountTypedIn, setisAmountTypedIn] = useState(false);
  const [isRemarksTypedIn, setIsRemarksTypedIn] = useState(false);

  /* THis enables the "firstname" label to float if the firstname has been typed in*/
  const handleAccountNumberChange = (firstName) =>
    firstName === "" || firstName <= 0
      ? setisAccountNumber(false)
      : setisAccountNumber(true);

  /* THis enables the "lastname" label to float if the lastname has been typed in*/
  const handleAmountIn = (lastName) =>
    lastName === "" || lastName <= 0
      ? setisAmountTypedIn(false)
      : setisAmountTypedIn(true);

  /* THis enables the "username" label to float if the username has been typed in*/
  const handleRemarks = (userName) =>
    userName === "" || userName <= 0
      ? setIsRemarksTypedIn(false)
      : setIsRemarksTypedIn(true);

  // Gets user's id from profile
  const { data, isLoading: fetchProfile } = useAuth();
  const [userId, setUserId] = React.useState("");
  useEffect(() => {
    !fetchProfile && setUserId(data.authorizedData._id);
  }, [data]);

  // Gets user's id from profile
  const {
    mutate,
    data: ProfileOfUserSearchedByCurrentUser,
    error,
    isLoading,
    isError,
    isSuccess,
  } = useMutation((formDetails) => {
    const form = postRequestToServer("/search", formDetails);
    return form;
  });

  const {
    register,
    getValues,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });
  const [userInput, setUserInput] = React.useState("");

  //   If user input the 8 digit account number, search for it in the database
  useEffect(() => {
    if (userInput.length >= 8) {
      mutate({ acctNumber: userInput, loggedInUserID: userId });
    }
  }, [userInput]);
  console.log(errors);
  const submitTransfer = (data) => {
    console.log(errors, isValid, "errors");
    console.log(data, getValues("amount"));
  };

  // Check if amount about to transfer is up to #50
  const isAmountAboutToTransferUpToFiftyNaira = (usersAmount) => {
    const loggedInUserId = userId;
    console.log(usersAmount);
    if (usersAmount >= 50) {
      // Check if amount user typed in is greater than users account balance
      postRequestToServer("/validatebalance", {
        userId: loggedInUserId,
        amount: usersAmount,
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }

    return "Amount must be up to 50 naira";
  };

  useEffect(() => {
    if (!isLoading) {
      // If data is not loading
      if (isSuccess) {
        const { profileImg, firstname, lastname } =
          ProfileOfUserSearchedByCurrentUser.data.message;
        setCreditUserDetails({ profileImg, firstname, lastname });
        console.log("userToCreditDetails", userToCreditDetails);
      }
      if (isError) {
        setCreditUserDetails({
          profileImg: null,
          firstname: "User not found",
        });
      }
    }
  }, [isSuccess, isError, isLoading]);
  return {
    register,
    getValues,
    handleSubmit,
    clearErrors,
    submitTransfer,
    userInput,
    setUserInput,
    userToCreditDetails,
    isSuccess,
    isLoading,
    isError,
    errors,
    isValid,
    isAccountNumber,
    isAmountTypedIn,
    isRemarksTypedIn,
    handleAccountNumberChange,
    handleAmountIn,
    handleRemarks,
    isAmountAboutToTransferUpToFiftyNaira,
  };
};

export default useTransferFund;

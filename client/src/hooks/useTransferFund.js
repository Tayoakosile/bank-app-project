import { useDisclosure } from "@chakra-ui/hooks";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import { postRequestToServer } from "../api/api";
import useAuth from "../auth/useAuth";

const useTransferFund = () => {
  const history = useHistory();
  // Modal controller
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Modal controller

  const [userToCreditDetails, setCreditUserDetails] = React.useState({
    profile: null,
    firstname: "To",
    lastname: "Account",
  });
  const [isUserAccountBalanceLow, setIsUserAccountBalanceLow] = useState(true);
  // open modal
  // const [isShowModal, setIsShowModal] = useState(false);
  // open modal
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

  const handleAmountIn = (amount) =>
    amount === "" || amount <= 0
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
  }, [data, fetchProfile]);

  // Gets user's id from profile
  const {
    mutate,
    data: ProfileOfUserSearchedByCurrentUser,

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

    trigger,
    clearErrors,
    formState: { errors, isValid },
  } = useForm();
  const [userInput, setUserInput] = React.useState("");
  //   If user input the 8 digit account number, search for it in the database

  const validateAccountNumber = (accountNumber) => {
    if (accountNumber.length >= 8) {
      mutate({ acctNumber: accountNumber, loggedInUserID: userId });
    }

    console.log(isError);
    return isError ? "Invalid Account Number" : true;
  };

  // Validate if account number is registered  in the database
  useEffect(() => {
    if (userInput.length >= 8) {
      mutate({ acctNumber: userInput, loggedInUserID: userId });
    }
  }, [userInput, userId, mutate]);

  //set user transaction  details to local storage
  const submitTransfer = (data) => {
    const _id = userId;
    if (data) {
      const { firstname, lastname, _id: receiverID } = userToCreditDetails;
      reactLocalStorage.setObject("transactionDetails", {
        ...data,
        receiverID,
        firstname,
        lastname,
        _id,
        destination_bank: "Moneydais",
      });

      const isTransactionDetailsInLocalStorage = Object.keys(
        reactLocalStorage.getObject("transactionDetails")
      ).length;

      console.log(isTransactionDetailsInLocalStorage);
      isTransactionDetailsInLocalStorage > 0 &&
        history.push("/account/transfer/moneydais/confirm");
    }
  };

  // Check if amount about to transfer is up to #50
  const isAmountAboutToTransferUpToFiftyNaira = (usersAmount) => {
    const loggedInUserId = userId;
    if (usersAmount >= 50) {
      // Check if amount user typed in is greater than users account balance
      postRequestToServer("/validatebalance", {
        userId: loggedInUserId,
        amount: usersAmount,
      })
        .then((res) => {
          console.log(res);
          setIsUserAccountBalanceLow(true);
          return false;
        })
        .catch((err) => {
          const balance = err.response.data.balance;
          setIsUserAccountBalanceLow(
            `Insufficient balance, you have 
            ₦${balance}.00 left`
          );
        });
      return isUserAccountBalanceLow;
    } else {
      // setError("amount", {
      //   type: "validate",
      //   message: "Amount must be up to 50 naira",
      // });
      return "Amount must be up to 50 naira";
    }
  };

  console.log(errors);
  useEffect(() => {
    if (!isLoading) {
      // If done loading
      if (isSuccess) {
        const { profileImg, firstname, lastname, _id } =
          ProfileOfUserSearchedByCurrentUser.data.message;
        setCreditUserDetails({ profileImg, firstname, lastname, _id });
      }

      if (isError) {
        setCreditUserDetails({
          profileImg: null,
          firstname: "User not found",
        });
      }
    }
  }, [isSuccess, isError, isLoading, ProfileOfUserSearchedByCurrentUser]);

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
    trigger,
    handleAccountNumberChange,
    validateAccountNumber,
    handleAmountIn,
    handleRemarks,
    isAmountAboutToTransferUpToFiftyNaira,
    isOpen,
    onOpen,
    onClose,
  };
};

export default useTransferFund;

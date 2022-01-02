import randomatic from "randomatic";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { usePaystackPayment } from "react-paystack";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { postRequestToServer } from "../api/api";
import useStore from "../zustand";

const useFundAccount = () => {
  const history = useHistory();
  const { email, userId, user, userAmountToFund } = useStore((state) => state);
  const accountId = user !== "" && user.account._id;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isLoading, isError, isSuccess, data, error, mutate } = useMutation(
    (fundAccountDetails) => {
      return postRequestToServer("/transaction/verify", fundAccountDetails);
    }
  );
  /* THis enables the "amount" label to float if the lastname has been typed in*/
  const [isAmountTypedIn, setisAmountTypedIn] = useState(false);

  // Check if amount about to recharge is up to #50 naira
  const isAmountAboutToTransferUpToFiftyNaira = (value) => {
    if (Number(value) <= 49) {
      return "#50 naira is the Minimum amount to fund account";
    }
  };
  // Check if amount about to recharge is up to #50 naira

  //   Initialize paystack payment
  const initializePayment = usePaystackPayment({
    email,
    amount: userAmountToFund * 100,
    label: email,
    reference: randomatic("01as", 12),
    channels: ["card"],
    text: "Fund your account",
    metadata: {
      transactionType: "Wallet Fund",
      userId,
      narration: `Funded Wallet ${userAmountToFund}`,
      accountId,
    },
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
  });

  // Makes label float when user types
  const handleAmountIn = (amount) =>
    amount === "" || amount <= 0
      ? setisAmountTypedIn(false)
      : setisAmountTypedIn(true);

  //   Fund user account
  const FundAccount = (amount) => {
    // If funding account is successful, run this function
    
    const onSuccess = (reference) => {
      mutate(reference);
    };

    // implementation for  whatever you want to do when the Paystack dialog closed.
    const onClose = (reference) => {
      console.log("closed", reference);
    };

    if (amount) {
      initializePayment(onSuccess, onClose);
    }
  };
  //   Validates user payment
  useEffect(() => {
    if (!isLoading) {
      if (isSuccess) {
        const { data: transactionReference } = data;
        history.push(`/account/fund-success/${transactionReference.ref}`);
      }
    }
  }, [isLoading, isError, isSuccess, data, error]);

  return {
    isAmountTypedIn,
    handleAmountIn,
    register,
    handleSubmit,
    FundAccount,
    isAmountAboutToTransferUpToFiftyNaira,
    errors,
    isLoading,
  };
};

export default useFundAccount;

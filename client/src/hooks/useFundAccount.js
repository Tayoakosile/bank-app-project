import { useEffect, useState } from "react";
import randomatic from "randomatic";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { usePaystackPayment } from "react-paystack";
import useStore from "../zustand";
import { useMutation } from "react-query";
import { postRequestToServer } from "../api/api";

const useFundAccount = () => {
  const history = useHistory();
  const { email, userId, user, userAmountToFund } = useStore((state) => state);
  const accountId = user !== "" && user.account._id;
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm();

  const { isLoading, isError, isSuccess, data, error, mutate } = useMutation(
    (fundAccountDetails) => {
      return postRequestToServer("/transaction/verify", fundAccountDetails);
    }
  );
  /* THis enables the "amount" label to float if the lastname has been typed in*/
  const [isAmountTypedIn, setisAmountTypedIn] = useState(false);

  //   Initialize paystack payment
  const initializePayment = usePaystackPayment({
    email,
    amount: userAmountToFund * 100,
    label: email,
    reference: randomatic("01as", 12),
    channels: ["card"],
    text: "Fund your account",
    metadata: {
      transactionType: "credit",
      userId,
      narration: "Wallet funding",
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
      console.log(reference);
    };

    // implementation for  whatever you want to do when the Paystack dialog closed.
    const onClose = () => {
      console.log("closed");
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
        console.log(transactionReference, "reference");
        history.push(`/account/fund-success/${transactionReference.ref}`);
        console.log(isLoading, isError, isSuccess, data, "data here", error);
      }
    }
  }, [isLoading, isError, isSuccess, data, error]);

  return {
    isAmountTypedIn,
    handleAmountIn,
    register,
    handleSubmit,
    FundAccount,
  };
};

export default useFundAccount;

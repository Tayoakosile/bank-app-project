import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import useStore from "../zustand";
import { axios, postRequestToServer } from "../api/api";
import useAuth from "../auth/useAuth";

const useTransferFund = () => {
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

  const { register, getValues, handleSubmit, clearErrors } = useForm();
  const [userInput, setUserInput] = React.useState("");

  //   If user input the 8 digit account number, search for it in the database
  useEffect(() => {
    if (userInput.length >= 8) {
      mutate({ acctNumber: userInput, loggedInUserID: userId });
    }
  }, [userInput]);

  const submitTransfer = (data) => {
    console.log(data, getValues("amount"));
  };

  useEffect(() => {
    !isLoading
      ? console.log(
          ProfileOfUserSearchedByCurrentUser,
          error,
          isLoading,
          isError,
          isSuccess
        )
      : console.log("hello");
  }, [
    ProfileOfUserSearchedByCurrentUser,
    error,
    isLoading,
    isError,
    isSuccess,
  ]);
  return {
    register,
    getValues,
    handleSubmit,
    clearErrors,
    submitTransfer,
    userInput,
    setUserInput,
  };
};

export default useTransferFund;

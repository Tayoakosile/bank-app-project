import React from "react";
import useVerifyAccount from "../../hooks/useVerifyAccount";
import IsLoading from "../Loading/IsLoading";
import VerifyError from "./VerifyError";
import VerifySuccess from "./VerifySuccess";

const VerifyStatus = () => {
  const { userStatus, isError, isSuccess, isLoading } = useVerifyAccount();

  if (isLoading) {
    //   If user email is successfully registered then
    return <IsLoading />;
  }

  if (isSuccess) {
    //   If user email is successfully registered then
    return <VerifySuccess />;
  }
  //   else Show error
  return isError && <VerifyError />;
};

export default VerifyStatus;

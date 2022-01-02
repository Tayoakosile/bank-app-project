import React from "react";
import { Redirect } from "react-router";
import useAuth from "../auth/useAuth";
import IsLoading from "../pages/Loading/IsLoading";

const ProtectedComponent = ({ children }) => {
  const { isSuccess, isLoading, data, isError } = useAuth();
  const { authorizedData: result } = data !== undefined && data;
  // User's verified status /
  const { status: UserStatus, transaction_pin } = !isLoading && result;

  if (isLoading) {
    return <IsLoading />;
  }

  if (isSuccess) {
    return (
      <>
        {UserStatus === "active" ? (
          <>
            {!transaction_pin || transaction_pin === null ? (
              <Redirect to="/account/transaction-pin/set"></Redirect>
            ) : (
              children
            )}
          </>
        ) : (
          <Redirect to="/verifyaccount"></Redirect>
        )}
      </>
    );
  }

  if (isError) {
    return <Redirect to="/login"></Redirect>;
  }

  return <>tayo</>;
};

export default ProtectedComponent;

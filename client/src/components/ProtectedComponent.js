import React from "react";
import { Redirect } from "react-router";
import useAuth from "../auth/useAuth";

const ProtectedComponent = ({ children }) => {
  const { isSuccess, isLoading, data, isError } = useAuth();
  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <Redirect to="/login"></Redirect>;
  }

  if (isSuccess) {
    const { authorizedData: result } = data;
    // User's verified status /
    const { status: UserStatus, transaction_pin } = result;

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
};

export default ProtectedComponent;

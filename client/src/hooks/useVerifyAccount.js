import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { postRequestToServer } from "../api/api";
import useStore from "../zustand/index";

const useVerifyAccount = () => {
  // send post request with verification code

  const [userStatus, setUserStatus] = useState("");

  // get users details from url parameter
  const { _id, secretCode } = useParams();
  // get users details from url parameter

  // set User email address into zustandstate
  const email = useStore((state) => state.email);

  const { data, isError, isSuccess, error, isLoading } = useQuery(
    "verificationcode",
    () =>
      postRequestToServer(`/verification/verify-account/${_id}/${secretCode}`)
  );

  useEffect(() => {
    if (isSuccess) {
      data && setUserStatus(data.email);
    }
    console.log("errors here", data, isError, isSuccess, error, isLoading);
  }, [data, isError, isSuccess, error, isLoading]);

  return { email, userStatus, data, isError, isSuccess, error, isLoading };
};

export default useVerifyAccount;

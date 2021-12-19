import { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { postRequestToServer } from "../api/api";

const useFundAccountSuccess = () => {
  const { ref } = useParams();
  console.log(ref);
  //   Send the ref gotten fron to backend
  const {
    isError,
    isSuccess,
    data: verifiedTransaction,
  } = useQuery("verify-ref", () => {
    return postRequestToServer("/transaction/verifyRef", { ref });
  });

  useEffect(() => {
    if (isSuccess) {
      const { data } = verifiedTransaction;
      console.log(data.data);
    }
  }, [isError, isSuccess, verifiedTransaction]);
  return { ref };
};

export default useFundAccountSuccess;

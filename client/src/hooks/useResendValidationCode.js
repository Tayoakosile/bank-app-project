import { useToast } from "@chakra-ui/toast";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { postRequestToServer } from "../api/api";

const useResendValidationCode = () => {
  const history = useHistory();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "all" });
  const { mutate, isLoading, isError, error, data, isSuccess } = useMutation(
    (data) => {
      const resetPassword = postRequestToServer("/reset-password", data);
      return resetPassword;
    }
  );

  const RequestPasswordRequest = (email) => {
    mutate(email);
  };

  useEffect(() => {
    console.log(isLoading, isError, error, data, isSuccess);
    /* If user email is and valid, then redirect to reset link code */
    if (isSuccess) {
      history.push("/reset-confirm");
    }
    /* Else show error */
    if (isError) {
      toast({
        duration: 4000,
        description: `${
          error.response
            ? "This email address is not registered, please sign up to continue"
            : "A network error occurred, please reload the browser "
        }`,
        position: "bottom",
        status: "error",
        isClosable: true,
      });
    }
  }, [isLoading, isError, error, data, isSuccess]);

  return {
    handleSubmit,
    register,
    errors,
    isValid,
    RequestPasswordRequest,
    isLoading,
    history,
  };
};

export default useResendValidationCode;

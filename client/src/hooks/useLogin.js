import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useMutation } from "react-query";
import { useHistory } from "react-router";
import { reactLocalStorage } from "reactjs-localstorage";
import { postRequestToServer } from "../api/api";

const useLogin = () => {
  const history = useHistory();
  // const toast = useToast();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm();

  // Sends users details to the server
  const { mutate, isLoading, isError, isSuccess, data, error } = useMutation(
    (formDetails) => {
      const form = postRequestToServer("/login", formDetails);
      return form;
    }
  );
  // Sends users details to the server

  // Initiate sendng of users details to the server
  const onSubmit = (data) => {
    mutate(data);
  };

  useEffect(() => {
    console.log(isLoading, isError, isSuccess, data);
    /* If there was an error returned from the form */
    if (isSuccess) {
      const { data: usersDetails } = data;
      reactLocalStorage.set("userToken", usersDetails.token);
      toast.success("Login Successfull", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => history.push("dashboard"),
      });
    }

    if (isError) {
      const { data } = error.response;
      data.err === "IncorrectEmailError" &&
        setError("email", {
          type: "required",
          message: `Email not found, Please Sign Up to continue`,
        });
      data.err === "IncorrectPasswordError" &&
        setError("password", {
          type: "required",
          message: `Oops, Password is incorrect`,
        });
      console.log(data);
    }
  }, [isLoading, isError, isSuccess, data, error]);

  return {
    register,
    isValid,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    ToastContainer,
  };
};

export default useLogin;

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useMutation } from "react-query";
import { postRequestToServer } from "../api/api";
import useStore from "../zustand";

const useSetting = () => {
  const { user, userId } = useStore((state) => state);
  const { mutate, data, isLoading, isError, isSuccess } = useMutation(
    (settings) => {
      return postRequestToServer(`/account/setting/${userId}`, settings);
    }
  );
  const [defaultUser, setDefaultUser] = useState({
    firstname: "",
    lastname: "",
  });
  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile Successfully Uploaded", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    if (isError) {
      toast.error("Opps,Please try again", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    console.log(data, isLoading, isError);
  }, [data, isLoading, isError]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({});
  console.log(errors);

  useEffect(() => {
    if (user) {
      setValue("firstname", user.firstname);
      setValue("lastname", user.lastname);

      //   reset(user);
    }
  }, [user]);

  const SubmitChanges = (setting) => {
    console.log("setting", "data", errors, setting);
    if (setting) {
      mutate({ setting });
    }
  };

  return {
    register,
    SubmitChanges,
    handleSubmit,
    ToastContainer,
    user,
    errors,
    isLoading,
  };
};

export default useSetting;

import { useToast } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { isUserEmailUnique, postRequestToServer } from "../api/api";
import useStore from "../zustand/index";

const useValidateForm = () => {
  /* Labels ss*/
  const [isFirstNameTypedIn, setIsFirstNameTypedIn] = useState(false);
  const [isLastNameTypedIn, setIsLastNameTypedIn] = useState(false);
  const [isUserNameTypedIn, setIsUserNameTypedIn] = useState(false);
  const [isEmailAddressTypedIn, setIsEmailTypedIn] = useState(false);
  const [isPasswordTypedIn, setIsPasswordTypedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  /* Toggles passwords visibility */
  const handleShowPassword = () => setShowPassword(!showPassword);
  /* Toggles password visibility */

  /* Make label stay on top if user has inputed a value */

  
  /* THis enables the "firstname" label to float if the firstname has been typed in*/
  const handleFirstNameChange = (firstname) =>
    firstname == ""
      ? setIsFirstNameTypedIn(false)
      : setIsFirstNameTypedIn(true);

  /* THis enables the "lastname" label to float if the lastname has been typed in*/
  const handleLastNameChange = (lastname) =>
    lastname == "" ? setIsLastNameTypedIn(false) : setIsLastNameTypedIn(true);

  /* THis enables the "username" label to float if the username has been typed in*/
  const handleUserNameChange = (text) =>
    text == "" ? setIsUserNameTypedIn(false) : setIsUserNameTypedIn(true);

  /* THis enables the "email" label to float if the email has been typed in*/
  const handleEmailChange = (email) =>
    email == "" ? setIsEmailTypedIn(false) : setIsEmailTypedIn(true);

  /* THis enables the "password" label to float if the password has been typed in*/
  const handlePasswordChange = (password) =>
    password == "" ? setIsPasswordTypedIn(false) : setIsPasswordTypedIn(true);

  const toast = useToast();
  const history = useHistory();

  //   Global State Manager

  const { setData } = useStore((state) => state);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    reset,
    isSubmitting,
    formState: { errors, isValid },
  } = useForm({ mode: "all", shouldFocusError: true });

  /* Checks if user is already registered in database, throws error if registered */
  const handleValidateEmail = useCallback(
    (verify, mode) => {
      isUserEmailUnique("/validate", mode, verify)
        .then((res) => {
          return true;
        })
        .catch((err) => {
          setError(`${mode}`, {
            type: "required",
            message: `This ${mode} is already registered, Try using a different ${mode} or login to our account`,
          });
          return false;
        });
    },
    [setError]
  );

  // Submit form
  const onSubmit = (form) => {
    if (form) {
      postRequestToServer("/", form)
        .then((res) => {
          toast({
            title: "Account Successfully created.",
            position: "top-right",
            description: "Your account has been successfully created",
            status: "success",
            duration: 3000,
            isClosable: true,
            onCloseComplete: () => {
              setData(form.email);
              history.push("/verifyaccount");
            },
          });
          document.getElementById("myForm").reset();
          reset({ form });
          return res;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    clearErrors,
    setValue,
    showPassword,
    handleValidateEmail,
    handleFirstNameChange,
    handleLastNameChange,
    handleUserNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleShowPassword,
    isFirstNameTypedIn,
    isSubmitting,
    isLastNameTypedIn,
    isEmailAddressTypedIn,
    isUserNameTypedIn,
    isValid,
    isPasswordTypedIn,
  };
};

export default useValidateForm;

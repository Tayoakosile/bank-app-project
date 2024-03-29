import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { GoMail } from "react-icons/go";
import { Link as Navigator, Redirect } from "react-router-dom";
import FulLogo from "../../assets/img/logo/FulLogo";
import useAuth from "../../auth/useAuth";
import MetaTags from "../../components/MetaTags";
import useLogin from "../../hooks/useLogin";
import useValidateForm from "../../hooks/useValidateForm";
import useStore from "../../zustand";

export default function LoginIntoUserAccount() {
  const {
    handleSubmit,
    register,
    onSubmit,
    errors,
    isValid,
    isLoading,
    ToastContainer,
  } = useLogin();
  const { setData } = useStore((state) => state);
  const {
    isPasswordTypedIn,
    isEmailAddressTypedIn,
    showPassword,
    handleEmailChange,
    handlePasswordChange,
    handleShowPassword,
  } = useValidateForm();

  const { isSuccess } = useAuth();
  //   If user is successfully logged in and still returns to login page return to
  if (isSuccess) {
    return <Redirect to="/dashboard"></Redirect>;
  }

  return (
    <>
    <MetaTags title ='Login to your MoneyDais Account'/>
      <VStack minH={"100vh"} w="full" spacing="3">
        <Box w="full">
          <Center className="signup" h="48">
            <FulLogo w="12" h="12" fs="3xl" />
          </Center>
        </Box>

        <Stack w="full" spacing={0} pt={7} px="7">
          <Box>
            <Heading
              fontSize={"4xl"}
              color="brand.800"
              as="h2"
              fontWeight="bolder"
              fontSize={"2xl"}
              pb={"4"}
              w="90%"
            >
              Get right back in
            </Heading>
          </Box>
          {/* Login form here */}

          <Box w="full">
            <Stack
              w="full"
              spacing={7}
              as="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl
                className="moneydais-form"
                id="email"
                h={{ base: "16" }}
                isInvalid={errors.email}
              >
                <FormLabel
                  name="email"
                  color={errors.email ? "#a12000" : "brand.600"}
                  fontSize="sm"
                  className={isEmailAddressTypedIn ? "Active" : ""}
                  opacity={errors.email ? "1" : ".80"}
                  fontWeight={errors.email ? "bold" : "bold"}
                  bg={errors.email ? "" : "white"}
                  px={errors.email ? "" : "1"}
                  zIndex={errors.email ? "" : "4"}
                >
                  Email address
                </FormLabel>
                <InputGroup>
                  <Input
                    variant="flushed"
                    type="email"
                    name="email"
                    {...register("email", {
                      required: "A valid email is required",
                      pattern: {
                        value:
                          /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/,
                        message:
                          "A valid email is required, ie youremail@gmail.com",
                      },
                      // validate: {
                      //  email: email => handleValidateEmail(email, 'email'),
                      // },
                    })}
                    onChange={(e) => {
                      handleEmailChange(e.target.value);
                      handleEmailChange(e.target.value);
                      setData(e.target.value);
                    }}
                  />
                  <InputRightElement
                    children={
                      errors.email ? (
                        <FormErrorIcon color="red.700" />
                      ) : (
                        <GoMail width="1222px" color="brand.200" />
                      )
                    }
                  />
                </InputGroup>

                <FormErrorMessage
                  className="moneydais_error"
                  fontWeight="bold"
                  color="rgba(221, 44, 0, 0.87)"
                >
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                className="moneydais-form"
                id="password"
                h={{ base: "16" }}
                isInvalid={errors.password}
              >
                <FormLabel
                  name="password"
                  color={errors.password ? "#a12000" : "brand.600"}
                  fontSize="sm"
                  className={isPasswordTypedIn ? "Active" : ""}
                  opacity={errors.password ? "1" : ".80"}
                  fontWeight={errors.password ? "bold" : "bold"}
                  bg={errors.password ? "" : "white"}
                  px={errors.password ? "" : "1"}
                  zIndex={errors.password ? "6" : "4"}
                >
                  Password
                </FormLabel>

                <InputGroup>
                  <Input
                    variant="flushed"
                    type={showPassword ? "password" : "text"}
                    name="password"
                    {...register("password", {
                      required: "A valid password is required",
                    })}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                  />
                  <InputRightElement
                    onClick={handleShowPassword}
                    children={
                      errors.password ? (
                        <FormErrorIcon color="red.700" />
                      ) : showPassword ? (
                        <AiOutlineEye color="brand.200" />
                      ) : (
                        <AiOutlineEyeInvisible color="brand.200" />
                      )
                    }
                  />
                </InputGroup>

                <FormErrorMessage
                  className="moneydais_error"
                  fontWeight="bold"
                  color="rgba(221, 44, 0, 0.87)"
                >
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>

              <Stack
                spacing={6}
                w="100% !important"
                mb="4"
                mt=".8rem !important"
              >
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"flex-end"}
                  justify={"space-between"}
                >
                  <Link
                    variant="link"
                    color={"brand.800"}
                    fontWeight="semibold"
                    fontSize="sm"
                    as={Navigator}
                    to="/reset-password"
                    _focus={{ border: "0px" }}
                  >
                    Forgot password?
                  </Link>
                </Stack>

                <Button
                  isLoading={isLoading}
                  type="submit"
                  bg="brand.500"
                  loadingText="Signing in"
                  textTransform="capitalize"
                  fontSize="sm"
                  w="85%"
                  mx="auto !iMPORTANT"
                  h="14"
                  variant={"solid"}
                >
                  Sign in
                </Button>

                <Center>
                  <Text fontSize="sm" color="gray.500" fontWeight="normal">
                    New User?
                    <Link
                      variant="link"
                      pl="1"
                      as={Navigator}
                      to="/signup"
                      fontWeight="bold"
                      color="brand.500"
                    >
                      Create Account
                    </Link>
                  </Text>
                </Center>
              </Stack>
            </Stack>
          </Box>

          {/* Login form here */}
        </Stack>
        <Box as={ToastContainer} w="90%" mx="auto" mt="6" />
      </VStack>
    </>
  );
}

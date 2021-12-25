import {
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Animated } from "react-animated-css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { GoMail } from "react-icons/go";
import { Link as NavLink } from "react-router-dom";
import FulLogo from "../../assets/img/logo/FulLogo";
import Header from "../../components/Heading";
import useValidateForm from "../../hooks/useValidateForm";
export default function SplitScreen() {
  const {
    register,
    handleSubmit,
    onSubmit,
    showPassword,
    errors,
    isFirstNameTypedIn,
    isLastNameTypedIn,
    isUserNameTypedIn,
    isEmailAddressTypedIn,
    isPasswordTypedIn,
    handleValidateEmail,
    handleFirstNameChange,
    handleLastNameChange,
    handleUserNameChange,
    handlePasswordChange,
    handleEmailChange,
    handleShowPassword,
    isLoading,
    isSuccess,
    isError,
  } = useValidateForm();

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex flex={1}>
        <Center className="signup" h="48">
          <FulLogo w="10" h="10" fs="2xl" />
        </Center>
      </Flex>

      <Flex
        p={7}
        flex={1}
        align={"center"}
        justify={"center"}
        alignItems={{ base: null, md: null, lg: "flex-start" }}
      >
        <Stack
          spacing={7}
          w={"full"}
          maxW={"md"}
          as="form"
          id="myForm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Header
            color="brand.800"
            as="h2"
            fontWeight="bolder"
            fontSize={"2xl"}
            text="Let's get your account up and running."
            pb={"4"}
            w="90%"
          />
          {/* Full Name */}
          <Stack
            direction={{ base: "row", md: "column", lg: "row" }}
            spacing="7"
            w="full"
          >
            {/* Users Firstname here  */}
            <FormControl
              className="moneydais-form"
              id="firstname"
              isInvalid={errors.firstname}
              position="relative"
            >
              <FormLabel
                htmlFor="firstname"
                letterSpacing=".7px"
                transitionDuration="0.3s"
                transition="ease-in"
                transitionProperty="color, font-weight"
                fontSize="sm"
                bg={errors.firstname ? "" : "white"}
                color={errors.firstname ? "#a12000" : "brand.600"}
                className={isFirstNameTypedIn && "Active"}
                opacity={errors.firstname ? "1" : ".80"}
                fontWeight={errors.firstname ? "bold" : "bold"}
              >
                First Name
              </FormLabel>
              <InputGroup>
                <Input
                  type="text"
                  color="brand.600"
                  id="firstname"
                  variant="flushed"
                  name="firstname"
                  {...register("firstname", {
                    required: "First Name is Required",
                    minLength: {
                      value: 4,
                      message: "First Name must be at least 5 characters long",
                    },
                  })}
                  onChange={(e) => handleFirstNameChange(e.target.value)}
                />
                <InputRightElement
                  children={
                    errors.firstname ? (
                      <FormErrorIcon color="red.700" />
                    ) : (
                      <BsPerson color="brand.200" />
                    )
                  }
                />
              </InputGroup>

              <FormErrorMessage
                className="monsecure_error"
                fontWeight="bold"
                color="rgba(221, 44, 0, 0.87)"
              >
                {errors.firstname && errors.firstname.message}
              </FormErrorMessage>
            </FormControl>

            {/* Users surname here  */}
            <FormControl
              className="moneydais-form"
              id="lastname"
              isInvalid={errors.lastname}
            >
              {/* Last name label */}
              <FormLabel
                htmlFor="lastname"
                fontSize="sm"
                className={isLastNameTypedIn ? "Active" : ""}
                color={errors.lastname ? "rgba(221, 44, 0, 0.87)" : "brand.600"}
                opacity={errors.lastname ? "1" : ".80"}
                fontWeight={errors.lastname ? "semibold" : "semibold"}
              >
                Surname
              </FormLabel>

              <InputGroup>
                <Input
                  type="text"
                  id="lastname"
                  variant="flushed"
                  name="lastname"
                  {...register("lastname", {
                    required: "Last Name is Required",
                    minLength: {
                      value: 4,
                      message: "Last Name must be at least 5 characters long",
                    },
                  })}
                  onChange={(e) => handleLastNameChange(e.target.value)}
                />
                <InputRightElement
                  children={
                    errors.lastname ? (
                      <FormErrorIcon color="red.700" />
                    ) : (
                      <BsPerson color="brand.200" />
                    )
                  }
                />
              </InputGroup>

              {/* Error message here */}
              <FormErrorMessage className="monsecure_error">
                <Animated
                  animationIn="fadeInDown"
                  animationOut="bounceOutUp"
                  animationInDuration={400}
                  animationOutDuration={400}
                  isVisible={true}
                >
                  {errors.lastname && errors.lastname.message}
                </Animated>
              </FormErrorMessage>
            </FormControl>
          </Stack>
          {/* User Name */}
          <FormControl
            id="username"
            className="moneydais-form"
            isInvalid={errors.username}
          >
            <FormLabel
              htmlFor="username"
              fontSize="sm"
              color={errors.username ? "rgba(221, 44, 0, 0.87)" : "brand.600"}
              bg={errors.firstname ? "" : "white"}
              px={errors.firstname ? "" : "1"}
              zIndex={errors.firstname ? "" : "4"}
              className={isUserNameTypedIn ? "Active" : ""}
              opacity={errors.username ? "1" : ".80"}
              fontWeight={errors.username ? "semibold" : "semibold"}
            >
              Username
            </FormLabel>
            <InputGroup>
              <Input
                type="text"
                id="username"
                variant="flushed"
                name="username"
                {...register("username", {
                  required: "User  Name is Required",
                  minLength: {
                    value: 4,
                    message: "User Name must be at least 5 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: "User Name too Long, Try another",
                  },
                  validate: {
                    username: (username) =>
                      handleValidateEmail(username, "username"),
                  },
                })}
                onChange={(e) => handleUserNameChange(e.target.value)}
              />
              <InputRightElement
                children={
                  errors.username ? (
                    <FormErrorIcon color="red.700" />
                  ) : (
                    <BsPerson color="brand.200" />
                  )
                }
              />
            </InputGroup>
            {/* User error message */}
            <FormErrorMessage className="monsecure_error">
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>

          {/* Email Address */}
          <FormControl
            className="moneydais-form"
            id="email"
            isInvalid={errors.email}
          >
            <FormLabel
              htmlFor="email"
              fontSize="sm"
              color={errors.email ? "#a12000" : "brand.600"}
              className={isEmailAddressTypedIn && "Active"}
              opacity={errors.email ? "1" : ".80"}
              fontWeight={errors.email ? "bold" : "bold"}
            >
              Email address
            </FormLabel>

            <InputGroup>
              <Input
                type="email"
                id="email"
                variant="flushed"
                name="email"
                {...register("email", {
                  required: "Your Email Address is Required",
                  pattern: {
                    value:
                      /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/,
                    message: "Invalid Email Address, Please try again",
                  },
                  validate: {
                    email: (email) => handleValidateEmail(email, "email"),
                  },
                })}
                //  onChange={handleValidateEmail}
                onChange={(e) => handleEmailChange(e.target.value)}
              />
              <InputRightElement
                children={
                  errors.email ? (
                    <FormErrorIcon color="red.700" />
                  ) : (
                    <GoMail color="brand.200" />
                  )
                }
              />
            </InputGroup>

            <FormErrorMessage
              className="monsecure_error"
              className="monsecure_error"
            >
              {errors.email && errors.email.message}
            </FormErrorMessage>
            {errors.email && errors.email.type === "validate" && (
              <FormErrorMessage className="monsecure_error">
                This Email Already Exist
              </FormErrorMessage>
            )}
          </FormControl>

          {/* Password */}
          <FormControl
            className="moneydais-form"
            id="password"
            isInvalid={errors.password}
          >
            <FormLabel
              htmlFor="password"
              fontSize="sm"
              color={errors.password ? "#a12000" : "brand.600"}
              className={isPasswordTypedIn ? "Active" : ""}
              opacity={errors.password ? "1" : ".80"}
              fontWeight={errors.password ? "bold" : "bold"}
              bg={errors.password ? "transparent" : "white"}
              px={errors.password ? "transparent" : "1"}
              zIndex={errors.password ? "transparent" : "4"}
            >
              Password
            </FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "password" : "text"}
                name="password"
                variant="flushed"
                id="password"
                {...register("password", {
                  required: "A valid password is required",
                  minLength: {
                    value: 6,
                    message:
                      "Short Password are easy to guess, Try one with at least 6 characters ",
                  },
                  pattern: {
                    value: /\d/,
                    message: "Password must include at least one number",
                  },
                })}
                id="password"
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

            <FormErrorMessage className="monsecure_error">
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <VStack mt={6} spacing={8}>
            <Button
              bg="rgb(17, 79, 166)"
              loadingText="Creating your account"
              isLoading={isLoading}
              type="submit"
              textTransform="capitalize"
              fontSize="sm"
              size="lg"
              w="95%"
              h="14"
              variant={"solid"}
            >
              Create Account
            </Button>

            <Text fontSize="sm" color="gray.500" fontWeight="normal">
              Already Registered?
              <Link
                pl="1"
                as={NavLink}
                variant="link"
                to="/login"
                fontWeight="semibold"
                color="brand.500"
              >
                Sign in
              </Link>
            </Text>
          </VStack>
        </Stack>
      </Flex>
    </Stack>
  );
}

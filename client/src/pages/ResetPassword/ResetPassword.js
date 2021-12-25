import {
    Box, Button, Flex,
    FormControl, FormErrorMessage, Heading,
    Input, Stack
} from "@chakra-ui/react";
import React, { useState } from "react";
import Back from "../../components/Back";
import useResetPassword from "../../hooks/useResendValidationCode";
import useStore from "../../zustand";


export default function SplitScreen() {
  const {
    register,
    errors,
    handleSubmit,
    RequestPasswordRequest,
    isValid,
    isLoading,
  } = useResetPassword();
  /* Gets user email from login page and sets it */
  const { email } = useStore((state) => state);
  const [isUserEmail, setUserEmail] = useState(email);
  console.log("email", email);
  /* Gets user email from login page and sets it */

  return (
    <Stack
      minH={"100vh"}
      bg="brand.500"
      px={7}
      direction={{ base: "column", md: "row" }}
    >
      {/* Go back */}
      <Box pt="4" ml="-2">
        <Back />
      </Box>
      {/* Go back */}
      <Flex pt={12} align={"center"} justify={"center"}>
        <Stack
          as="form"
          id="resetpasswordform"
          onSubmit={handleSubmit(RequestPasswordRequest)}
          spacing={8}
          w={"full"}
          maxW={"md"}
        >
          <Heading color="white" fontSize={"2xl"} pb="4">
            Lets help reset your password
          </Heading>
          <FormControl
            className="moneydais-form"
            id="email"
            h="20"
            isInvalid={errors.email}
          >
            <Input
              fontWeight="normal !important"
              type="email"
              variant="flushed"
              value={isUserEmail}
              _placeholder={{ color: "white" }}
              placeholder="Email address"
              {...register("email", {
                required: "Your Email Address is Required",
                pattern: {
                  value:
                    /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/,
                  message: "Invalid Email Address, Please try again",
                },
              })}
              onChange={(e) => setUserEmail(e.target.value)}
              color="white !important"
            />
            <FormErrorMessage
              transition="all 0.3s ease-in"
              className="moneydais_error"
              fontWeight="normal"
              p="3"
              bg="rgba(221, 44, 0, 0.87)"
              color="white"
            >
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <Stack spacing={6}>
            <Button
              type="submit"
              bg={"white"}
              isLoading={isLoading}
              loadingText="Sending Reset Link"
              size="lg"
              fontSize="sm"
              textTransform="uppercase"
              w="98%"
              mx="auto"
              h="16"
              color={"brand.500"}
              variant={"solid"}
              _active={{
                background: "brand.200",
                color: "brand.700",
                
              }}
              _hover={{
                background: "brand.200",
              }}
            >
              Get reset link
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
}

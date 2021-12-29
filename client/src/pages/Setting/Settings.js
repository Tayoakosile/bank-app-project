import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Heading, HStack, VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import React from "react";
import Back from "../../components/Back";
import ProctectedComponent from "../../components/ProtectedComponent";
import useSetting from "../../hooks/useSetting";
const Settings = () => {
  const {
    register,
    handleSubmit,
    SubmitChanges,
    errors,
    ToastContainer,
    isLoading,
  } = useSetting();

  return (
    <ProctectedComponent>
      <Box pt="4" pl="2">
        <HStack mb="16">
          <Back />
          <Heading size="md">Settings</Heading>
        </HStack>
        <VStack
          as="form"
          onSubmit={handleSubmit(SubmitChanges)}
          mx="4"
          spacing="12"
          alignItems="flex-start"
        >
          {/* Lastname  */}
          <FormControl
            className="moneydais-form"
            id="firstname"
            isInvalid={errors.firstname}
            h={{ base: "16" }}
          >
            <FormLabel
              name="firstname"
              color={errors.firstname ? "#a12000" : "brand.600"}
              fontSize="md"
              className="Active"
              opacity={errors.firstname ? "1" : ".80"}
              fontWeight={errors.firstname ? "bold" : "bold"}
              bg={errors.firstname ? "" : "white"}
              px={errors.firstname ? "" : "1"}
              zIndex={errors.firstname ? "6" : "4"}
            >
              First name
            </FormLabel>

            <Input
              variant="flushed"
              name="firstname"
              {...register("firstname", {
                required: "Please Type in your name",
                minLength: {
                  value: 4,
                  message: "Your name mst be more than four digits",
                },
              })}
            />

            <FormErrorMessage
              className="moneydais_error"
              fontWeight="bold"
              color="rgba(221, 44, 0, 0.87)"
            >
              {errors.firstname && errors.firstname.message}
            </FormErrorMessage>
          </FormControl>

          {/* Lastname */}
          <FormControl
            className="moneydais-form"
            id="lastname"
            h={{ base: "16" }}
            isInvalid={errors.lastname}
          >
            <FormLabel
              name="lastname"
              className="Active"
              color={errors.lastname ? "#a12000" : "brand.600"}
              fontSize="md"
              className="Active"
              opacity={errors.lastname ? "1" : ".80"}
              fontWeight={errors.lastname ? "bold" : "bold"}
              bg={errors.lastname ? "" : "white"}
              px={errors.lastname ? "" : "1"}
              zIndex={errors.lastname ? "6" : "4"}
            >
              Last name
            </FormLabel>

            <Input
              variant="flushed"
              name="lastname"
              {...register("lastname", {
                required: "Please type in your name",
                minLength: {
                  value: 4,
                  message: "Your name must be more 5",
                },
              })}
            />

            <FormErrorMessage
              className="moneydais_error"
              fontWeight="bold"
              color="rgba(221, 44, 0, 0.87)"
            >
              {errors.lastname && errors.lastname.message}
            </FormErrorMessage>
          </FormControl>

          {/*Save changes button */}

          <Box w="full" mx="auto" left="4" position="fixed" bottom="24">
            <Button
              role="submit"
              type="submit"
              bg="brand.500"
              isLoading={isLoading}
              textTransform="uppercase"
              fontSize="lg"
              w="90%"
              mx="auto"
              h="16"
              variant={"solid"}
            >
              Update Profile
            </Button>
          </Box>
        </VStack>
        <Box h="20" w="full" bg="gray.100"></Box>
      </Box>
      <Box as={ToastContainer} w="90%" mx="auto" />
    </ProctectedComponent>
  );
};

export default Settings;

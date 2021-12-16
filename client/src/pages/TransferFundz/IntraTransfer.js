import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/input";
import { HStack, Text, VStack } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import React from "react";
import Back from "../../components/Back";
import ProtectedComponent from "../../components/ProtectedComponent";
import useTransferFund from "../../hooks/useTransferFund";

const IntraTransfer = () => {
  const {
    register,
    handleSubmit,
    submitTransfer,
    userInput,
    setUserInput,
    getValues,
    numberWithCommas,
    userToCreditDetails,
    isSuccess,
    isLoading,
    isError,
    errors,
    isValid,
    isAccountNumber,
    isAmountTypedIn,
    isRemarksTypedIn,
    handleAccountNumberChange,
    handleAmountIn,
    handleRemarks,
    isAmountAboutToTransferUpToFiftyNaira,
  } = useTransferFund();

  // user searched details
  //  const { profileImg, firstname, lastname } = userToCreditDetails;
  // user searched details

  return (
    <ProtectedComponent>
      <VStack as="section" spacing="12" p="6" pl="3" alignItems="flex-start">
        <HStack spacing="4">
          <Back noBackground={false} />
          <Text fontSize="lg" fontWeight="bold" color="brand.800">
            To Monsecure
          </Text>
        </HStack>

        {/* Transfer Form Here */}
        <VStack
          as="form"
          onSubmit={handleSubmit(submitTransfer)}
          pl="3"
          w="full"
          spacing="10"
        >
          <FormControl
            isInvalid={errors.accountNumber}
            w="full"
            className="monsecure-form monsecure-transfer"
          >
            <FormLabel
              htmlFor="accountNumber"
              transitionDuration="0.3s"
              transition="ease-in"
              color={errors.accountNumber ? "red.500" : "initial"}
              whiteSpace="nowrap"
              transitionProperty="color, font-weight"
              className={isAccountNumber && "Active"}
            >
              Account Number
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                children="KW"
                color={errors.accountNumber ? "red.200" : "brand.200"}
                fontWeight="bold"
                pointerEvents="none"
              />

              <Input
                type="number"
                {...register(
                  "accountNumber",
                  {
                    required: "Please type in your account number",
                    minLength: {
                      value: 8,
                      message: "Account number must be more than 8 digits",
                    },
                  },
                  { message: "type in your account num" }
                )}
                onChange={(e) => {
                  setUserInput(e.target.value);
                  handleAccountNumberChange(e.target.value);
                }}
                onPaste={(e) => {
                  setUserInput(e.target.value);
                }}
                onPasteCapture={(e) => {
                  setUserInput(e.target.value);
                }}
                variant="flushed"
                fontSize="4!important"
              />
            </InputGroup>
            <FormErrorMessage
              className="monsecure_error"
              fontWeight="bold"
              color="#dd2c00de"
            >
              {errors.accountNumber && errors.accountNumber.message}
            </FormErrorMessage>
          </FormControl>
          {/* SHows owner of the account */}
          <FormControl w="full" className="monsecure-form monsecure-disabled">
            <FormLabel
              fontSize="md"
              htmlFor="accountNumber"
              color={isError ? "red.600" : "brand.800"}
              zIndex="4"
              transitionDuration="0.3s"
              transition="ease-in"
              whiteSpace="nowrap"
              fontWeight="bold"
              transitionProperty="color, font-weight"
            >
              {isLoading && "loading"}
              {isSuccess &&
                ` ${userToCreditDetails.firstname} ${userToCreditDetails.lastname}`}{" "}
              {isError && ` ${userToCreditDetails.firstname} `}{" "}
            </FormLabel>

            <InputGroup size="lg" border={isError && "1px red"}>
              <InputLeftElement
                pointerEvents="none"
                children={
                  <Avatar
                    size="sm"
                    bg="brand.50"
                    name={
                      !isLoading
                        ? isSuccess &&
                          `${userToCreditDetails.firstname} ${userToCreditDetails.lastname}`
                        : `${userToCreditDetails.firstname} ${userToCreditDetails.lastname}`
                    }
                    color="brand.500"
                    fontWeight="bold"
                  />
                }
              />
              <Input
                type="number"
                size="lg"
                variant="flushed"
                fontSize="4!important"
                isDisabled={true}
                bg="gray.50"
              />
            </InputGroup>
          </FormControl>

          {/* User input amount about to be sent to user */}

          <FormControl
            w="full"
            className="monsecure-form"
            isInvalid={errors.amount}
          >
            <FormLabel
              htmlFor="accountNumber"
              transitionDuration="0.3s"
              transition="ease-in"
              whiteSpace="nowrap"
              className={isAmountTypedIn && "Active"}
              transitionProperty="color, font-weight"
              color={errors.amount ? "#dd2c00de" : "initial"}
            >
              Amount
            </FormLabel>
            <InputGroup colorScheme="brand" size="sm">
              <Input
                type="number"
                variant="flushed"
                fontSize="4!important"
                {...register("amount", {
                  required: "Amount required",
                  valueAsNumber: true,
                  validate: (value) =>
                    isAmountAboutToTransferUpToFiftyNaira(value),
                })}
                onChange={(e) => handleAmountIn(e.target.value)}
              />
              <InputRightElement
                color={errors.amount ? "#dd2c00de" : "initial"}
                children="N"
              />
            </InputGroup>
            <FormErrorMessage
              className="monsecure_error"
              fontWeight="bold"
              color="#dd2c00de"
            >
              {errors.amount && errors.amount.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl w="full" className="monsecure-form monsecure-remarks">
            <FormLabel
              htmlFor="accountNumber"
              transitionDuration="0.3s"
              transition="ease-in"
              className={isRemarksTypedIn && "Active"}
              whiteSpace="nowrap"
              transitionProperty="color, font-weight"
            >
              What is it for?{" "}
              <Text as="span" color="brand.200">
                {" "}
                (Optional)
              </Text>
            </FormLabel>

            <Textarea
              type="text"
              mt="2"
              size="sm"
              variant="flushed"
              colorScheme="brand"
              fontSize="4!important"
              {...register("remarks")}
              onChange={(e) => handleRemarks(e.target.value)}
            />
          </FormControl>

          {/* Submit  button */}
          <VStack pt={12} w="full">
            <Button
              bg="rgb(17, 79, 166)"
              loadingText="Creating your account"
              isDisabled={!isValid}
              // isLoading={isSubmitting}
              type="submit"
              // isDisabled={!isValid}
              textTransform="capitalize"
              fontSize="sm"
              size="lg"
              w="95%"
              h="14"
              variant={"solid"}
            >
              Continue
            </Button>
          </VStack>
        </VStack>
        {/* FOrm Here */}
      </VStack>
    </ProtectedComponent>
  );
};

export default IntraTransfer;

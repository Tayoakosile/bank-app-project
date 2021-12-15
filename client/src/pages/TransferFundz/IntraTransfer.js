import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { HStack, Text, VStack } from "@chakra-ui/layout";
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
  } = useTransferFund();
  return (
    <ProtectedComponent>
      <VStack as="section" spacing="12" p="6" pl="3" alignItems="flex-start">
        <HStack spacing="4">
          <Back noBackground={false} />
          <Text fontSize="xl" fontWeight="bold" color="brand.800">
            To Monsecure
          </Text>
        </HStack>

        {/* Transfer Form Here */}
        <VStack
          as="form"
          onSubmit={handleSubmit(submitTransfer)}
          pl="3"
          w="full"
          spacing="12"
        >
          <FormControl w="full" className="monsecure-form monsecure-transfer">
            <FormLabel
              htmlFor="accountNumber"
              transitionDuration="0.3s"
              transition="ease-in"
              whiteSpace="nowrap"
              transitionProperty="color, font-weight"
            >
              Account Number
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                children="KW"
                color="brand.200"
                fontWeight="bold"
                pointerEvents="none"
              />

              <Input
                type="number"
                {...register("accountNumber", {
                  required: "Account Number Required",
                })}
                onChange={(e) => {
                  setUserInput(e.target.value);
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
          </FormControl>
          {/* SHows owner of the account */}
          <FormControl w="full" className="monsecure-form monsecure-transfer">
            <FormLabel
              fontSize="lg"
              htmlFor="accountNumber"
              color="brand.800"
              zIndex="4"
              transitionDuration="0.3s"
              transition="ease-in"
              whiteSpace="nowrap"
              fontWeight="bold"
              transitionProperty="color, font-weight"
            >
              To Account
            </FormLabel>

            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={
                  <Avatar
                    size="sm"
                    bg="brand.50"
                    name=""
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

          <FormControl w="full" className="monsecure-form ">
            <FormLabel
              htmlFor="accountNumber"
              transitionDuration="0.3s"
              transition="ease-in"
              whiteSpace="nowrap"
              transitionProperty="color, font-weight"
            >
              Amount
            </FormLabel>

            <Input
              type="number"
              variant="flushed"
              fontSize="4!important"
              //   {...register("amount", { required: "Amount required" })}
            />
          </FormControl>
          <FormControl w="full" className="monsecure-form monsecure-remarks">
            <FormLabel
              htmlFor="accountNumber"
              transitionDuration="0.3s"
              transition="ease-in"
              whiteSpace="nowrap"
              transitionProperty="color, font-weight"
            >
              What is it for?{" "}
              <Text as="span" color="brand.200">
                {" "}
                (Optional)
              </Text>
            </FormLabel>

            <Input
              type="text"
              variant="flushed"
              fontSize="4!important"
              {...register("remarks")}
            />
          </FormControl>
          <VStack pt={16} w="full">
            <Button
              bg="rgb(17, 79, 166)"
              loadingText="Creating your account"
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

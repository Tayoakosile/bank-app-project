import { Box, Heading, HStack } from "@chakra-ui/layout";
import {
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import React from "react";
import Back from "../../components/Back";
import ProtectedComponent from "../../components/ProtectedComponent";
import useFundAccount from "../../hooks/useFundAccount";
import useStore from "../../zustand";
import IsLoading from "../Loading/IsLoading";

const FundAccount = () => {
  const { setUserAmountToFund } = useStore((state) => state);
  const {
    isLoading,
    isAmountTypedIn,
    handleAmountIn,
    register,
    handleSubmit,
    FundAccount,
    isAmountAboutToTransferUpToFiftyNaira,
    errors,
  } = useFundAccount();

  // If fetching data from server
  if (isLoading) {
    return <IsLoading />;
  }
  return (
    <ProtectedComponent>
      <HStack pl="2" spacing="6" pt="6">
        <Back />
        <Heading size="md">Fund account</Heading>
      </HStack>

      <Box
        as="form"
        onSubmit={handleSubmit(FundAccount)}
        mt="32"
        mx="auto"
        w="90%"
      >
        <FormControl
          className="monsecure-form"
          id="password"
          h={{ base: "16" }}
          isInvalid={errors.FundAccountAmount}
        >
          <FormLabel
            htmlFor="fundAmount"
            transitionDuration="0.3s"
            transition="ease-in"
            color={errors.FundAccountAmount ? "#a12000" : "brand.600"}
            whiteSpace="nowrap"
            className={isAmountTypedIn && "Active"}
            transitionProperty="color, font-weight"
            color={errors.FundAccountAmount ? "#a12000" : "brand.600"}
            opacity={errors.FundAccountAmount ? "1" : ".80"}
            fontWeight={errors.FundAccountAmount ? "bold" : "bold"}
            bg={errors.FundAccountAmount ? "transparent" : "white"}
            px={errors.FundAccountAmount ? "transparent" : "1"}
            zIndex={errors.FundAccountAmount ? "transparent" : "4"}
          >
            Amount
          </FormLabel>
          <Input
            size="lg"
            colorScheme="brand"
            id="fundAmount"
            variant="flushed"
            type="number"
            {...register("FundAccountAmount", {
              required: "Amount required",
              valueAsNumber: true,
              validate: (value) => isAmountAboutToTransferUpToFiftyNaira(value),
            })}
            onChange={({ target }) => {
              handleAmountIn(target.value);
              setUserAmountToFund(Number(target.value));
              isAmountAboutToTransferUpToFiftyNaira(target.value);
            }}
          />

          <FormErrorMessage className="monsecure_error" fontWeight="bold">
            {errors.FundAccountAmount && errors.FundAccountAmount.message}
          </FormErrorMessage>
        </FormControl>

        <Box mt="36">
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
            Fund Account
          </Button>
        </Box>
      </Box>
    </ProtectedComponent>
  );
};

export default FundAccount;

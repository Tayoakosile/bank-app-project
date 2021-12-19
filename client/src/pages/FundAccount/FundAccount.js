import { Box, Heading, HStack } from "@chakra-ui/layout";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import React from "react";
import Back from "../../components/Back";
import ProtectedComponent from "../../components/ProtectedComponent";
import useFundAccount from "../../hooks/useFundAccount";
import useStore from "../../zustand";

const FundAccount = () => {
  const { setUserAmountToFund } = useStore((state) => state);
  const {
    isAmountTypedIn,
    handleAmountIn,
    register,
    handleSubmit,
    FundAccount,
  } = useFundAccount();
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
        >
          <FormLabel
            transitionDuration="0.3s"
            transition="ease-in"
            whiteSpace="nowrap"
            className={isAmountTypedIn && "Active"}
            transitionProperty="color, font-weight"
          >
            Amount
          </FormLabel>
          <Input
            size="lg"
            colorScheme="brand"
            variant="flushed"
            type="number"
            {...register("FundAccountAmount", {
              required: "Amount required",
              valueAsNumber: true,
              // validate: (value) => isAmountAboutToTransferUpToFiftyNaira(value),
            })}
            onChange={({ target }) => {
              handleAmountIn(target.value);
              setUserAmountToFund(Number(target.value));
            }}
          />
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

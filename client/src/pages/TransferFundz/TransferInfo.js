import React from "react";
import { Box, Heading, HStack, VStack, Text, Center } from "@chakra-ui/layout";
import ProtectedComponent from "../../components/ProtectedComponent";
import FulLogo from "../../assets/img/logo/FulLogo";
import { PinInput, PinInputField } from "@chakra-ui/react";
import useConfirmTransaction from "../../hooks/useConfirmTransaction";
import { Redirect } from "react-router-dom";

const TransferInfo = () => {
  const { handleVerifyPin, userTransactions, isError, error } =
    useConfirmTransaction();
  const isUserTransactionInLocalStorage = Object.keys(userTransactions).length;

  return (
    <ProtectedComponent>
      {isUserTransactionInLocalStorage > 0 ? (
        <>
          <Box px="6" py="6">
            <FulLogo w="12" h="12" color="brand.300" fill="brand.300" />
          </Box>
          <Center pt="12">
            <Heading size="md">Payment Authorization</Heading>
          </Center>
          <VStack pt="6" spacing="6">
            <Text fontSize="md" w="80%" align="center" color="brand.300">
              Input Moneydais pin to complete transfer
            </Text>
            <HStack justifyContent="center">
              <PinInput
                autoFocus={true}
                w="full"
                onComplete={(pin) => {
                  handleVerifyPin(pin);
                }}
                mask
                size="lg"
                errorBorderColor="#a12000"
                isInvalid={isError}
              >
                <PinInputField h="16" w="16" />
                <PinInputField h="16" w="16" />
                <PinInputField h="16" w="16" />
                <PinInputField h="16" w="16" />
              </PinInput>
            </HStack>
          </VStack>

          {isError && (
            <Text align="center" pt="6" color="#a12000" fontWeight="bold">
              {error
                ? error.response.data.message
                : "An error occured, refreshing the browser may solve it"}
            </Text>
          )}
        </>
      ) : (
        <Redirect to="/dashboard"></Redirect>
      )}
    </ProtectedComponent>
  );
};

export default TransferInfo;

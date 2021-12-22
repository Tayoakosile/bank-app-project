import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  PinInput,
  PinInputField,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Back from "../../components/Back";
import useTransactionPin from "../../hooks/useTransactionPin";
import TransactionPinSuccess from "./TransactionPinSuccess";

const TransactionPinConfirm = () => {
  const {
    NewPin,
    userDetail,
    isSamePinCode,
    UpdateUserPin,
    isSuccess,
    isLoading,
    isError,
    data,
  } = useTransactionPin();

  const { pin } = userDetail;
  const [isPinCompletelyTypedIn, setIsPinCompletelyTypedIn] = useState(true);

  if (isSuccess) {
    return <TransactionPinSuccess />;
  }

  return (
    <>
      <HStack mx="6" mt="4">
        <Back />
        <Heading size="md">New Monsecure PIN</Heading>
      </HStack>
      {pin === null ? (
        <Center mt="20">
          <VStack spacing="32">
            <Box h="48">
              <Heading
                pb="8"
                color="rgb(77 89 106)"
                size="sm"
                textAlign="center"
                fontWeight="normal"
              >
                Confirm your PIN
              </Heading>
              <HStack w="full">
                <PinInput
                  isInvalid={!isSamePinCode}
                  autoFocus={true}
                  onChange={() => {
                    setIsPinCompletelyTypedIn(true);
                  }}
                  onComplete={(pin) => {
                    setIsPinCompletelyTypedIn(false);
                    NewPin(pin);
                  }}
                  type="numeric"
                  size="lg"
                  mask
                >
                  <PinInputField w="16" h="16" />
                  <PinInputField w="16" h="16" />
                  <PinInputField w="16" h="16" />
                  <PinInputField w="16" h="16" />
                </PinInput>
              </HStack>

              {!isSamePinCode && (
                <Text
                  textAlign="center"
                  mt="4"
                  color="rgba(221, 44, 0, 0.87)"
                  fontWeight="bold"
                >
                  Pin entered twice are inconsistent , <br /> please try it
                  again
                </Text>
              )}
              {isError && (
                <Text
                  textAlign="center"
                  mt="4"
                  color="rgba(221, 44, 0, 0.87)"
                  fontWeight="bold"
                >
                  An error occured, please try again
                </Text>
              )}
            </Box>

            <Button
              isDisabled={isPinCompletelyTypedIn || !isSamePinCode}
              w="100%"
              borderRadius="2px"
              isLoading={isLoading}
              loadingText="Setting PIN"
              mx="auto"
              onClick={UpdateUserPin}
              h="16"
              size="lg"
            >
              Set Transaction Pin
            </Button>
          </VStack>
        </Center>
      ) : (
        <Redirect to="/dashboard"></Redirect>
      )}
    </>
  );
};

export default TransactionPinConfirm;

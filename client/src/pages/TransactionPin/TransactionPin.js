import React from "react";
import {
  HStack,
  PinInput,
  PinInputField,
  Heading,
  Center,
  VStack,
  Box,
  Icon,
  Text,
} from "@chakra-ui/react";
import ProtectedComponent from "../../components/ProtectedComponent";
import { ReactComponent as TransactionPinSvg } from "../../assets/img/TransactionPin.svg";
import useTransactionPin from "../../hooks/useTransactionPin";
import { Redirect } from "react-router-dom";

const TransactionPin = () => {
  const { userDetail, redirectToConfirmPassword } = useTransactionPin();
  const { pin } = userDetail;
  return (
    <>
      {pin === null ? (
        <>
          <Heading size="md" p="6" textTransform="capitalize">
            New Moneydais PIN
          </Heading>

          <Center p="6">
            <VStack mt="12" spacing="12">
              {/* Icon with text */}
              <VStack spacing="1" textAlign="center">
                <Icon as={TransactionPinSvg} w="40" h="40" />
                <Text>
                  {" "}
                  Enter a 4-digits PIN to your secure your Moneydais account
                </Text>
              </VStack>
              {/* Icon with text */}

              <HStack>
                <PinInput
                  onComplete={redirectToConfirmPassword}
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
            </VStack>
          </Center>
        </>
      ) : (
        <Redirect to="/dashboard"></Redirect>
      )}
    </>
  );
};

export default TransactionPin;

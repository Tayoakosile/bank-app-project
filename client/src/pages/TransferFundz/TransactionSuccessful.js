import { Button } from "@chakra-ui/button";
import { Box, Heading, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import { Redirect } from "react-router-dom";
import FulLogo from "../../assets/img/logo/FulLogo";
import useTransferSuccess from "../../hooks/useTransferSuccess";

const TransactionSuccessful = () => {
  const { retrieveUserDetailsFromLocalStorage, completeTransaction } =
    useTransferSuccess();

  const isUserDetailsInLocalStorage = Object.keys(
    retrieveUserDetailsFromLocalStorage
  ).length;
  const { firstname, lastname, amount } =
    isUserDetailsInLocalStorage > 0 && retrieveUserDetailsFromLocalStorage;
  console.log(
    isUserDetailsInLocalStorage > 0 ? "greater than 0" : "lesser than zero"
  );
  return (
    <>
      {isUserDetailsInLocalStorage > 0 ? (
        <Box>
          <Box mt="6" px="6">
            <FulLogo w="12" h="12" fill="brand.500" color="brand.500" />
          </Box>
          <VStack mt="20" spacing="28">
            <Heading size="lg">Transfer success</Heading>
            <Box>
              <Text align="center" w="90%" fontSize="2xl" mx="auto">
                You successfully transferred the sum of{" "}
                <Text
                  as="span"
                  color="brand.700"
                  fontWeight="bold"
                  fontSize="3xl"
                >
                  N{amount}
                </Text>{" "}
                to{" "}
                <Text as="span" color="brand.700">
                  {firstname} {lastname}
                </Text>{" "}
              </Text>
            </Box>
            <Button onClick={completeTransaction} w="80%" h="14">
              Complete
            </Button>
          </VStack>
        </Box>
      ) : (
        <Redirect to="/dashboard"></Redirect>
      )}
    </>
  );
};

export default TransactionSuccessful;

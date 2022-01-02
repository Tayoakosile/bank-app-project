import { Button } from "@chakra-ui/button";
import { Box, Heading, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import { Checkmark } from "react-checkmark";
import { useHistory } from "react-router-dom";
const TransactionPinSuccess = () => {
  const history = useHistory();
  return (
    <VStack mt="32" spacing="24" w="90%" mx="auto" justifyContent="center">
      <VStack>
        <Checkmark color="#1250a9" size="xLarge" />
        <Heading fontSize="4xl">Success</Heading>
        <Text color="black" fontSize="xl" textAlign="center">
          Moneydais Pin has been set successfully
        </Text>
      </VStack>

      <Button
        h="16"
        size="lg"
        variant="outline"
        w="80%"
        onClick={() => history.push("/dashboard")}
      >
        Back to Dashboard
      </Button>
    </VStack>
  );
};

export default TransactionPinSuccess;

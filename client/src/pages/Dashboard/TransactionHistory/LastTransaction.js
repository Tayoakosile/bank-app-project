import { Button } from "@chakra-ui/button";
import { Box, HStack, Spacer, Text } from "@chakra-ui/layout";
import randomatic from "randomatic";
import React from "react";
import { Link } from "react-router-dom";
import useTransactionHistory from "../../../hooks/useTransactionHistory";
const LastTransaction = () => {
  const {
    daysSelection,
    storeUserSelection,
    setStoreUseSelection,
    transactions,
  } = useTransactionHistory();
  return (
    <Box pl="5" mt="10">
      {/* Last transaction and view all component */}
      <HStack>
        <Box>
          <Text fontSize="sm" color="brand.800" fontWeight="bold">
            Last Transactions
          </Text>
        </Box>
        <Spacer />
        <Button
          variant="ghost"
          fontSize="sm"
          as={Link}
          to="/transaction/history"
        >
          View all
        </Button>
      </HStack>
      {/* Last transaction and view all component */}

      {Array.from(transactions).map(({ amount, narration, status }) => (
        <React.Fragment key={randomatic("0a", 12)}>
          <Text>{amount}</Text>
          <Text>{narration}</Text>
          <Text>{status}</Text>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default LastTransaction;

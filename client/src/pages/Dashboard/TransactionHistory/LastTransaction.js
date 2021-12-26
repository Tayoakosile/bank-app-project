import { Button, Icon } from "@chakra-ui/react";
import {
  Divider,
  Box,
  Text,
  Heading,
  HStack,
  VStack,
  Flex,
  Spacer,
} from "@chakra-ui/layout";
import randomatic from "randomatic";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { BsWallet } from "react-icons/bs";
import useTransactionHistory from "../../../hooks/useTransactionHistory";
import useStore from "../../../zustand/index";

const LastTransaction = () => {
  const { userId } = useStore();
  const history = useHistory();
  const {
    daysSelection,
    storeUserSelection,
    setStoreUseSelection,
    transactions,
  } = useTransactionHistory();
  return (
    <Box mt="10">
      {/* Last transaction and view all component */}
      <HStack pl="5" alignItems="baseline">
        <Box>
          <Heading fontSize="lg">Last Transactions</Heading>
        </Box>
        <Spacer />
        <Button
          variant="ghost"
          fontSize="sm"
          as={Link}
          to={`/transactionhistory/${userId}`}
        >
          View all
        </Button>
      </HStack>
      {/* Last transaction and view all component */}

      <VStack
        spacing="10"
        alignItems="flex-start"
        px="4"
        h="48"
        w="100%"
        mx="auto"
        mt="6"
      >
        {Array.from(transactions).map(
          ({
            amount,
            narration,
            status,
            receiver,
            sender_name,
            transaction_type,
            ref,
          }) => (
            <React.Fragment key={randomatic("0a", 12)}>
              <HStack
                h="32"
                px="4"
                w="full"
                onClick={() => {
                  history.push(`account/fund-success/${ref}`);
                }}
              >
                <HStack>
                  <HStack
                    as="span"
                    rounded="lg"
                    justifyContent="center"
                    bg="brand.50"
                    w="14"
                    h="14"
                  >
                    {transaction_type === "Fund" && (
                      <Icon as={BsWallet} w="7" h="7" color="brand.500" />
                    )}
                    <Box></Box>
                  </HStack>
                  {/* VStack */}
                  <VStack alignItems="flex-start" spacing="0">
                    <Heading size="sm">
                      {transaction_type === "Fund" && "Funded wallet"}
                    </Heading>
                    <Text color="gray.500" as="span" textTransform="capitalize">
                      {transaction_type}
                    </Text>
                  </VStack>
                </HStack>
                <Spacer />

                <Box>
                  <Heading size="md">
                    <Text
                      as="span"
                      pr="1"
                      color={
                        transaction_type === "debit" ? "red.500" : "green.500"
                      }
                    >
                      {transaction_type === "debit" ? "-" : "+"}
                    </Text>
                    N{amount}
                  </Heading>
                </Box>
              </HStack>
              <Divider />
            </React.Fragment>
          )
        )}
      </VStack>
    </Box>
  );
};

export default LastTransaction;

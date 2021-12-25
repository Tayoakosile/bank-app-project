import { IconButton } from "@chakra-ui/button";
import { Box, Heading, HStack, Spacer, Text, VStack } from "@chakra-ui/layout";
import moment from "moment";
import React from "react";
import { BsDownload, BsUpload, BsWallet2 } from "react-icons/bs";
import { useHistory } from "react-router-dom";

const Transact = ({ transaction }) => {
  const history = useHistory();
  console.log(transaction);

  const {
    created_at,
    ref,
    transaction_type,
    sender_name,
    receiver_name,
    amount,
  } = transaction;

  return (
    <Box
      onClick={() => {
        history.push(`/account/fund-success/${ref}`);
      }}
      h="14"
      w="full"
      px="4"
    >
      <HStack>
        <HStack spacing="4">
          {transaction_type === "debit" && (
            <IconButton
              aria-search="transaction-icon"
              icon={<BsUpload />}
              size="sm"
              border="0px"
              bg="gray.100"
              size="lg"
              color="brand.500"
              variant="outline"
            />
          )}
          {transaction_type === "credit" && (
            <IconButton
              aria-search="transaction-icon"
              icon={<BsDownload />}
              border="0px"
              bg="gray.100"
              size="lg"
              color="brand.500"
              variant="outline"
            />
          )}

          {transaction_type === "Fund" && (
            <IconButton
              aria-search="transaction-icon"
              icon={<BsWallet2 />}
              border="0px"
              bg="gray.100"
              size="lg"
              color="brand.500"
              variant="outline"
            />
          )}

          <VStack spacing="0" alignItems="flex-start">
            <Heading size="sm">
              {transaction_type === "Fund" && "Fund Wallet"}
              {transaction_type === "credit" && `Credit`}
              {transaction_type === "debit" && "Debit"}
            </Heading>
            <Text fontSize="sm" color="gray.400">
              {transaction_type === "Fund" && "Monsecure"}
              {transaction_type === "credit" && `From ${sender_name}`}
              {transaction_type === "debit" && `To: ${receiver_name}`}
            </Text>
          </VStack>
        </HStack>
        <Spacer />
        <Heading
          fontSize="2xl"
          color={`${transaction_type === "debit" ? "red.500" : "green.500"}`}
        >
          <Text as="span">{`${transaction_type === "debit" ? "-" : "+"}`}</Text>
          N{amount}
        </Heading>
      </HStack>
      <Heading size="sm" pt="6" color="#525962" fontWeight="normal">
        {moment(created_at).format("HH:mm a, MMM DD YYYY")}
      </Heading>
    </Box>
  );
};

export default Transact;

import { IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Box, Heading, HStack, VStack } from "@chakra-ui/layout";
import React from "react";
import { HiOutlineDownload, HiOutlineUpload } from "react-icons/hi";
import { IoCashOutline } from "react-icons/io5";
import ProtectedComponent from "../../components/ProtectedComponent";

const Transactions = ({ notification }) => {
  const {
    created_at,
    message,
    receiver,
    ref,
    status,
    transaction_type,
    payment_method,
    sender,
    amount,
  } = notification;
  console.log(amount);

  return (
    <ProtectedComponent>
      <Box shadow="md" p="6" w="full" h="48">
        {/* Payment type */}
        <HStack spacing="4">
          {transaction_type === "debit" && (
            <IconButton
              colorScheme="red"
              size="xs"
              variant="outline"
              icon={<HiOutlineUpload />}
            />
          )}
          {transaction_type === "Fund" && (
            <IconButton
              size="xs"
              colorScheme="brand"
              variant="outline"
              icon={<IoCashOutline />}
            />
          )}
          {transaction_type === "credit" && (
            <IconButton
              size="xs"
              variant="outline"
              colorScheme="brand"
              icon={<HiOutlineDownload />}
            />
          )}

          {transaction_type === "debit" && (
            <Heading size="sm">Send Money</Heading>
          )}
          {transaction_type === "Fund" && (
            <Heading size="sm">Fund Wallet</Heading>
          )}
          {transaction_type === "credit" && (
            <Heading size="sm">Credit Alert</Heading>
          )}
        </HStack>
        {/* Payment type */}

        <VStack mt="4">
          <Heading
            fontWeight="normal"
            size="sm"
            color="brand.400"
            textTransform="capitalize"
          >
            {message}
          </Heading>
          <Heading>N {amount}</Heading>
        </VStack>

        <HStack mt="4">
          <Heading
            fontWeight="normal"
            size="sm"
            color="brand.400"
            textTransform="capitalize"
          >
            {transaction_type === "credit" && "Sender"}
            {transaction_type === "debit" && "Receiver"}
            {transaction_type === "Fund" && "Payment Method"} :
          </Heading>
          <Heading fontWeight="normal" size="sm">
            {sender && sender}
            {receiver && receiver}
            {transaction_type === "Fund" && payment_method}
          </Heading>
        </HStack>
      </Box>
    </ProtectedComponent>
  );
};

export default Transactions;

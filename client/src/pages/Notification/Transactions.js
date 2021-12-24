import { IconButton } from "@chakra-ui/button";
import { Link as Navigate } from "react-router-dom";
import { HiOutlineChevronRight } from "react-icons/hi";
import {
  Box,
  Divider,
  Heading,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/layout";
import moment from "moment";
import React from "react";
import { HiOutlineDownload, HiOutlineUpload } from "react-icons/hi";
import { IoCashOutline } from "react-icons/io5";
import ProtectedComponent from "../../components/ProtectedComponent";
import Icon from "@chakra-ui/icon";

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
      <Box shadow="lg" py="6" px="4" w="full" h="64">
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

          <Heading size="xs" fontWeight="bold">
            {transaction_type === "debit" && "Send Money"}
            {transaction_type === "Fund" && "Fund Wallet"}
            {transaction_type === "credit" && "Credit Alert"}
          </Heading>
        </HStack>
        {/* Payment type */}

        <VStack spacing="-1" my="6">
          <Heading
            fontWeight="normal"
            size="sm"
            color="brand.200"
            textTransform="capitalize"
          >
            {message}
          </Heading>
          <Heading fontWeight="bold" color="brand.600" fontSize="5xl">
            <Text pr="1" as="span" fontSize="0.4em">
              ₦
            </Text>
            {amount}
          </Heading>
        </VStack>

        <HStack mt="2" mb="2" pr="4">
          <Heading
            fontWeight="normal"
            size="sm"
            color="gray.400"
            textTransform="capitalize"
          >
            {transaction_type === "credit" && "Sender"}
            {transaction_type === "debit" && "Receiver"}
            {transaction_type === "Fund" && "Payment Method"} :
          </Heading>
          <Heading size="sm">
            {sender && sender}
            {receiver && receiver}
            {transaction_type === "Fund" && payment_method}
          </Heading>
        </HStack>
        <Divider />
        {/* Date and view details */}
        <HStack mt="4" fontSize="md" justifyContent="space-between">
          <Text fontSize="sm">
            {moment(created_at).format(" MMM Do, YYYY h:mm:a")}
          </Text>

          <Link as={Navigate} to={`/account/fund-success/${ref}`}>
            <HStack>
              <Text as="span">View</Text>
              <Icon
                as={HiOutlineChevronRight}
                w="4"
                strokeWidth="1px"
                h="4"
                color="brand.300"
              />
            </HStack>
          </Link>
        </HStack>
      </Box>
    </ProtectedComponent>
  );
};

export default Transactions;

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
      <Box shadow="xs" border py="6" px="4" w="full" h="56">
        {/* Payment type */}
        <HStack spacing="4">
          {transaction_type === "debit" && (
            <IconButton
              colorScheme="brand"
              size="sm"
              variant="solid"
              icon={<HiOutlineUpload />}
            />
          )}
          {transaction_type === "Fund" && (
            <IconButton
              size="md"
              bg="brand.50"
              color="brand.700"
              variant="solid"
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

        <VStack spacing="1" my="3">
          <Heading
            fontWeight="normal"
            size="sm"
            color="brand.200"
            textTransform="capitalize"
          >
            {message}
          </Heading>
          <Heading fontWeight="bold" color="brand.600" fontSize="3xl">
            <Text pr="1" as="span" fontSize="0.5em">
              ₦
            </Text>
            {amount}.00
          </Heading>
        </VStack>

        <HStack pr="4" mb="1">
          <Heading
            fontWeight="normal"
            size="xs"
            color="gray.400"
            textTransform="capitalize"
          >
            {transaction_type === "credit" && "Sender"}
            {transaction_type === "debit" && "Receiver"}
            {transaction_type === "Fund" && "Payment Method"} :
          </Heading>
          <Heading size="xs" fontWeight="normal" color="brand.500">
            {sender && sender}
            {receiver && receiver}
            {transaction_type === "Fund" && payment_method}
          </Heading>
        </HStack>
        {/* Date and view details */}
        <Divider />
        <HStack mt="4" justifyContent="space-between">
          <Text fontSize="xs">
            {moment(created_at).format(" MMM Do, YYYY h:mm:a")}
          </Text>

          <Link as={Navigate} to={`/account/fund-success/${ref}`}>
            <HStack spacing="0">
              <Text as="span" color="brand.500" fontSize="sm">
                View
              </Text>
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

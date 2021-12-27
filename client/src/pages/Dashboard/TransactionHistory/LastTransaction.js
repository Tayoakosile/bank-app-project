import { Box, Heading, HStack, Spacer, Text, VStack } from "@chakra-ui/layout";
import { Button, Icon, Table, Tbody, Td, Tr } from "@chakra-ui/react";
import randomatic from "randomatic";
import React from "react";
import { BsWallet, BsUpload, BsDownload } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
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

      <Table variant="simple" w="100%" mt="4" mx="auto">
        <Tbody w="full">
          {Array.from(transactions)
            .slice(-3)
            .map(
              ({
                amount,
                narration,
                created_at,
                status,
                receiver,
                sender_name,
                transaction_type,
                ref,
              }) => (
                <React.Fragment key={randomatic("0a", 12)}>
                  <Tr
                    onClick={() => {
                      history.push(`account/fund-success/${ref}`);
                    }}
                    w="100%"
                  >
                    <Td w="full">
                      <HStack spacing="2">
                        <VStack bg="gray.50" p="4" rounded="lg ">
                          {transaction_type === "Fund" && (
                            <Icon as={BsWallet} w="7" h="7" color="brand.500" />
                          )}

                          {transaction_type === "credit" && (
                            <Icon
                              as={BsDownload}
                              w="7"
                              h="7"
                              color="brand.500"
                            />
                          )}

                          {transaction_type === "debit" && (
                            <Icon as={BsUpload} w="7" h="7" color="brand.500" />
                          )}
                        </VStack>{" "}
                        <VStack alignItems="flex-start" spacing="1">
                          {" "}
                          <Heading size="sm">
                            {transaction_type === "Fund" && "Funded wallet"}{" "}
                            {transaction_type === "credit" && `${sender_name}`}{" "}
                            {transaction_type === "debit" && `${receiver}`}{" "}
                          </Heading>{" "}
                          <Text
                            color="gray.500"
                            as="span"
                            textTransform="capitalize"
                          >
                            {transaction_type}
                          </Text>{" "}
                        </VStack>
                      </HStack>
                    </Td>
                    {/*  */}
                    <Td w="full">
                      <VStack alignItems="flex-start">
                        <HStack
                          spacing="0"
                          color={
                            transaction_type !== "debit"
                              ? "green.500"
                              : "red.500"
                          }
                        >
                          <Text as="span" fontSize="2xl">
                            {transaction_type !== "debit" ? "+" : "-"}
                          </Text>
                          <Heading size="md">{amount}</Heading>
                        </HStack>
                      </VStack>
                    </Td>
                  </Tr>
                </React.Fragment>
              )
            )}{" "}
        </Tbody>
      </Table>
    </Box>
  );
};

export default LastTransaction;

// <HStack h="full">
//   <HStack
//     as="span"
//     rounded="lg"
//     justifyContent="center"
//     bg="brand.50"
//     w="14"
//     h="14"
//   >
//     {transaction_type === "Fund" && (
//       <Icon as={BsWallet} w="7" h="7" color="brand.500" />
//     )}
//     <Box></Box>
//   </HStack>
//   {/* VStack */}
//   <VStack alignItems="flex-start" spacing="0">
//     <Heading size="sm">
//       {transaction_type === "Fund" && "Funded wallet"}
//     </Heading>
//     <Text color="gray.500" as="span" textTransform="capitalize">
//       {transaction_type}
//     </Text>
//   </VStack>
// </HStack>;

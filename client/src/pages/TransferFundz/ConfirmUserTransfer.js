import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Box, Heading, HStack, Spacer, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import { useHistory, Redirect } from "react-router-dom";
import FulLogo from "../../assets/img/logo/FulLogo";
import ProtectedComponent from "../../components/ProtectedComponent";
import useConfirmTransaction from "../../hooks/useConfirmTransaction";

const TransferInfo = () => {
  const history = useHistory();
  const { userTransactions } = useConfirmTransaction();
  const isUserTransactionInLocalStorage = Object.keys(userTransactions).length;

  console.log(userTransactions);
  const {
    accountNumber,
    amount,
    firstname,
    lastname,
    remarks,
    destination_bank,
  } = isUserTransactionInLocalStorage !== 0 && userTransactions;

  return (
    <ProtectedComponent>
      {isUserTransactionInLocalStorage !== 0 ? (
        <>
          <Box px="6" pt="6">
            <FulLogo w="12" h="12" color="brand.700" fill="brand.700" />
          </Box>
          <VStack h="full" mt="20" spacing="4">
            <Avatar
              size="lg"
              bg="brand.100"
              color="brand.800"
              name={`${firstname ? firstname : "loading"} ${lastname}`}
            />
            <Heading size="md" fontWeight="normal">
              Transfer
            </Heading>
            <VStack pt="10" pb="20" spacing="4" w="90%" mx="auto">
              <HStack spacing="4" w="full">
                <Text>Account Number</Text>
                <Spacer />
                <Heading
                  size="sm"
                  letterSpacing=".9px"
                >{`MS${accountNumber}`}</Heading>
              </HStack>
              <HStack spacing="4" w="full">
                <Text>Name</Text>
                <Spacer />
                <Heading
                  size="sm"
                  letterSpacing=".9px"
                >{`${firstname} ${lastname}`}</Heading>
              </HStack>

              <HStack spacing="4" w="full">
                <Text>Amount</Text>
                <Spacer />
                <Heading size="sm" letterSpacing=".9px">
                  ₦ {amount}.00
                </Heading>
              </HStack>

              <HStack spacing="4" w="full">
                <Text>Receiver's Bank</Text>
                <Spacer />
                <Heading size="sm" letterSpacing=".9px">
                  {destination_bank}
                </Heading>
              </HStack>

              {remarks && (
                <HStack spacing="4" w="full">
                  <Text>Remarks</Text>
                  <Spacer />
                  <Heading size="sm" letterSpacing=".9px">
                    {remarks}
                  </Heading>
                </HStack>
              )}
            </VStack>
            <Button
              w="80%"
              h={16}
              onClick={() => {
                history.push("/account/transfer/monsecure/confirm/pin");
              }}
            >
              {`  Transfer ₦${amount} to ${firstname}
               `}
            </Button>
          </VStack>
        </>
      ) : (
        <Redirect to="/dashboard"></Redirect>
      )}
    </ProtectedComponent>
  );
};

export default TransferInfo;

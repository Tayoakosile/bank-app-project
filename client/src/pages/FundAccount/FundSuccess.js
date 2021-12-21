import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Box, Center, Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import moment from "moment";
import React from "react";
import NumberToWords from "number-to-words";
import { Link } from "react-router-dom";
import FulLogo from "../../assets/img/logo/FulLogo";
import { ReactComponent as SuccessTransaction } from "../../assets/img/SuccessfullTransaction.svg";
import useFundAccountSuccess from "../../hooks/useFundAccountSuccess";

const FundSuccess = () => {
  const {
    isSuccess,
    isError,
    isLoading,
    transactionDetails,
    transactionUserDetails,
  } = useFundAccountSuccess();
  console.log(transactionDetails, transactionUserDetails);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>error</div>;
  }

  return (
    <>
      {isSuccess && (
        <Box>
          <FulLogo
            w="12"
            h="12"
            fs="3xl"
            color="brand.500"
            fill="brand.500"
            p="6"
            as={Link}
            to="/"
          />
          <Box mt>
            <VStack mb="6">
              <Icon
                bg="brand.50"
                px="2"
                borderRadius="50%"
                as={SuccessTransaction}
                w="28"
                h="28"
              />
            </VStack>
            <Heading size="lg" align="center" textTransform="uppercase">
              Successful
            </Heading>
            <Heading pt="2" fontSize="4xl" color="brand.500" textAlign="center">
              ₦{transactionDetails.amount}
            </Heading>

            <VStack
              spacing="4"
              py="6"
              textTransform="capitalize"
              w="90%"
              mx="auto"
              alignItems="flex-start"
            >
              {/* Transaction receipt */}
              <HStack w="full" justifyContent="space-between">
                <Text>Recipient</Text>
                <Heading size="sm">{`${transactionUserDetails.firstname} ${transactionUserDetails.lastname}(${transactionUserDetails.account.account_number})`}</Heading>
              </HStack>

              <HStack w="full" justifyContent="space-between">
                <Text>Transaction Type</Text>
                <Heading size="sm">
                  {`${transactionDetails.transaction_type} 
                `}
                </Heading>
              </HStack>

              <HStack w="full" justifyContent="space-between">
                <Text>Receiver</Text>
                <Heading size="sm">
                  {`${transactionDetails.receiver_name} 
                `}
                </Heading>
              </HStack>

              <HStack w="full" justifyContent="space-between">
                <Text> Account Number</Text>
                <Heading size="sm">
                  {`${transactionDetails.destination_account_number} 
                `}
                </Heading>
              </HStack>

              {/* Transaction Reference */}
              <HStack w="full" justifyContent="space-between">
                <Text>Transaction Reference</Text>
                <Heading size="sm">
                  {`${transactionDetails.ref} 
                `}
                </Heading>
              </HStack>

              <HStack w="full" justifyContent="space-between">
                <Text>Date</Text>
                <Heading size="sm">
                  {transactionDetails &&
                    `${moment(new Date(transactionDetails.created_at)).format(
                      "MMM Do YYYY HH:mm a"
                    )}`}
                </Heading>
              </HStack>

              <HStack w="full" justifyContent="space-between">
                <Text>Receiving Bank</Text>
                <Heading size="sm">
                  {transactionDetails && transactionDetails.destination_bank}
                </Heading>
              </HStack>

              {transactionDetails.narration && (
                <HStack w="full" justifyContent="space-between">
                  <Text>Remarks</Text>
                  <Heading size="sm">
                    {transactionDetails &&
                      transactionDetails.transactionDetails.narration}
                  </Heading>
                </HStack>
              )}

              {/* Transaction receipt */}
            </VStack>
          </Box>
          <Center>
            <Button mt="6" as={Link} to="/dashboard" h="14" w="80%" mx="auto">
              Complete
            </Button>
          </Center>
        </Box>
      )}
    </>
  );
};

export default FundSuccess;

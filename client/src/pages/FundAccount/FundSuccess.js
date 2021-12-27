import { Button } from "@chakra-ui/button";
import { Box, Center, Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import moment from "moment";
import NumberToWords from "number-to-words";
import React from "react";
import { Checkmark } from "react-checkmark";
import { Link } from "react-router-dom";
import FulLogo from "../../assets/img/logo/FulLogo";
import Back from "../../components/Back";
import useFundAccountSuccess from "../../hooks/useFundAccountSuccess";

const FundSuccess = () => {
  const {
    isSuccess,
    isError,
    isLoading,
    transactionDetails,
    transactionUserDetails,
  } = useFundAccountSuccess();

  if (isLoading) {
  }

  if (isError) {
    return <div>error</div>;
  }

  return (
    <>
      {isSuccess && (
        <Box>
          <HStack mt="6" mb="10">
            <Back ml="2" w="6" h="6" />
            <FulLogo
              w="8"
              h="8"
              textTransform="capitalize"
              fs="xl"
              color="brand.300"
              fill="brand.300"
              as={Link}
              to="/"
            />
          </HStack>

          <Box>
            <VStack mb="6">
              <Checkmark size="xLarge" color="#114ea5" />
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
                <Text>Amount in Words</Text>
                <Heading size="sm">{` ${NumberToWords.toWords(
                  transactionDetails.amount
                )} Naira  `}</Heading>
              </HStack>

              <HStack w="full" justifyContent="space-between">
                <Text>Transaction Type</Text>
                <Heading size="sm">
                  {`${transactionDetails.transaction_type} 
                `}
                </Heading>
              </HStack>
              {transactionDetails.receiver_name && (
                <HStack w="full" justifyContent="space-between">
                  <Text>Receiver</Text>
                  <Heading size="sm">
                    {`${transactionDetails.receiver_name} 
                `}
                  </Heading>
                </HStack>
              )}
              {transactionDetails.destination_account_number && (
                <HStack w="full" justifyContent="space-between">
                  <Text> Account Number</Text>
                  <Heading size="sm">
                    {`${transactionDetails.destination_account_number} 
                `}
                  </Heading>
                </HStack>
              )}
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
              {transactionDetails.destination_bank && (
                <HStack w="full" justifyContent="space-between">
                  <Text>Receiving Bank</Text>
                  <Heading size="sm">
                    {transactionDetails && transactionDetails.destination_bank}
                  </Heading>
                </HStack>
              )}
              {transactionDetails.narration && (
                <HStack w="full" justifyContent="space-between">
                  <Text>Remarks</Text>
                  <Heading size="sm">
                    {transactionDetails && transactionDetails.narration}
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

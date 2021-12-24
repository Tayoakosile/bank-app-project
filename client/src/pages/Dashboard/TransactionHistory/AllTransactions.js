import { Box, Divider, Heading, HStack, VStack } from "@chakra-ui/layout";
import React from "react";
import Headroom from "react-headroom";
import FulLogo from "../../../assets/img/logo/FulLogo";
import Back from "../../../components/Back";
import ProtectedComponent from "../../../components/ProtectedComponent";
import useAllTransactions from "../../../hooks/useAllTransactions";
import Transact from "./Transact";

const AllTransactions = () => {
  const { data, isLoading, isError, isSuccess } = useAllTransactions();
  console.log(data, isLoading, isError);
  return (
    <ProtectedComponent>
      <Box as={Headroom}>
        <HStack h="20" px="2" bg="brand.500" shadow="sm" w="full">
          <Back noBackground={true} />
          <Heading color="white" size="md">
            Transaction History
          </Heading>
        </HStack>
        <Box mt="3" h="6"></Box>
      </Box>
      {isError && <div>Error</div>}
      {/* All transactions */}
      <VStack spacing="12" mx="4" alignItems="flex-start">
        {!isLoading && isSuccess && data.data.message.length >= 1
          ? data.data.message.map((transaction) => (
              <>
                <Transact transaction={transaction} />
                <Divider borderColor="gray.300" />
              </>
            ))
          : "Nothing to show here"}
        <Box mt="12" h="12"></Box>
      </VStack>
    </ProtectedComponent>
  );
};

export default AllTransactions;

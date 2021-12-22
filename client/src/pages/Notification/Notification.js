import { Box, Heading, HStack, VStack } from "@chakra-ui/layout";
import React from "react";
import Back from "../../components/Back";
import Transactions from "./Transactions";
import ProtectedComponent from "../../components/ProtectedComponent";

const Notification = () => {
  return (
    <ProtectedComponent>
      <Box bg="brand.50" h="full">
        {/* Notification Heading */}
        <HStack bg="white" py="6" mb="4" pl={2} spacing="4">
          <Back />
          <Heading size="lg">Notifications</Heading>
        </HStack>
        {/* Notification Heading */}

        {/* Notification Body */}
        <VStack spacing="10" alignItems="flex-start" px="4" h="full">
          <Transactions />
          <Transactions />
          <Transactions />
        </VStack>

        {/* Notification Body */}
      </Box>
    </ProtectedComponent>
  );
};

export default Notification;

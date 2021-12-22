import { Box, Heading, HStack } from "@chakra-ui/layout";
import React from "react";
import Back from "../../components/Back";

const Notification = () => {
  return (
    <Box mt="6">
      <HStack ml={4}>
        <Back />
        <Heading size="lg">Notifications</Heading>
      </HStack>
    </Box>
  );
};

export default Notification;

import { Box, HStack, Heading } from "@chakra-ui/layout";
import React from "react";
import Back from "../../components/Back";

const Settings = () => {
  return (
    <Box pt="4" pl='2'>
      <HStack>
        <Back />
        <Heading size="md">Settings</Heading>
      </HStack>
    </Box>
  );
};

export default Settings;

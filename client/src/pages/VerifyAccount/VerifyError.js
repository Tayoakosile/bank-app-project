import { Box, Center, Heading, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import FulLogo from "../../assets/img/logo/FulLogo";

const VerifyError = () => {
  return (
    <VStack bg="#cfdced1f" h="full" p="5" spacing="32" alignItems="flex-start">
      <Box mb="4">
        <FulLogo fs="xl" fill="brand.500" color="brand.500" w="8" h="8" />
      </Box>
      {/* Error text */}
      <VStack w="full">
        <Heading fontSize="5xl" color="brand.700" fontWeight="bold">
          Error
        </Heading>
        <Text align="center" color="brand.200" fontSize="2xl" fontWeight="bold">
          Expired or invalid verification link 
        </Text>
      </VStack>
    </VStack>
  );
};

export default VerifyError;

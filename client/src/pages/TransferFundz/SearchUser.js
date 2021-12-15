import React from "react";
import { Box, HStack, Text, Center, VStack } from "@chakra-ui/react";
import Back from "../../components/Back";
import ProtectedComponent from "../../components/ProtectedComponent";
import FulLogo from "../../assets/img/logo/FulLogo";

const SearchUser = () => {
  return (
    <ProtectedComponent>
      {/* Go back button */}
      <HStack pl="4" pt="6" spacing="6">
        <Back />
        <Text fontWeight="bold" fontSize="2xl">
          Send Money
        </Text>
      </HStack>
      {/* Go back button */}

      {/* Send money to user account */}
      <HStack px="6" my="12">
        {/* Send money to monsecure members */}
        <VStack bg="brand.500" h="36" w="50%">
          <Text>
            <FulLogo showText={true} />
          </Text>
        </VStack>

        {/* Send money to bank account*/}
        <Box bg="thirdColor.500" h="36" w="50%">
          {" "}
        </Box>
      </HStack>
      <Box>Beneficiaries</Box>
    </ProtectedComponent>
  );
};

export default SearchUser;

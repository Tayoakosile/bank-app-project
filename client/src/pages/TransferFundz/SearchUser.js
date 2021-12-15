import React from "react";
import { BsBank } from "react-icons/bs";
import {
  Box,
  HStack,
  Text,
  Center,
  VStack,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icon";
import Back from "../../components/Back";
import ProtectedComponent from "../../components/ProtectedComponent";
import FulLogo from "../../assets/img/logo/FulLogo";
import { Link } from "react-router-dom";

const SearchUser = () => {
  return (
    <ProtectedComponent>
      {/* Go back button */}
      <HStack pl="4" pt="6" spacing="6">
        <Back noBackground={false} />
        <Text fontWeight="bold" fontSize="2xl">
          Send Money
        </Text>
      </HStack>
      {/* Go back button */}

      {/* Send money to user account */}
      <HStack px="4" my="12" spacing="6">
        {/* Send money to monsecure members */}
        <LinkBox bg="thirdColor.500" h="36" w="50%">
          <Center h="full">
            <VStack spacing="2">
              <FulLogo  w={14} h={14} showText={true} />
              <Box as={Link} to="monsecure" color="white" fontSize="md">
                To Monsecure
              </Box>
            </VStack>
          </Center>
        </LinkBox>

        {/* Send money to bank account*/}
        <LinkBox bg="gray.50" h="36" w="50%">
          <Center h="full">
            <VStack spacing="2">
              <Icon as={BsBank} w="12" h="12" color="brand.500" />
              <Box as={Link} to="transfer/bank">
                <LinkOverlay color="brand.800" fontSize="md">
                  To Bank Account
                </LinkOverlay>
              </Box>
            </VStack>
          </Center>
        </LinkBox>
      </HStack>
      <Box>Beneficiaries</Box>
    </ProtectedComponent>
  );
};

export default SearchUser;

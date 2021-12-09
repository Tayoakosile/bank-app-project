import { Box, Center, Heading, Text, VStack, HStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import React from "react";
import FulLogo from "../../assets/img/logo/FulLogo";

const Next = () => {
  return (
    <Box className="home-intro" as="section">
      {/* Company logo */}
      <Center pt="8">
        <FulLogo w={"8"} h="8" />
      </Center>
      {/* Company logo */}

      <Center
        flexDir="column"
        pt="32"
        spacing="7"
        w="90%"
        mx="auto"
        textAlign="center"
        color="#fff"
      >
        <Heading fontSize="3xl">Make Transfer, the secure way.</Heading>
        <Text
          textAlign="center"
          fontWeight="normal"
          color="brand.100"
          fontSize="sm"
        >
          Fund and make transactions to your loved ones with Monsecure, the
          online bank app you definitely need.
        </Text>
      </Center>

      <HStack
        pos="absolute"
        justifyContent="center"
        bottom="14"
        left="7"
        spacing="7"
        mx="auto"
        w="84%"
        ml=""
      >
        <Button
          textTransform="uppercase"
          as={Link}
          to="/signup"
          bg="white"
          color="brand.500"
          w="40"
          h="12"
          fontSize="sm"
          fontWeight="bold"
          rounded="4px"
        >
          Sign up
        </Button>
        <Button
          border="1px solid"
          as={Link}
          to="/login"
          borderColor="white"
          textTransform="uppercase"
          bg="blackAlpha.300"
          rounded="4px"
          w="40"
          h="16"
          h="12"
          fontSize="sm"
          fontWeight="bold"
        >
          Log in
        </Button>
      </HStack>
    </Box>
  );
};

export default Next;

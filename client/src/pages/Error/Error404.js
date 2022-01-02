import { Box, VStack, Center, Heading } from "@chakra-ui/layout";
import React from "react";
import FulLogo from "../../assets/img/logo/FulLogo";

const Error404 = () => {
  return (
    <>
      <FulLogo
        color="brand.400"
        fill="brand.400"
        showText={true}
        w="14"
        h="14"
        p="6"
      />
      <Center w="90%" mx="auto" h="70%">
        <VStack>
          <Heading
            fontSize="8xl"
            align="center"
            color="brand.500"
            fontWeight="bold"
          >
            404
          </Heading>
          <Heading fontSize="lg" color="brand.500">
            Page not found
          </Heading>
        </VStack>
      </Center>
    </>
  );
};

export default Error404;

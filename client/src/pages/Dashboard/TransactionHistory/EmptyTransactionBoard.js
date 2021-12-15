import { IconButton } from "@chakra-ui/button";
import { Box, Center, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import { AiOutlineDotChart } from "react-icons/ai";

const EmptyTransactionBoard = () => {
  return (
    <Box
      mx="5"
      mt="6"
      h="48"
      bg="brand.50"
      borderRadius="2px"
      w="90%"
      mx="auto"
      borderColor="brand.700"
    >
      <Center h="100%">
        <VStack
          spacing="8"
          color="brand.700"
          fontWeight="bold"
          textTransform="uppercase"
        >
          <IconButton
            size="lg"
            w="12"
            h="12"
            variant="outline"
            colorScheme="brand"
            borderRadius="2px"
            aria-label="Transaction chart"
            icon={<AiOutlineDotChart />}
          />
          <Text>No transaction yet</Text>
        </VStack>
      </Center>
    </Box>
  );
};

export default EmptyTransactionBoard;

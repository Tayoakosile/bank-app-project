import { Button } from "@chakra-ui/button";
import { Box, HStack } from "@chakra-ui/layout";
import React from "react";
import { Link } from "react-router-dom";

const AccountButton = () => {
  return (
    <HStack w="90%" mx="auto" justifyContent="center" spacing="4">
      <Button
        as={Link}
        to="/account/fund-account"
        variant="outline"
        h="12"
        w="40"
        borderRadius="2px"
      >
        Fund account
      </Button>
      <Button
        as={Link}
        to="/account/transfer/user"
        bg="brand.600"
        h="12"
        w="40"
        borderRadius="2px"
      >
        Send
      </Button>
    </HStack>
  );
};

// <Box w="90%" mx="auto" mt="12" bg="gray.300" h="32">
//   <Center h="32">
//     <VStack spacing="-1">
//       <Text fontSize="1rem">Total balance</Text>
//       <Text fontSize="2.4rem"> {balance}</Text>
//     </VStack>
//   </Center>

//   <HStack spacing={12} mx="auto" variant="outline" ml={2} mt={8}>
//     <Button
//       /*  onClick={() => {
//   initializePayment(onSuccess, onClose)
//  }} */
//       colorScheme="blue"
//       variant="solid"
//       bg="blue.400"
//       h={12}
//       as={NavLink}
//       to="/account/fund-account"
//       px={4}
//     >
//       Fund account
//     </Button>

//     <Button h={12} as={NavLink} to="/account/transfer/user">
//       Transfer
//     </Button>
//   </HStack>
// </Box>
export default AccountButton;

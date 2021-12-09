import { Button, ButtonGroup } from "@chakra-ui/button";
import { Center, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import React, { useEffect, useState } from "react";
import useAuth from "../../auth/useAuth";
import ProtectedComponent from "../../components/ProtectedComponent";
import useDashboard from "../../hooks/useDashboard";
import Loader from "../../pages/Loading/IsLoading";

const Account = () => {
  const [loggedInUserDetails, setLoggedInUserDetails] = useState("");

  const { balance } = useDashboard();
  const { data, isSuccess, isLoading } = useAuth();

  // if user successfully logs in and if data is ready, set state
  useEffect(() => {
    data && setLoggedInUserDetails(data.authorizedData);
  }, [isSuccess, data]);

  console.log(data, loggedInUserDetails);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <ProtectedComponent>
      <VStack
        spacing="10"
        as="section"
        h="70vh"
        bg="brand.600"
        alignItems="flex-start"
        p="3"
      >
        {/* Greeting and username */}

        <HStack alignItems="flex-start">
          <VStack spacing="1" pt="4" alignItems="flex-start">
            <Text color="brand.100" fontSize="sm" fontWeight="semibold">
              Hi, {data ? loggedInUserDetails.firstname : "there"}
            </Text>
            <Heading fontWeight="bold" fontSize="xl" as="h3" color="gray.200">
              {/* Shows name of user */}
              Welcome Back
            </Heading>
          </VStack>
        </HStack>
        {/* Greeting and username */}

        {/* Available Balance */}
        <VStack spacing="0" alignItems="center" width="100%" mx="auto">
          <Text color="white" fontWeight="bold" color="brand.200" fontSize="md">
            Available Balance
          </Text>
          <Heading color="white" fontSize="5xl">
            <span>&#8358;</span>
            {balance}.00
          </Heading>
        </VStack>

        {/* Buttons to send and recieve money */}

        <HStack
          justifyContent="center"
          variant="outline"
          w="full"
          spacing="6"
          size="lg"
          bg="red"
        >
          <chakra.button bg="white" color="brand.500">
            Save
          </chakra.button>
          <Button color="white" bg="brand.500">
            Cancel
          </Button>
        </HStack>
        {/* Buttons to send and recieve money */}
      </VStack>
    </ProtectedComponent>

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
  );
};

export default Account;

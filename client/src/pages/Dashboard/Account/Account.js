import { Button } from "@chakra-ui/button";
import { VscBell } from "react-icons/vsc";
import {
  Box,
  Divider,
  Heading,
  HStack,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import useAuth from "../../../auth/useAuth";
import ProtectedComponent from "../../../components/ProtectedComponent";
import useDashboard from "../../../hooks/useDashboard";
import Loader from "../../Loading/IsLoading";
import Icon from "@chakra-ui/icon";
import { Link } from "react-router-dom";

const Account = () => {
  const AccountUserName = (text) => {
    return (
      <Text color="white" fontSize="sm" fontWeight="normal">
        {text}
      </Text>
    );
  };
  const AccountHeader = (text) => {
    return (
      <Heading fontWeight="bold" fontSize="lg" as="h3" color="gray.300">
        {text}
      </Heading>
    );
  };

  const [loggedInUserDetails, setLoggedInUserDetails] = useState("");

  const { balance } = useDashboard();
  const { data, isSuccess, isLoading } = useAuth();

  // if user successfully logs in and if data is ready, set state
  useEffect(() => {
    if (isLoading) {
      return <Loader />;
    }
    data && setLoggedInUserDetails(data.authorizedData);
  }, [isSuccess, data, isLoading]);

  console.log(data, loggedInUserDetails, isLoading);

  return (
    <ProtectedComponent>
      <VStack
        borderBottomRightRadius="36"
        borderBottomLeftRadius="36"
        spacing="12"
        as="section"
        h="64"
        bg="brand.600"
        alignItems="flex-start"
        p="5"
      >
        {/* Greeting and username */}

        <HStack alignItems="flex-start" w="full">
          <VStack spacing="0" pt="4" alignItems="flex-start">
            {AccountUserName(
              `Hi, ${data ? loggedInUserDetails.firstname : "there"}`
            )}
            {AccountHeader("Welcome Back")}
          </VStack>
          <Spacer />
          {/* Notification bell */}
          <Box as={Link} to="/notifications">
            <Icon as={VscBell} color="brand.100" w="7" h="7" />
          </Box>
          {/* Notification bell */}
        </HStack>
        {/* Greeting and username */}

        {/* Available Balance */}
        <VStack spacing="0" alignItems="center" width="100%" mx="auto">
          <Text color="white" fontWeight="bold" color="brand.100" fontSize="sm">
            Available Balance
          </Text>
          <Heading display="flex" alignItems="center" color="brand.200">
            <Text mt="3" mr="1" fontSize="2xl" as="span" alignSelf="flex-start">
              &#8358;
            </Text>
            <Text
              color="white"
              fontSize={balance == 0 ? "6xl" : "5xl"}
              as="span"
            >
              {balance}
            </Text>{" "}
            <Text as="span" mt="4" fontSize="2xl">
              .00
            </Text>
          </Heading>
        </VStack>

        {/* Account Number */}
      </VStack>
    </ProtectedComponent>
  );
};

export default Account;

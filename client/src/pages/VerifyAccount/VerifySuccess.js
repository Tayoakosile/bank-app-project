import React from "react";
import { Box, Center, Heading, Text, VStack } from "@chakra-ui/layout";
import { Checkmark } from "react-checkmark";
import FulLogo from "../../assets/img/logo/FulLogo";
import MetaTags from "../../components/MetaTags";
import { Button } from "@chakra-ui/button";
import { Link, useHistory } from "react-router-dom";

const VerifySuccess = () => {
  const history = useHistory();
  return (
    <>
      <MetaTags
        title="Email Verification - Mondais App "
        description="Email Verification Succcess"
      />
      <FulLogo fill="brand.500" w="16" h="16" p="6" />

      <VStack spacing="6" as="section" w="80%" mx="auto">
        <Checkmark color="#4171b7" size="xxLarge" />
        <VStack spacing="2">
          <Heading size="lg"> Verified!</Heading>
          <Text fontSize="md" align="center">
            {" "}
            Voila! , you've successfully verified your account.
            <br />
            Please Login to continue
          </Text>
        </VStack>

        <Button
          as={Link}
          onClick={() => history.push("/login")}
          size="lg"
          h="16"
          w="full"
        >
          Login to your account
        </Button>
      </VStack>
    </>
  );
};

export default VerifySuccess;

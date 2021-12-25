import { Button } from "@chakra-ui/button";
import { ReactComponent as MailSent } from "../../assets/img/MailSent.svg";
import { Box, Center, Heading, Text } from "@chakra-ui/layout";
import React from "react";
import FulLogo from "../../assets/img/logo/FulLogo";
import Icon from "@chakra-ui/icon";

const VerifyAccount = () => {
  return (
    <>
      <FulLogo showText={true} fill="brand.400" w="14" h="14" p="6" mt="2" />
      <Center>
        <Icon as={MailSent} w="32" h="32" />
      </Center>
      <Box as="section" px="6" mt="4">
        <Heading size="lg" pb="4">
          Verify your account
        </Heading>
        <Text size="lg">
          Account activation link has been sent to the email address you
          provided, Click on it to verify your account and enjoy 0% fees charge
          on all transactions.
        </Text>
        <Button variant="link" mt="6" size="sm" p="4">
          Didnt get the mail?, Resend
        </Button>
      </Box>
    </>
  );
};

export default VerifyAccount;

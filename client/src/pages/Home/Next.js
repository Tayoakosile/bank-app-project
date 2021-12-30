import { Box, Center, Heading, HStack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import FulLogo from "../../assets/img/logo/FulLogo";
import useMotionComponent from "../../hooks/useMotionComponent";

const BoxMotion = motion(Box);

const Next = () => {
  const { CenterMotion, HeadingMotion, TextMotion, BoxMotion } =
    useMotionComponent();

  const CenterMotionVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { delay: 0.4 },
    },
  };
  return (
    <BoxMotion
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      when="beforeChildren"
      transition={{ delay: 0.1, duration: 1, type: "tween" }}
      className="home-intro"
      as="section"
    >
      {/* Company logo */}
      <CenterMotion
        variants={CenterMotionVariants}
        initial="hidden"
        animate="visible"
        pt="8"
      >
        <FulLogo w={"8"} h="8" />
      </CenterMotion>
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
        <HeadingMotion fontSize="3xl">
          Make Transfer, the secure way.
        </HeadingMotion>
        <Text
          textAlign="center"
          fontWeight="normal"
          color="brand.100"
          fontSize="sm"
        >
          Fund and make transactions to your loved ones with Moneydais, the
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
    </BoxMotion>
  );
};

export default Next;

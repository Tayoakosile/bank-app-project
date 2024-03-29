import { Center, Heading, HStack,Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import FulLogo from "../../assets/img/logo/FulLogo";
import useMotionComponent from "../../hooks/useMotionComponent";

const Next = () => {
  const BoxVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { delay: 0.2, ease: "easeInOut" },
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
    exit: {
      opacity: 0,
    },
  };

  const HeroTextVariant = {
    hidden: {
      scale: 0.5,
      opacity: 0.2,
    },
    visible: {
      scale: 1,
      opacity: 1,

      transition: { delay: 0.5, type: "tween" },
    },
    TextHidden: {
      x: "100vw",
      opacity: 0.2,
      transition: { delay: 0.7, type: "tween" },
    },
    TextVisible: {
      scale: 1,
      x: 0,
      opacity: 1,
      transition: { delay: 0.5, type: "tween", duration: "0.8" },
    },
  };

  const buttonVariant = {
    hidden: {
      opacity: 0,
      scale: 1.4,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <Box
      variants={BoxVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="home-intro"
      as="section"
    >
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
        <Heading
          variants={HeroTextVariant}
          initial="hidden"
          animate="visible"
          fontSize="3xl"
          pb="6"
        >
          Make Transfer, the secure way.
        </Heading>
        <Heading
          variants={HeroTextVariant}
          initial="TextHidden"
          animate="TextVisible"
          textAlign="center"
          fontWeight="normal"
          color="brand.100"
          fontSize="sm"
        >
          Fund and make transactions to your loved ones with Moneydais, the
          online bank app you definitely need.
        </Heading>
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
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6, type: "spring", duration: 0.4 }}
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
          variants={buttonVariant}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7, type: "spring", duration: 0.4 }}
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

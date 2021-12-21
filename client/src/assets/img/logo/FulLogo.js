import React from "react";
import Icon from "@chakra-ui/icon";
import { Text, HStack } from "@chakra-ui/layout";
import { ReactComponent as Logo } from "./logo.svg";
import { Link } from "react-router-dom";

const FulLogo = ({ w, h, fs, color, fill, spacing, showText, ...rest }) => {
  return (
    <HStack {...rest} spacing={spacing ? spacing : "2"}>
      <Icon as={Logo} w={w} h={h} fill={fill} />
      <Text
        fontSize={fs ? fs : "xl"}
        color={color ? color : "white"}
        fontWeight="semibold"
      >
        {showText ? "" : "monsecure"}
      </Text>
    </HStack>
  );
};

export default FulLogo;
